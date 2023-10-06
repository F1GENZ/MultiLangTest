export interface ArticleMetafieldsMember {
  key: string;
  namespace: string;
  value: string;
  value_type: string;
}

export interface QueryForArticleInterFace {
  readonly limit: number;
  readonly page: number;
  readonly search?: string;
}
