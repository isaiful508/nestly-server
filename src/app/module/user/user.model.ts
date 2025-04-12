import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    role: {
      type: String,
      enum: ['admin', 'landlord', 'tenant'],
      required: [true, 'Role is required'],
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);
export default User;
