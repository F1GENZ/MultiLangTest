import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { QueryForArticle_GetAll } from './dto/get-article.dto';

@Controller('/api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  findAll(@Query() query: QueryForArticle_GetAll) {
    return this.articleService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }
}
