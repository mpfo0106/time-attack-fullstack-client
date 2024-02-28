import API from "@/api";
import Button from "@/components/Button";
import Page from "@/components/Page";
import formatPrice from "@/utils/formatPrice.utils";
import Image from "next/image";

async function DealPage(props: { params: { dealId: string } }) {
  const dealId = props.params.dealId;
  const deal = await API.deal.getDeal(dealId);

  return (
    <Page>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <div className="relative aspect-[3/4]">
          <Image
            alt={deal.title}
            src={deal.imgUrl}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            unoptimized
          />
        </div>
      </section>

      <section>
        <div>{deal.author.email}</div>
        <div>{deal.region}</div>
        <hr />
      </section>

      <section>
        <div className="py-8 flex flex-col">
          <h1 className="text-lg">{deal.title}</h1>

          <div className="grid grid-cols-5 my-12 gap-y-5 text-[15px]">
            <div className="col-span-4 font-semibold">
              {`${formatPrice(deal.price)} 원`}
            </div>

            <div className="col-span-4">{deal.content}</div>
            <div className="col-span-4">관심 </div>
            <div className="col-span-4">조회 {deal.views}</div>
          </div>
        </div>
        <Button>관심 표하기</Button>
      </section>
    </Page>
  );
}

export default DealPage;
