import { ComponentProps } from "react";
import DealCard from "../DealCard";

interface DealCardsListProps {
  deals: Array<ComponentProps<typeof DealCard>["deal"]>;
}

function DealCardsList({ deals }: DealCardsListProps) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-12">
      {deals.map((deal) => (
        <li key={deal.id}>
          <DealCard deal={deal} />
        </li>
      ))}
    </ul>
  );
}

export default DealCardsList;
