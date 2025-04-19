/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Model, Types, } from "mongoose";

export interface IRentalHouse {
  landlord: Types.ObjectId;
  location: string;
  description: string;
  rentAmount: string;
  bedrooms: string;
  images: string[]; 
  status: "pending" | "approved" | "rejected";
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;

}
//Define Mongoose Model interface
export interface RentalHouseModel extends Model<IRentalHouse> { }