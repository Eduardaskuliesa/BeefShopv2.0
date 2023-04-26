import { UserModel } from 'model/user.model';
import express from 'express';

const getAllUsers = async (req: express.Request, res: express.Response) => {
  const users = await UserModel.find({}, { name: 1, _id: 1 });
  return res.send(users);
};

export default getAllUsers;
