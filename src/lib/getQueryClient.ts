import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';

const getQueryClient = cache(
  () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
);
export default getQueryClient;
