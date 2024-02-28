import { Deal } from "./Deal.type";

export type CartItem = {
  id: number;
  product: Deal;
  quantity: number;
  createdAt: number;
  updatedAt: number;
};
