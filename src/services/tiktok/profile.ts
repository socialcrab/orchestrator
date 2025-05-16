import { ProfileReportModel } from "../../models/tiktok/Profile";
import { TProfileInfo } from '../../interfaces/tiktok/profile';
import { HydratedDocument } from "mongoose";

export const getProfileReport = async (key: string): Promise<HydratedDocument<TProfileInfo>> => {
	const profileReport = await ProfileReportModel.findOne({ key });
	if (profileReport) return profileReport;
	else throw { status: 500, message: 'Internal Error' };
};