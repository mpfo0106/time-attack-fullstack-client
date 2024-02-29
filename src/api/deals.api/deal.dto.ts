export type CreateDealDto = {
  title: string;
  content: string;
  imgUrl: string;
  price: number;
  region: string;
};

export type UpdateDealDto = {
  dealId: string;
  title: string;
  content: string;
  imgUrl: string;
  price: number;
  region: string;
};
