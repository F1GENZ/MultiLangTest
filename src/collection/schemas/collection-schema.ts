import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionMetafieldsMember } from '../interfaces/collection-interfaces';
import { Document } from 'mongoose';

export type CollectionDocument = Collection & Document;

@Schema({ collection: 'Collection' })
export class Collection {
  @Prop()
  collection_id: number;

  @Prop()
  collection_handle: string;

  @Prop()
  collection_title: string;

  @Prop()
  collection_body: string;

  @Prop()
  collection_metafields: CollectionMetafieldsMember[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
