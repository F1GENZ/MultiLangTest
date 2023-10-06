import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ShopMetafieldsMember } from '../interfaces/shop.interface';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  orgid: string;

  @IsString()
  @IsNotEmpty()
  access_token_login: string;

  @IsString()
  @IsNotEmpty()
  access_token_install: string;

  @IsString()
  @IsNotEmpty()
  expire_time_install: Date;

  @IsString()
  @IsNotEmpty()
  refresh_token_install: string;

  @IsBoolean()
  @IsNotEmpty()
  status_app: boolean;

  @IsNotEmpty()
  shop_metafields: ShopMetafieldsMember[];
}
