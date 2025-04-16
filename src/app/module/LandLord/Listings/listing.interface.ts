/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Model, Types, } from "mongoose";

export interface IRentalHouse {
  landlord: Types.ObjectId;

  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  images: string[]; // Array of image URLs
  available: boolean;
}
//Define Mongoose Model interface
export interface RentalHouseModel extends Model<IRentalHouse> { }