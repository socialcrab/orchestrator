import { HashtagReportModel } from "../../models/tiktok/Hashtag";
import { THashtagInfo } from '../../interfaces/tiktok/hashtag';
import { HydratedDocument } from "mongoose";

export const getHashtagReport = async (key : string): Promise<HydratedDocument<THashtagInfo>> => {
	const hashtagReport = await HashtagReportModel.findOne({ key });
	if (hashtagReport) return hashtagReport;
	else throw { status: 500, message: 'Internal Error' };
};