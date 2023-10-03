import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {
  @Prop({ required: true })
  accessToken: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
