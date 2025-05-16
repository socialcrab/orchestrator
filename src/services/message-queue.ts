import Bull from "bull";
import { logger } from "./logger";
import { ServerSocket } from "../socket";
import { HistoryModel } from "../models/tiktok/History";
import { isValidUserFn } from "./user/user";
import { getReport } from ".";

const redis: Bull.QueueOptions["redis"] = {
  host: process.env.REDIS_HOST || "",
  port: Number(process.env.REDIS_PORT || 0),
  username: process.env.REDIS_USERNAME || "",
  password: process.env.REDIS_PASSWORD || "",
  db: Number(process.env.REDIS_DB || 0),
};

const settings: Bull.QueueOptions["settings"] = {
  lockDuration: 600000,
  lockRenewTime: 15000,
  stalledInterval: 30000,
  maxStalledCount: 0,
  guardInterval: 5000,
  retryProcessDelay: 5000,
  backoffStrategies: {},
  drainDelay: 5,
};

export const createQueue = (name: string) => {
  return new Bull(name, { redis, settings });
};

const getHistoryUserId = async <History>(
  id: string
) => {
  const history = await HistoryModel.findOne({ where: { id } });
  if (!history) {
    throw new Error(
      "No search history found with given id! Make sure to create it first before send it to MQ!"
    );
  }
  return history
};


export const subscribe = <T>(
  queueName: string,
  mode: string,
  socket: any
) => {
  logger.info("creating subscriber queue", queueName);
  const queue = createQueue(queueName);
  let report: any;

  queue.on("active", (job) =>
    logger.info("queue active", JSON.stringify(job.id))
  );
  queue.on("completed", async (job: any) => {
    logger.info("queue complete", JSON.stringify(job))
    const userExist = await isValidUserFn(job.userId)
    if (userExist) report = await getReport(job.service, job.query)
    if (report) socket.emit(`finish|${mode}|${job.userId}`, '')
  });
  queue.on("failed", (job: any) =>
    logger.info("queue failed", JSON.stringify(job.id))
  );
  queue.on("error", (error) => logger.error("queue error", JSON.stringify(error)));

  logger.info("queue", queueName, "initialized!");
};

export const publish = async <T>(
  queueName: string,
  data: T,
  jobId?: string
) => {
  logger.info('creating publisher queue')
  const queue = createQueue(queueName);
  
  logger.info('adding queue', jobId);
  const job = await queue.add(data, { jobId });
  const jobState = await job.getState();

  logger.info('got job', job.id, jobState)
  if (jobState === 'failed') {
    logger.info('retrying failed job')
    await job.retry();
  } else if (jobState === 'stuck') {
    logger.info('moving stuck job to failed and retrying')
    await job.moveToFailed({message: 'Moving to failed due to a request with same jobId'});
    await job.retry();
  } else {
    console.log(jobState,'<<<<<<')
  }

  logger.info('closing queue');
  await queue.close();
};
