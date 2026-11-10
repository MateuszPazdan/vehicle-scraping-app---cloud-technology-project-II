import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_API_KEY}/api`,
	credentials: 'include',
});

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQuery,
	endpoints: () => ({}),
});
