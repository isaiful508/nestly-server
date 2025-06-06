import { Types } from "mongoose";

export type UserRole = "admin" | "landlord" | "tenant";

export type IUser = {
  _id?: string | Types.ObjectId;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  phone?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
