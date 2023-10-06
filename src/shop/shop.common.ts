import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Shop } from './schemas/shop.schema';
import { Model } from 'mongoose';
import { CreateShopDto } from './dto/createShop.dto';
import { UpdateShopDto } from './dto/updateShop.dto';
@Injectable()
export class ShopCommon {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<Shop>,
  ) {}

  async createShop(createShopDto: CreateShopDto): Promise<Shop> {
    const newPost = await this.shopModel.create(createShopDto);
    return newPost.save();
  }

  async findShops(): Promise<Shop[]> {
    const shops = await this.shopModel.find().exec();
    return shops;
  }

  async findShopByOrgid(orgid: string): Promise<Shop> {
    const post = this.shopModel.findOne({ orgid }).exec();
    return post;
  }

  async updateShopByOrgid(
    orgid: string,
    updateShopDto: UpdateShopDto,
  ): Promise<Shop> {
    const updatedShop = await this.shopModel.findOneAndUpdate(
      { orgid },
      updateShopDto,
      { new: true },
    );
    return updatedShop;
  }

  async deleteShop(orgid: string): Promise<any> {
    const deletedShop = await this.shopModel.findOneAndDelete({ orgid });
    return deletedShop;
  }
}
