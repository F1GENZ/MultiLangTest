import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionModule } from './collection/collection.module';
import { ProductModule } from './product/product.module';
import { BlogModule } from './blog/blog.module';
import { ArticleModule } from './article/article.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://f1genz2022:f1genz03102023@f1genzdatabase.sg7d8vj.mongodb.net/?retryWrites=true&w=majority',
    ),
    ShopModule,
    CollectionModule,
    ProductModule,
    BlogModule,
    ArticleModule,
    PageModule,
  ],
})
export class AppModule {}
