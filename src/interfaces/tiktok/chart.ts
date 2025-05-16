export type ChartPerDate = {
  date:  String
  value: Number
}

export type ChartMost = {
  key:   String
  value: Number
}

export type ChartCategory = {
  key:   String
  title: String
  value: Number
  order: Number
}

export type ChartHeatmap = {
  day:        String
  activities: ChartHeatmapItem[]
}

export type ChartHeatmapItem = {
  hour:  Number
  value: Number
}

export type ChartPerDay = {
  day:   String
  value: Number
}

export type VideoInfo = {
  coverImageUrl : String
  caption       : String
  authorName    : String
  createdAt          : Number
  totalViews         : Number
  totalLikes         : Number
  totalComments      : Number
  followerReach      : Number
  followerImpression : Number
}
