import { Response } from "@/types/Response.type";

import { AxiosInstance } from "axios";
import { CreateDealDto, UpdateDealDto } from "./deal.dto";
import { GetProductData, GetProductsData, PostProductData } from "./deals.data";

class DealAPI {
  private coreClient: AxiosInstance;

  constructor(coreClient: AxiosInstance) {
    this.coreClient = coreClient;
  }

  createDeal = async (dto: CreateDealDto) => {
    const response = await this.coreClient.post<Response<PostProductData>>(
      "/deal/create",
      dto
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);
    const deal = data.result;

    return deal;
  };

  updateDeal = async (dto: UpdateDealDto) => {
    const { dealId, title, content, imgUrl, price, region } = dto;
    const response = await this.coreClient.patch<Response<PostProductData>>(
      `/deals/${dealId}/edit`,
      { title, content, imgUrl, price, region }
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);
    const deal = data.result;

    return deal;
  };

  deleteDeal = async (dealId: string) => {
    const response = await this.coreClient.delete<Response<PostProductData>>(
      `/deals/${dealId}/delete`
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);
    const deal = data.result;

    return deal;
  };

  getDeals = async () => {
    const response = await this.coreClient.get<Response<GetProductsData>>(
      "/deals"
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);

    const deals = data.result;

    return deals;
  };

  getDealsByView = async () => {
    const response = await this.coreClient.get<Response<GetProductsData>>(
      "/deals/views"
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);

    const deals = data.result;

    return deals;
  };

  getDeal = async (dealId: string) => {
    const response = await this.coreClient.get<Response<GetProductData>>(
      `/deal/${dealId}`
    );
    const data = response.data;
    if (!data.success) throw new Error(data.error.message);

    const deal = data.result;

    return deal;
  };

  getMyWrote = async () => {
    const response = await this.coreClient.get<Response<GetProductsData>>(
      "/my/deals/written"
    );

    const data = response.data;
    if (!data.success) throw new Error(data.error.message);

    const deals = data.result;

    return deals;
  };

  // getIsMyDeal = async (dealId: string) => {
  //   const response = await this.coreClient.get<Response<Boolean>>(
  //     "/my/deals/:dealId"
  //   );
  //   const data = response.data;
  //   if (!data.success) throw new Error(data.error.message);

  //   const isMyDeal = data.result;

  //   return isMyDeal;
  // };

  postImage = async (formData: FormData) => {
    const data = await this.coreClient.post("deals/image", formData);
    const fileImgUrl = data["data"]["result"];

    return fileImgUrl;
  };
}

export default DealAPI;
