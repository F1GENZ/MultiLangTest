import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateShopDto {
  @IsString()
  @IsNotEmpty()
  orgid: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  expireTime: Date;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsBoolean()
  @IsNotEmpty()
  statusApp: boolean;
}
