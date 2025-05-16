import axios from 'axios';
import { Request, Response } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { config } from '../../../configs/config'

async function triggerInstagramBasicReport(keyword: string, code: string, mode: string, io: SocketIOServer) {

  const roomName = `${mode}|${keyword}`.toLowerCase();
  console.log("trigger instagram ", roomName, ":", code);

  if (code === "finish") {
    const report = await getCachedReport(keyword, mode);
    io.sockets.in(roomName).emit(`finish|${mode}|instagram`, { report });
  } else {
    io.sockets.in(roomName).emit(code);
  }
}

async function getCachedReport(query: string, mode: string) {
  try {
    const response = await axios.get(
      `${config.api.instagram}/cached/${mode}/${encodeURI(query)}`
    );
    return response.data.data ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export {
  triggerInstagramBasicReport,
  getCachedReport
};
