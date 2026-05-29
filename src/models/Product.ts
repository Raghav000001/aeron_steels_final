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
      maxlength: [200, 'Title must be under 200 characters'],
    },
    src: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
  },
  { timestamps: true }
);

ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ title: 1 });

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
