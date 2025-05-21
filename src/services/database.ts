import mongoose from 'mongoose';
import { config } from '../configs/config';
import Logger from '../library/logger/Logger';

export const appDbConnection = mongoose.createConnection(config.database.app);
export const tiktokDbConnection = mongoose.createConnection(config.database.tiktok);
export const xDbConnection = mongoose.createConnection(config.database.x);

export const initDatabase = async () => {
    try {
        await appDbConnection;
        Logger.info('app database connected');
        
        await tiktokDbConnection;
        Logger.info('tiktok database connected');
        await xDbConnection;
        Logger.info('x database connected');

    } catch (error) {
        Logger.err(error);
        process.exit(1);
    }
};
