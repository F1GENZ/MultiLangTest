import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ShopMetafieldsMember } from '../interfaces/shop.interface';

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Shop {
  @Prop()
  orgid: string;

  @Prop()
  access_token_login: string;

  @Prop()
  access_token_install: string;

  @Prop()
  expire_time_install: Date;

  @Prop()
  refresh_token_install: string;

  @Prop()
  status_app: boolean;

  @Prop()
  shop_metafields: ShopMetafieldsMember[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
