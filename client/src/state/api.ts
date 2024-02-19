// api.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetLineItemResponse,
  GetDescriptionResponse,
  GetUserResponse,
  currentUser,
  createLineItem,
  clockedOut,
  updateTHW
} from "./types";

const localURL = "http://localhost:8000";
const herokuURL = "https://acrulifytest-79506d9ff655.herokuapp.com";


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: herokuURL }),
  reducerPath: "api",
  tagTypes: ["Descriptions", "LineItem", "GetLineItems", "Month", "Users", "CreateUsers", "GetUsersLogin", "UpdateClockedIn", "CreateLineItem","description"],
  endpoints: (build) => ({
    getDescriptions: build.query<Array<GetDescriptionResponse>, void>({
      query: () => "/description/descriptions",
      providesTags: ["Descriptions"],
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
      getLineItems: build.query({
      query: (id) => `/lineItem/findLineItemsByUserId/${id}`,
      providesTags: (result) =>
      result 
      }),
    createLineItems: build.mutation<Array<GetLineItemResponse>, createLineItem>({
      query: (timeData) => ({
        url: '/lineItem/createLineItem',
        method: 'POST',
        body: timeData,
      }),
      invalidatesTags: ['LineItem'],
    }),
  postClockIn: build.mutation<Array<clockedOut>, any>({
      query: (clockInonTime) => ({
        url: '/lineItem/updateStartTime',
        method: 'PATCH',
        body: clockInonTime,
      }),
      invalidatesTags: ['LineItem'], 
    }),
    postClockOut: build.mutation<Array<clockedOut>, any>({
      query: (clockedOutInTime) => ({
        url: '/lineItem/updateStopTime',
        method: 'PATCH',
        body: clockedOutInTime,
      }),
      invalidatesTags: ['LineItem'], 
    }),
    postTotalWorkHours: build.mutation<Array<updateTHW>, any>({
      query: (timeData) => ({
        url: '/lineItem/totalHours',
        method: 'POST',
        body: timeData,
      }),
      invalidatesTags: ['LineItem'],
    }),
    postDescriptions: build.mutation<Array<updateTHW>, any>({
      query: (description) => ({
        url: '/description/updateDescription',
        method: 'POST',
        body: description,
      }),
      invalidatesTags: ['description'],
    }),
  }),
});

export const { 
  useGetDescriptionsQuery, 
  useGetCurrentUserQuery, 
  usePostCreateNewUserMutation,
  useGetUserLoginMutation,
  useGetLineItemsQuery,
  useCreateLineItemsMutation,
  usePostClockOutMutation,
  usePostClockInMutation,
  usePostTotalWorkHoursMutation,
  usePostDescriptionsMutation
} = api;
