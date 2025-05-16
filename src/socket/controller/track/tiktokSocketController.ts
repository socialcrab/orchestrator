import _ from 'lodash';
import { REPORT_STATUS, SERVICE } from "../../../interfaces/tiktok/history";
import { publish } from "../../../services/message-queue";
import { parseHistory, saveHistory } from '../../../services/tiktok/history';
import { THistory } from '../../../interfaces/tiktok/history';

export const PROFILE_REQUEST = "req_tiktok_profile_1" as const;
export const HASHTAG_REQUEST = "req_tiktok_hashtag_1" as const;

async function handleTiktokSocket(packet: any, socket: any, io: any) {
  console.log('PAKET!!! dari tiktok!', packet);
  let mode: string = packet.analyze
  let username: string = packet.user
  let query: string = packet.query

  if (!query || !username) { socket.emit('error', { message: 'query and user are required!' }); return; }
  else query = query.toLowerCase()

  const roomName = `${mode}|${query}`.toLowerCase();
  socket.join(roomName);
  console.log('join room', roomName);

  let inputData: THistory = {
    userId: username,
    query: query,
    service: '',
    postCount: 10,
    monitoring: false,
    status: REPORT_STATUS.QUEUED,
    statusLog: [{ status: REPORT_STATUS.QUEUED }],
    createdAt: new Date(),
  }

  switch (mode) {
    case 'tiktok_profile':
      inputData.service = SERVICE.PROFILE
      let profile_history = parseHistory(await saveHistory(inputData))
      await publish(PROFILE_REQUEST, profile_history, profile_history.id);
      break;
    case 'tiktok_hashtag':
      inputData.service = SERVICE.HASHTAG
      const hashtag_history = parseHistory(await saveHistory(inputData));
      await publish(HASHTAG_REQUEST, hashtag_history, hashtag_history.id);
      break;
    default:
      socket.emit('error', { message: 'given mode is not recognized!' });
      return;
    }
}

export { handleTiktokSocket };

