import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";
const localURL = "http://localhost:8000/";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const herokuURL = "https://desolate-wave-21722-b91d139fdee7.herokuapp.com/";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: localURL  }),
  reducerPath: "main",
  tagTypes: ["Descriptions", "LineItem", "Okta","Users"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Descriptions"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["LineItem"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Okta"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "users/users/",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery  } = api
