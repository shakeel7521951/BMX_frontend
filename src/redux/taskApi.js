import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../baseUrl';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['task'],
  endpoints: (builder) => ({
    getAllTask: builder.query({
      query: () => "/get-all-tasks",
    }),
  }),
});

export const { useGetAllTaskQuery } = taskApi;
