"use client";

import API from "@/api";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { useAuth } from "@/contexts/auth.context";
import useMutationUpdateDeal from "@/react-query/deal/useMutationUpdateDeal";
import { useParams, useRouter } from "next/navigation";

import { MouseEventHandler, useState } from "react";
import LogInModal from "../../../_components/Header/components/LogInModal";

function DealEditPage() {
  const auth = useAuth();
  const router = useRouter();
  const dealIdParam = useParams();
  const dealId = dealIdParam["dealId"];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");

  const { mutateAsync: updateDeal, isPending } = useMutationUpdateDeal();
  // const { mutateAsync: updateDeal, isPending } = useMutationUpdateDeal();

  if (typeof dealId !== "string")
    return new Error("deal Id 가 string 이 아닙니다");

  const handleImageUpload = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    const fileImgUrl = await API.deal.postImage(formData);
    setImgUrl(fileImgUrl);
  };

  const handleClickSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    try {
      updateDeal({
        dealId,
        title,
        content,
        imgUrl,
        price,
        region,
      });
      alert("성공적으로 글이 수정되었습니다!");
      router.replace("/");
    } catch (e) {
      alert("판매글 수정에 실패하였습니다.");
    }
  };

  return (
    <>
      {auth.isLoggedIn ? (
        <Page>
          <Heading>판매글 수정하기</Heading>

          <section className="flex flex-col items-center gap-y-4 max-w-sm mx-auto w-full">
            <Input
              label="글 제목"
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
            />
            <Input
              label="글 내용"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPending}
            />
            <Input
              label="이미지"
              type="file"
              onChange={(e) => handleImageUpload(e.target.files![0])}
              disabled={isPending}
            />
            <Input
              label="직거래 위치"
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={isPending}
            />
            <Input
              label="판매 가격"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              disabled={isPending}
            />

            <div className="mt-2" />

            <Button
              color="black"
              onClick={handleClickSubmit}
              disabled={isPending}
            >
              판매글 수정하기
            </Button>
          </section>
        </Page>
      ) : (
        <LogInModal />
      )}
    </>
  );
}

export default DealEditPage;
