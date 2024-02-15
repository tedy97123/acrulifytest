import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
   GetLineItemResponse,
   GetDescriptionResponse,
   GetUserResponse,
   Month,
   Day
} from "./types";
const localURL = "http://localhost:8000/";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const herokuURL = "https://acrulifytest-79506d9ff655.herokuapp.com/";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: herokuURL  }),
  reducerPath: "main",
  tagTypes: ["Descriptions", "LineItem", "Month","Users","CreateUsers","GetUsersLogin"],
  endpoints: (build) => ({
    getDescriptions: build.query<Array<GetDescriptionResponse>, void>({
      query: () => "description/descriptions",
      providesTags: ["Descriptions"],
    }),
    getLineItems: build.query<Array<GetLineItemResponse>, void>({
      query: () => "lineItems/lineItems/",
      providesTags: ["LineItem"],
    }),
    getCurrentUser: build.query<Array<GetUserResponse>, void>({
      query: () => "user/user/",
      providesTags: ["Users"],
    }), 
    postCreateNewUser: build.mutation<Array<GetUserResponse>, any>({
      query: (newUserData) => ({
        url: 'users/create_users',
        method: 'POST',
        body: newUserData,
      }),
      invalidatesTags: ['CreateUsers'],
    }),
      getUserLogin: build.mutation<Array<GetUserResponse>, any>({
         query: (UserData) => ({
        url: 'users/getUser',
        method: 'POST',
        body: UserData,
      }),
      invalidatesTags: ['GetUsersLogin'], 
     }),
  }),
});

export const { useGetCurrentUserQuery, useGetDescriptionsQuery, useLazyGetDescriptionsQuery, useGetLineItemsQuery,usePostCreateNewUserMutation,useGetUserLoginMutation } = api
