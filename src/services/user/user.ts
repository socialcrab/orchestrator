import { UserModel } from "../../models/user/User";
import { TUser } from '../../interfaces/user/user';
import { HydratedDocument } from "mongoose";

export const saveUser = async (history: TUser): Promise<HydratedDocument<TUser>> => {
	const onDb = await UserModel.findOne({ email: history.email });
	if (onDb) return await onDb.overwrite(history).save();
	else return await new UserModel(history).save();
};

export const isValidUserFn = async (email: string): Promise<boolean> => {
	const onDb = await UserModel.findOne({ email: email });
	if (onDb) return true;
	else return false;
};