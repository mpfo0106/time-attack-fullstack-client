import API from "@/api";
import DealCardsList from "@/components/DealCardsList";
import Heading from "@/components/Heading";
import Page from "@/components/Page";

export const revalidate = 60;

async function MyDealPage() {
  const myDeals = await API.deal.getMyWrote();

  return (
    <Page>
      <Heading>내 판매글</Heading>
      <DealCardsList deals={myDeals} />
    </Page>
  );
}

export default MyDealPage;
