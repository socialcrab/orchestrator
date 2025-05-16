import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;
    // public users: { [uid: string]: string };

    constructor(server: HttpServer) {
        ServerSocket.instance = this;
        // this.users = {};
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });
    }
}
