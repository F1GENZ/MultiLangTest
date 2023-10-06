import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Article, ArticleDocument } from './schemas/article-schema';
import { Model } from 'mongoose';
import { QueryForArticleInterFace } from './intefaces/article-interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async findAll(query: QueryForArticleInterFace): Promise<any> {
    const { limit, page, search } = query;
    let pageDone = page >= 1 ? page : 1;
    pageDone = pageDone - 1;
    const total = await this.articleModel
      .find({
        article_title: { $regex: search, $options: 'i' },
      })
      .count()
      .exec();
    const articles = await this.articleModel
      .find({
        article_title: { $regex: search, $options: 'i' },
      })
      .skip(pageDone * limit)
      .limit(limit)
      .exec();
    return { articles, page, limit, total };
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleModel.findOne({ article_id: id });
    if (!article) {
      throw new HttpException('Article not exists', HttpStatus.NOT_FOUND);
    }
    return article;
  }
}
