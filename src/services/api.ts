import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Donors', 'Emergency', 'Campaigns', 'Inquiries', 'Team', 'Volunteers'],
  endpoints: () => ({}),
});
