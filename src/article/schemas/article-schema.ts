import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ArticleMetafieldsMember } from '../intefaces/article-interface';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ collection: 'Article' })
export class Article {
  @Prop()
  article_id: number;

  @Prop()
  article_handle: string;

  @Prop()
  article_title: string;

  @Prop()
  article_body: string;

  @Prop()
  article_excerpt: string;

  @Prop()
  article_metafields: ArticleMetafieldsMember[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
