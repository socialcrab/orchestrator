// import * as instagramController from './controller/track/instagramSocketController';
import * as tiktokController from './controller/track/tiktokSocketController';

export default function socketTrackHandler(io: any, socket: any, roomSpace: any) {
  // socket.on('instagram', async (packet:any) => instagramController.handleInstagramSocket(packet, socket, io));
  
  socket.on('tiktok', async (packet:any) => tiktokController.handleTiktokSocket(packet, socket, io));
}
