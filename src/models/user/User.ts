import { model, Schema } from 'mongoose';
import { appDbConnection } from '../../services/database';
import { TUser } from '../../interfaces/user/user';

export const UserModel = appDbConnection.model<TUser>(
	'User',
	new Schema({
		username: { type: String, required: true },
		email: { type: String, required: true, index: true, unique: true },
		password: { type: String, required: true },
	}),
	'user'
);
