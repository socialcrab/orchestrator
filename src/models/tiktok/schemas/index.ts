import { Schema } from "mongoose";
import { StatusLog } from "../../../interfaces/tiktok/history";
import { 
    VideoAuthor,
    AuthorStats,
    VideoStats,
    VideoMusic,
    VideoPoi
} from "../../../interfaces/tiktok/video";
import { 
    ProfilePublicMetrics,
    ProfileKeyMetrics,
    ProfileChartData,
    ProfileTopPosts
} from "../../../interfaces/tiktok/profile";
import {
    ChartCategory,
    ChartHeatmap,
    ChartHeatmapItem,
    ChartMost,
    ChartPerDate,
    ChartPerDay,
    VideoInfo
} from "../../../interfaces/tiktok/chart";
import {
    HashtagPublicMetrics,
    HashtagKeyMetrics,
    HashtagChartData,

} from "../../../interfaces/tiktok/hashtag";

/////////////////////////HISTORY SCHEMA//////////////////////////////////

export const statusLogSchema = new Schema<StatusLog>(
	{
		status: { type: String, required: true },
	},
	{ 
        _id: false,
        timestamps: {
            createdAt: 'timestamp',
            updatedAt: false
        }
    }
);

/////////////////////////VIDEOS SCHEMA//////////////////////////////////

export const authorStatsSchema = new Schema<AuthorStats>(
	{
        followerCount: { type: Number },
        followingCount: { type: Number },
        friendCount: { type: Number },
        totalLikes: { type: Number },
        totalVideos: { type: Number }      
    }
);

export const videoAuthorSchema = new Schema<VideoAuthor>(
	{
		username: { type: String, required: true },
        stats: { type: authorStatsSchema, required: true }
	}
);

export const videoStatsSchema = new Schema<VideoStats>(
	{
        collects: { type: Number },
        comments: { type: Number },
        likes   : { type: Number },
        views   : { type: Number },
        reposts : { type: Number },
        shares  : { type: Number }
    }
);

export const videoMusicSchema = new Schema<VideoMusic>(
	{
		title: { type: String }
	}
);

export const videoPoiSchema = new Schema<VideoPoi>(
	{
		name: { type: String }
	}
);

/////////////////////////CHARTDATA SCHEMA//////////////////////////////////

export const chartPerDateSchema = new Schema<ChartPerDate>(
	{
        date:  { type: String },
        value: { type: Number }
	}
);

export const chartMostSchema = new Schema<ChartMost>(
	{
        key:  { type: String },
        value: { type: Number }
	}
);

export const chartCategorySchema = new Schema<ChartCategory>(
	{
        key:  { type: String },
        title:  { type: String },
        value: { type: Number },
        order: { type: Number }
    }
);

export const chartHeatmapItemSchema = new Schema<ChartHeatmapItem>(
    {
        hour: { type: Number },
        value: { type: Number }
    }
);

export const chartHeatmapSchema = new Schema<ChartHeatmap>(
	{
        day:  { type: String },
        activities:  { type: [chartHeatmapItemSchema] }
    }
);

export const chartPerDaySchema = new Schema<ChartPerDay>(
	{
        day:  { type: String },
        value: { type: Number }
	}
);

export const videoInfoSchema = new Schema<VideoInfo>(
	{
        coverImageUrl : { type: String },
        caption       : { type: String },
        authorName    : { type: String },
        createdAt          : { type: Number },
        totalViews         : { type: Number },
        totalLikes         : { type: Number },
        totalComments      : { type: Number },
        followerReach      : { type: Number },
        followerImpression : { type: Number }
	}
);

/////////////////////////PROFILE SCHEMA//////////////////////////////////

export const profilePublicMetricsSchema = new Schema<ProfilePublicMetrics>(
	{
        followerCount  : { type: Number },
        followingCount : { type: Number },
        friendCount    : { type: Number },
        videoCount     : { type: Number }      
    }
);

export const profileKeyMetricsSchema = new Schema<ProfileKeyMetrics>(
	{
        analyzedVideoCount : { type: Number },

        totalCollects : { type: Number },
        totalReposts  : { type: Number },
        totalViews    : { type: Number },
        totalLikes    : { type: Number },
        totalComments : { type: Number },
        totalShares   : { type: Number },
      
        engagementRates : { type: Number },
        likeRates       : { type: Number },
        commentRates    : { type: Number },
        viewRates       : { type: Number },
        shareRates      : { type: Number },
      
        avgEngagement : { type: Number },
        avgLikes      : { type: Number },
        avgComment    : { type: Number },
        avgViews      : { type: Number },
      
        avgPostPerDay   : { type: Number },
        avgPostPerWeek  : { type: Number },
        avgPostPerMonth : { type: Number }
    }
);

