import API from "@/api";
import DealCardsList from "@/components/DealCardsList";
import Heading from "@/components/Heading";
import Page from "@/components/Page";
import { useAuth } from "@/contexts/auth.context";
import LogInModal from "../../_components/Header/components/LogInModal";

export const revalidate = 60;

async function MyDealPage() {
  const auth = useAuth();

  const myDeals = await API.deal.getMyWrote();

  return (
    <>
      {!auth.isLoggedIn} ? (
      <LogInModal />) : (
      <Page>
        <Heading>내 판매글</Heading>
        <DealCardsList deals={myDeals} />
      </Page>
      )
    </>
  );
}

export default MyDealPage;
