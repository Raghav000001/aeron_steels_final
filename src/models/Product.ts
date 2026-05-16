import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  src: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    src: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
