"use client";

import API from "@/api";
import DealCardsList from "@/components/DealCardsList";
import Heading from "@/components/Heading";
import Page from "@/components/Page";

import { useAuth } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import LogInModal from "../../_components/Header/components/LogInModal";

export const revalidate = 60;

function MyDealPage() {
  const auth = useAuth();
  const [deals, setDeals] = useState(null);

  useEffect(() => {
    const getMyWrote = async () => {
      try {
        const deals = await API.deal.getMyWrote();
        setDeals(deals);
      } catch (e) {
        alert("내가 쓴 글을 불러오는데 실패하였습니다.");
      }
    };

    setDeals(deals);
  });
  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: API.deal.getMyWrote,
  // });
  // const deals = await mutateAsync();

  return (
    <>
      {auth.isLoggedIn ? (
        <Page>
          <Heading>내 판매글</Heading>
          <DealCardsList deals={myDeals} />
        </Page>
      ) : (
        <LogInModal />
      )}
    </>
  );
}

export default MyDealPage;
