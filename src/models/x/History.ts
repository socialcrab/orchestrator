import { model, Schema } from 'mongoose';
import { appDbConnection } from '../../services/database';
import { THistory } from '../../interfaces/tiktok/history';
import { statusLogSchema } from './schemas';

export const HistoryModel = appDbConnection.model<THistory>(
	'Histories',
	new Schema({
		userId: { type: String, required: true, index: true },
		service: { type: String, required: true, index: true },
		query: { type: String, required: true, index: true },
		monitoring: { type: Boolean },
		postCount: { type: Number, required: false },
		status: { type: String, required: true },
		statusLog: { type: [statusLogSchema], required: true }
	},
	{
		timestamps: true
	}),
	'histories'
);
