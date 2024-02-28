import API from "@/api";
import formatPrice from "@/utils/formatPrice.utils";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  deal: Awaited<ReturnType<typeof API.deal.getDeals>>[number];
}

function ProductCard({ deal }: ProductCardProps) {
  return (
    <Link
      href={`/products/${deal.id}`}
      className="relative flex flex-col group"
    >
      <div className="aspect-[3/4] relative mb-4">
        <Image
          alt={deal.imgUrl}
          src={deal.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          unoptimized
        />
      </div>

      <div className="grid gap-y-2">
        <div className="text-sm font-bold">{deal.title}</div>
        <h6 className="text-[15px] font-semibold">{`${formatPrice(
          deal.price
        )} 원`}</h6>
        <div className="text-sm flex flex-col sm:flex-row items-baseline gap-1.5">
          {deal.region}
        </div>
        <div className="text-sm flex flex-col sm:flex-row items-baseline gap-1.5">
          {"api 로 관심 가져오기"}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
