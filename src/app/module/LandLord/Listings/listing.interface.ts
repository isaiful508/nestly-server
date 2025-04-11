/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Model, Schema } from "mongoose";

export interface IRentalHouse {
    location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  images: string[]; // Array of image URLs
  landlordId: Schema.Types.ObjectId; // Reference to the Landlord (User) collection
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
//Define Mongoose Model interface
export interface RentalHouseModel extends Model<IRentalHouse>{}