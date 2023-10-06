import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PageMetafieldsMember } from '../interfaces/page-interface';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({ collection: 'Page' })
export class Page {
  @Prop()
  page_id: number;

  @Prop()
  page_handle: string;

  @Prop()
  page_title: string;

  @Prop()
  page_body: string;

  @Prop()
  page_metafields: PageMetafieldsMember[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
