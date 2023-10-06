import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
export class QueryForArticle_GetAll {
  @IsNotEmpty()
  @IsNumberString()
  limit: number;

  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @IsString()
  search: string;
}
