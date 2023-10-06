import { IsNotEmpty, IsString } from 'class-validator';

export class ProductMetafieldsMember {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  namespace: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsString()
  value_type: string;
}
