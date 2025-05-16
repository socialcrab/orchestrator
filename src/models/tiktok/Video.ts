import { Schema } from 'mongoose';
import { tiktokDbConnection } from '../../services/database';
import { TVideo } from '../../interfaces/tiktok/video';
import { authorStatsSchema, videoMusicSchema, videoPoiSchema, videoStatsSchema } from './schemas';

export const HistoryModel = tiktokDbConnection.model<TVideo>(
	'Videos',
	new Schema({
		videoId: { type: String, required: true, index: true, unique: true },
		createdAt: { type: Number },
		author: { type: authorStatsSchema },
		stats: { type: videoStatsSchema },
		caption: { type: String },
		hashtags: { type: [String] },
		imageUrl: { type: String },
		music: { type: videoMusicSchema },
		poi: { type: videoPoiSchema }
	}),
	'videos'
);
