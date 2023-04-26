import { UserDocument, UserModel } from 'model/user.model';
import { FilterQuery } from 'mongoose';

export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean();
}