export const profileChartDataSchema = new Schema<ProfileChartData>(
	{
        likePerDates    : {type: [chartPerDateSchema] },
        commentPerDates : {type: [chartPerDateSchema] },
        videoPerDates : {type: [chartPerDateSchema] },
        viewPerDates : {type: [chartPerDateSchema] },
      
        mostMentions : { type: [chartMostSchema] },
        mostMusic    : { type: [chartMostSchema] },
        mostWords    : { type: [chartMostSchema] },
        mostHashtags : { type: [chartMostSchema] },
      
        videoActivity    : { type: [chartHeatmapSchema] },
        audienceActivity : { type: [chartHeatmapSchema] },
      
        videoPerDay          : { type: [chartPerDaySchema] },
        viewPerDay           : { type: [chartPerDaySchema] },
        engagementRatePerDay : { type: [chartPerDaySchema] },
        avgEngagementPerDay  : { type: [chartPerDaySchema] }    
    }
);

export const profileTopPostsSchema = new Schema<ProfileTopPosts>(
	{
        mostViewed        : { type: [videoInfoSchema] },
        highestEngagement : { type: [videoInfoSchema] },
        mostLikes         : { type: [videoInfoSchema] },
        mostCommented     : { type: [videoInfoSchema] }      
    }
);

/////////////////////////HASHTAG SCHEMA///////////////////////////////////////

export const hashtagPublicMetricsSchema = new Schema<HashtagPublicMetrics>(
    {
        viewCount  : { type: Number },
        videoCount : { type: Number },
    }
)

export const hashtagKeyMetricsSchema = new Schema<HashtagKeyMetrics>(
    {
      analyzedVideoCount : { type: Number },
    
      totalLikes    : { type: Number },
      totalComments : { type: Number },
      totalCollects : { type: Number },
      totalViews    : { type: Number },
      totalReposts  : { type: Number },
      totalShare    : { type: Number },
    
      contributors       : { type: Number },
      followerReach      : { type: Number },
      followerImpression : { type: Number },
    
      totalEngagement : { type: Number },
    
      avgViews : { type: Number },
    }
) 

export const hashtagChartDataSchema = new Schema<HashtagChartData>(
    {
      videoPerDates : { type: [chartPerDateSchema] },
    
      likePerDates    : { type: [chartPerDateSchema] },
      commentPerDates : { type: [chartPerDateSchema] },
    
      reachPerDates : { type: [chartPerDateSchema] },
    
      viewPerDates : { type: [chartPerDateSchema] },
    
      participations : { type : [chartCategorySchema] },
      mostMusic      : { type: [chartMostSchema] },
      mostWords      : { type: [chartMostSchema] },
      mostHashtags   : { type: [chartMostSchema] },
    
      videoActivity    : { type: [chartHeatmapSchema] },
      audienceActivity : { type: [chartHeatmapSchema] },
    
      videoPerDay             : { type: [chartPerDaySchema] },
      viewPerDay              : { type: [chartPerDaySchema] },
      totalEngagementPerDay   : { type: [chartPerDaySchema] },
      avgEngagementPerDay     : { type: [chartPerDaySchema] },
      totalFollowerReacPerDay : { type: [chartPerDaySchema] },
    }
)

export const hashtagTopPostsSchema = {
  mostViewed                : { type: [videoInfoSchema] },
  highestEngagement         : { type: [videoInfoSchema] },
  mostLikes                 : { type: [videoInfoSchema] },
  mostCommented             : { type: [videoInfoSchema] },
  highestFollowerReach      : { type: [videoInfoSchema] },
  highestFollowerImpression : { type: [videoInfoSchema] },
}

export const influencerRankingSchema = {
  username   : { type: String },
  value      : { type: Number },
  percentage : { type: Number },
}

export const influencerInfoSchema = {
  username        : { type: String },
  name            : { type: String },
  profileImageUrl : { type: String },
  followerCount   : { type: Number },
  totalVideos     : { type: Number },
  videoEngagement : { type: Number },
}

export const influencersReportSchema = {
  potentialInfluencer : { type : [chartCategorySchema] },
  totalFollowerReach  : { type: [influencerRankingSchema] },
  totalVideos         : { type: [influencerRankingSchema] },
  totalEngagements    : { type: [influencerRankingSchema] },
}