import { model, Schema } from 'mongoose';
import { appDbConnection } from '../../services/database';
import { THashtagInfo } from '../../interfaces/tiktok/hashtag';
import { hashtagChartDataSchema, hashtagKeyMetricsSchema, hashtagPublicMetricsSchema, hashtagTopPostsSchema, influencersReportSchema } from './schemas';

export const HashtagReportModel = appDbConnection.model<THashtagInfo>(
	'Hashtags',
	new Schema({
		key: { type: String, unique: true },
		hashtagLink: { type: String },
		hashtag: { type: String },

		publicMetrics     : { type: hashtagPublicMetricsSchema },
		keyMetrics        : { type: hashtagKeyMetricsSchema },
		chartData         : { type: hashtagChartDataSchema },
		topPosts          : { type: hashtagTopPostsSchema },
		influencersReport : { type: influencersReportSchema },
	  
		startDate: { type: Date },
		endDate: { type: Date },
		createdAt: { type: Date }
	}),
	'hashtagReports'
);
