import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BlogMetafieldsMember } from '../intefaces/blog-interface';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ collection: 'Blog' })
export class Blog {
  @Prop()
  blog_id: number;

  @Prop()
  blog_handle: string;

  @Prop()
  blog_title: string;

  @Prop()
  blog_body: string;

  @Prop()
  blog_metafields: BlogMetafieldsMember[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
