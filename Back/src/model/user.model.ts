import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    email:string,
    name:string,
    password:string,
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
