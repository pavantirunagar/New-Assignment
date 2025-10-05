import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  size?: string;
  website: string;
  description: string;
}

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => 'db.json',
      transformResponse: (response: { companies: Company[] }) => response.companies,
    }),
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
