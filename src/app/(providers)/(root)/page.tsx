import API from "@/api";
import DealCardsList from "@/components/DealCardsList";
import Heading from "@/components/Heading";
import Page from "@/components/Page";

export const revalidate = 60;

async function HomePage() {
  let deals = await API.deal.getDeals();

  const handleSortView = async () => {
    deals = await API.deal.getDealsByView();
  };
  return (
    <Page>
      <Heading>전체 판매글</Heading>
      {/* <button oncl>조회순으로 정렬</button> */}
      <DealCardsList deals={deals} />
    </Page>
  );
}

export default HomePage;
