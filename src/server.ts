import http from 'http';
import express, { Router } from 'express';
import { ServerSocket } from './socket';
import { Socket } from 'socket.io';
import socketTrackHandler from './socket/track';
import { initDatabase } from './services/database';
import { config } from './configs/config';
import { logger } from "./services/logger";
import { initTiktokProfileWorker, initTiktokHashtagWorker } from "./workers/tiktok";
import { REPORT_STATUS, SERVICE, THistory } from './interfaces/tiktok/history';
import { saveHistory } from './services/tiktok/history';
import { publish } from './services/message-queue';
import { PROFILE_REQUEST } from './socket/controller/track/tiktokSocketController';

const app = express();

/** Log the request */
app.use((req, res, next) => {
    let address = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    res.on('finish', () => {
        if (address) console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${address}]`);
        else console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`);
    });
    next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


(async () => {
    /** Server Handling */
    const httpServer = http.createServer(app);
    
    /** Start Socket */
    const roomSpace: any[] = []
    const serverSocket = new ServerSocket(httpServer);
    serverSocket.io.on('connect', (socket: Socket) => 
        socketTrackHandler(serverSocket.io, socket, roomSpace)
    )

    initTiktokProfileWorker(serverSocket);
    logger.info("profile worker initialized!");

    initTiktokHashtagWorker(serverSocket);
    logger.info("hashtag worker initialized!");

    app.get('/', async (req, res, next) => {
        return res.status(200).json({ hello: 'world!' });
    });
    
    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');
        res.status(404).json({
            message: error.message
        });
    });

    await initDatabase();
    
    /** Listen */
    httpServer.listen(config.port, () => console.info(`Server is running on port:`, config.port));
})();


