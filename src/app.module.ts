import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://f1genz2022:f1genz03102023@f1genzdatabase.sg7d8vj.mongodb.net/?retryWrites=true&w=majority',
    ),
    ShopModule,
  ],
})
export class AppModule {}
