import { ChartHeatmap, ChartMost, ChartPerDate, ChartPerDay, VideoInfo } from "./chart";

export type ProfilePublicMetrics = {
  followerCount  : Number;
  followingCount : Number;
  friendCount    : Number;
  videoCount     : Number;
}

export type ProfileKeyMetrics = {
  analyzedVideoCount : Number;

  totalCollects : Number;
  totalReposts  : Number;
  totalViews    : Number;
  totalLikes    : Number;
  totalComments : Number;
  totalShares   : Number;

  engagementRates : Number;
  likeRates       : Number;
  commentRates    : Number;
  viewRates       : Number;
  shareRates      : Number;

  avgEngagement : Number;
  avgLikes      : Number;
  avgComment    : Number;
  avgViews      : Number;

  avgPostPerDay   : Number;
  avgPostPerWeek  : Number;
  avgPostPerMonth : Number;
}

export type ProfileChartData = {
  likePerDates    : ChartPerDate[]
  commentPerDates : ChartPerDate[]
  videoPerDates : ChartPerDate[]
  viewPerDates : ChartPerDate[]

  mostMentions : ChartMost[]
  mostMusic    : ChartMost[]
  mostWords    : ChartMost[]
  mostHashtags : ChartMost[]

  videoActivity    : ChartHeatmap[]
  audienceActivity : ChartHeatmap[]

  videoPerDay          : ChartPerDay[]
  viewPerDay           : ChartPerDay[]
  engagementRatePerDay : ChartPerDay[]
  avgEngagementPerDay  : ChartPerDay[]
}

export type ProfileTopPosts = {
  mostViewed        : VideoInfo[]
  highestEngagement : VideoInfo[]
  mostLikes         : VideoInfo[]
  mostCommented     : VideoInfo[]
}

export type TProfileInfo = {
  key             : String
  userId          : String
  secUid          : String
  username        : String
  name            : String
  profileImageUrl : String
  profileLink     : String
  description     : String
  verified        : Boolean

  publicMetrics : ProfilePublicMetrics
  keyMetrics    : ProfileKeyMetrics
  chartData     : ProfileChartData
  topPosts      : ProfileTopPosts

  startDate : Date
  endDate   : Date
  createdAt : Date
}