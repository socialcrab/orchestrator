import axios, { AxiosError } from 'axios';
import Logger from '../library/logger/Logger';
import { config } from '../configs/config';
import { triggerInstagramBasicReport } from '../socket/controller/trigger/instagramTriggerController';
import { Server as SocketIOServer } from 'socket.io';

const socketUrl = config.socket.url;

export enum TriggerMeta {
	Finish = 'finish',
	NotFound = 'not-found',
	ZeroResult = 'zero-result',
	IncompleteResource = 'incomplete-resource',
	Forbidden = 'forbidden',
	Protected = 'protected',
	Suspended = 'suspended',
	UndefinedError = 'undefined-error',
	UnprocessableEntity = 'unprocessable-entity',
}

export const triggerInstagramBasicHashtag = async (keyword: string, io: SocketIOServer, code = TriggerMeta.Finish) => {
	try {
		console.log('socket basic hashtag')
		await triggerInstagramBasicReport(keyword, code, 'basic-hashtag', io)
	} catch (error) {
		if (error instanceof AxiosError) Logger.warn(error.message, error.response);
		else Logger.err(error);

	}
};
