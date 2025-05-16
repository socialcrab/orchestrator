import { HistoryModel } from "../../models/tiktok/History";
import { THistory } from '../../interfaces/tiktok/history';
import { HydratedDocument } from "mongoose";

export const saveHistory = async (history: THistory): Promise<HydratedDocument<THistory>> => {
	const onDb = await HistoryModel.findOne({ userId: history.userId, service: history.service, query: history.query });
	if (onDb) return await onDb.overwrite(history).save();
	else return await new HistoryModel(history).save();
};

export const parseHistory = (history: HydratedDocument<THistory>) => {
	return {
		id: history._id.toString(),
		userId: history.userId,
		service: history.service,
		query: history.query,
		monitoring: history.monitoring,
		postCount: history.postCount,
		status: history.status,
		statusLog: history.statusLog,
		createdAt: history.createdAt?.toString(),
		updatedAt: history.updatedAt?.toString()
	}
};