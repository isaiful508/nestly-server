import { model, Schema } from "mongoose";
import { IRentalHouse, RentalHouseModel } from "./listing.interface";

export const rentalHouseSchema = new Schema<IRentalHouse>(
    {
      location:{
        type: String,
        required: true,
        trim: true
      },
      description: {
         type:String,
         required:true,
         trim: true,
      },
      rentAmount: {
        type: Number,
        required: true,
        min: 0,
      },
      bedrooms: {
        type: Number,
        required: true,
        min: 1,
      },
      images:{
         type: [String],
         required: true
      },
      landlordId: {
        type: Schema.Types.ObjectId,
        ref: 'User',// Reference to the Users collection
        required: true
      },
      available: {
        type: Boolean,
        default: true,
      },
    },
    {
        timestamps: true
    }
);

export const RentalHouse = model<IRentalHouse, RentalHouseModel>('RentalHouse', rentalHouseSchema);