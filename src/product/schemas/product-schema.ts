import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductMetafieldsMember } from '../interfaces/product-interface';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'Product' })
export class Product {
  @Prop()
  product_id: number;

  @Prop()
  product_handle: string;

  @Prop()
  product_title: string;

  @Prop()
  product_vendor: string;

  @Prop()
  product_type: string;

  @Prop()
  product_body: string;

  @Prop()
  product_metafields: ProductMetafieldsMember[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
