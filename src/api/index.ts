import { createApi /*fetchBaseQuery*/ } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./axiosInstance";
import searchEndpoints from "./search";
import movieEndpoints from "./movie";

type AxiosBaseQueryProps = {
  baseUrl?: string;
};

export type AxiosRequestProps = {
  url: string;
  method?: string;
  data?: any;
  params?: any;
  headers?: any;
};

const axiosBaseQuery =
  ({ baseUrl }: AxiosBaseQueryProps) =>
  async ({ url, method, data, params, headers }: AxiosRequestProps) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError: unknown | any) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const api = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/3" }),
  endpoints: (builder) => ({
    ...searchEndpoints(builder),
    ...movieEndpoints(builder)
  }),
});

export const {
  useSearchCollectionQuery,
  useSearchCompanyQuery,
  useSearchKeywordQuery,
  useSearchMovieQuery,
  useSearchMultiQuery,
  useSearchPersonQuery,
  useSearchTvQuery,
  useMovieDetailQuery
} = api;
export default api;
