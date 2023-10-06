import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { JwtModule } from '@nestjs/jwt';
import { Shop, ShopSchema } from './schemas/shop.schema';
import { ShopCommon } from './shop.common';
import { HaravanCommon } from './shop.haravan';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  providers: [ShopService, ShopCommon, HaravanCommon],
  controllers: [ShopController],
})
export class ShopModule {}
