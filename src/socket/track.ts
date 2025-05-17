import * as xController from './controller/track/xSocketController';

export default function socketTrackHandler(io: any, socket: any, roomSpace: any) {
  socket.on('x', async (packet:any) => xController.handleXSocket(packet, socket, io));
}
