"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { useAuth } from "@/contexts/auth.context";
import { useModal } from "@/contexts/modal.context";
import useMutationCreateDeal from "@/react-query/deal/useMutationCreateDeal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogInModal from "../../_components/Header/components/LogInModal";

function CreatePostPage() {
  const auth = useAuth();
  const router = useRouter();
  const { mutateAsync: createDeal, isPending } = useMutationCreateDeal();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState(0);

  const modal = useModal();

  const handleImageUpload = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    await axios.post("http://localhost:5050/deals", formData);
  };

  const handleClickSignUp = async () => {
    try {
      await createDeal({
        title,
        content,
        price,
        region,
      });
    } catch (e) {
      alert("판매글 생성에 실패하였습니다.");
    }
  };

  // useEffect(() => {
  //   if (auth.isLoggedIn) {
  //   }
  // }, [auth.isLoggedIn, router]);

  return (
    <>
      {!auth.isLoggedIn ? (
        <LogInModal />
      ) : (
        <Page>
          <Heading>판매글 작성하기</Heading>

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
              color="blue"
              onClick={handleClickSignUp}
              disabled={isPending}
            >
              판매글 작성하기
            </Button>
          </section>
        </Page>
      )}
    </>
  );
}

export default CreatePostPage;
