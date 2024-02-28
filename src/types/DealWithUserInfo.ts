export type DealWithUserInfo = {
  id: string;
  title: string;
  content: string;
  imgUrl: string;
  price: number;
  views: number;
  authorId: string;
  region: string;
  author: {
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
