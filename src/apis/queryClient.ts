import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
