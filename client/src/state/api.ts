import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
   GetLineItemResponse,
   GetDescriptionResponse,
   GetUserResponse,
   currentUser,
   clockedIn
} from "./types";
const localURL = "http://localhost:8000/";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const herokuURL = "https://acrulifytest-79506d9ff655.herokuapp.com";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: herokuURL  }),
  reducerPath: "main",
  tagTypes: ["Descriptions", "LineItem", "Month","Users","CreateUsers","GetUsersLogin","CreateClockedIn"],
  endpoints: (build) => ({
    getDescriptions: build.query<Array<GetDescriptionResponse>, void>({
      query: () => "/description/descriptions",
      providesTags: ["Descriptions"],
    }),
    getLineItems: build.query<Array<GetLineItemResponse>, string>({
      query: (email) => `/lineItem/findLineItem/?email=${encodeURIComponent(email)}`,
      providesTags: ["LineItem"],
    }),
    getCurrentUser: build.query<Array<GetUserResponse>, void>({
      query: () => "/user/user/",
      providesTags: ["Users"],
    }), 
    postCreateNewUser: build.mutation<Array<GetUserResponse>, any>({
      query: (newUserData) => ({
        url: '/users/create_users',
        method: 'POST',
        body: newUserData,
      }),
      invalidatesTags: ['CreateUsers'],
    }),
      getUserLogin: build.mutation<Array<currentUser>, any>({
        query: (UserData) => ({
        url: '/Login',
        method: 'POST',
        body: UserData,
      }),
      invalidatesTags: ['GetUsersLogin'], 
     }),
     postClockIn: build.mutation<Array<clockedIn>, any>({
        query: (clockedInTime) => ({
        url: '/lineItem/postLineItem',
        method: 'POST',
        body: clockedInTime,
      }),
      invalidatesTags: ['CreateClockedIn'], 
     }),
 
  }),
});

export const { useGetCurrentUserQuery, useGetDescriptionsQuery, useLazyGetDescriptionsQuery, useGetLineItemsQuery,usePostCreateNewUserMutation,useGetUserLoginMutation } = api
