import { IsNotEmpty, IsString } from 'class-validator';
export class ShopMetafieldsMember {
  @IsNotEmpty()
  @IsString()
  key: string;
}
