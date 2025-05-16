import { model, Schema } from 'mongoose';
import { appDbConnection } from '../../services/database';
import { TProfileInfo } from '../../interfaces/tiktok/profile';
import { profileChartDataSchema, profileKeyMetricsSchema, profilePublicMetricsSchema, profileTopPostsSchema } from './schemas';

export const ProfileReportModel = appDbConnection.model<TProfileInfo>(
	'Profiles',
	new Schema({
		key: { type: String, unique: true },
		userId: { type: String },
		secUid: { type: String },
		username: { type: String },
		name: { type: String },
		profileImageUrl: { type: String },
		profileLink: { type: String },
		description: { type: String },
		verified: { type: Boolean },

		publicMetrics: { type: profilePublicMetricsSchema },
		keyMetrics: { type: profileKeyMetricsSchema },
		chartData: { type: profileChartDataSchema },
		topPosts: { type: profileTopPostsSchema },

		startDate: { type: Date },
		endDate: { type: Date },
		createdAt: { type: Date }
	}),
	'profileReports'
);
