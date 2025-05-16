import dotenv from 'dotenv';
import { number } from 'zod';

dotenv.config({ path: `./${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}.env` });

const enableQueue = process.env.QUEUE_ENABLED === 'true';

export const config = {
	port: process.env.PORT || 3000,

	debug: process.env.DEBUG === 'true',
	environment: process.env.ENVIRONMENT || 'local',
	database: {
		app: process.env.APP_DATABASE_URL || '',
		tiktok: process.env.TIKTOK_DATABASE_URL || ''
	},

	workers: (process.env.WORKERS || '').split(','),
	endpoints: (process.env.ENDPOINTS || '').split(','),

	socket: {
		url: process.env.SOCKET_URL || 'http://localhost:3600',
	},

	queue: {
		redis: {
			host: process.env.REDIS_HOST || '',
			port: Number(process.env.REDIS_PORT || 0),
			username: process.env.REDIS_USERNAME || '',
			password: process.env.REDIS_PASSWORD || '',
			db: Number(process.env.REDIS_DB || 0),
		},
		bull: {
			settings: {
				lockDuration: 600000,
				lockRenewTime: 15000,
				stalledInterval: 30000,
				maxStalledCount: 0,
				guardInterval: 5000,
				retryProcessDelay: 5000,
				backoffStrategies: {},
				drainDelay: 5,
			},
		},
		resetOnInit: process.env.QUEUE_RESET_ON_INIT === 'true',

		basicHashtag: enableQueue ? process.env.QUEUE_BASIC_HASHTAG || '' : '',
	},

	cache: {
		analyticAge: Number(process.env.CACHE_ANALYTIC_AGE_IN_MINUTES || 60),
	},

	analytics: {
		basicHashtag: {
			postLimit: Number(process.env.BASIC_HASHTAG_POST_LIMIT || 12),
		},
	},
	whiteList: process.env.WHITELIST?.split(',') || [],
	query: {
		limit: Number(process.env.QUERY_LIMIT || 3)
	},
	api: {
		instagram: process.env.INSTAGRAM_API || '',
		tiktok: process.env.TIKTOK_API || '',
	},
	jwtSecret: 'socialcrabletsgo'
};
