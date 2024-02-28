import { ComponentProps } from "react";
import ProductCard from "../DealCard";

interface ProductCardsListProps {
  deals: Array<ComponentProps<typeof ProductCard>["deal"]>;
}

function ProductCardsList({ deals }: ProductCardsListProps) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-12">
      {deals.map((deal) => (
        <li key={deal.id}>
          <ProductCard deal={deal} />
        </li>
      ))}
    </ul>
  );
}

export default ProductCardsList;
