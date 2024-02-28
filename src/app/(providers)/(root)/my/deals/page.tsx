"use client";

import API from "@/api";
import { GetProductsData } from "@/api/deals.api/deals.data";
import DealCardsList from "@/components/DealCardsList";
import Heading from "@/components/Heading";
import Page from "@/components/Page";
import { useAuth } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import LogInModal from "../../_components/Header/components/LogInModal";

export const revalidate = 60;

function MyDealPage() {
  const auth = useAuth();
  const [deals, setDeals] = useState<GetProductsData>([]);

  useEffect(() => {
    const getMyWrote = async () => {
      try {
        const response = await API.deal.getMyWrote();
        setDeals(response);
      } catch (e) {
        console.error(e);
        alert("내가 쓴 글을 불러오는데 실패하였습니다.");
      }
    };

    if (auth.isLoggedIn) {
      getMyWrote();
    }
  }, [auth.isLoggedIn]);

  return (
    <>
      {auth.isLoggedIn ? (
        <Page>
          <Heading>내 판매글</Heading>
          <DealCardsList deals={deals} />
        </Page>
      ) : (
        <LogInModal />
      )}
    </>
  );
}

export default MyDealPage;
