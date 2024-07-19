import {keepPreviousData, useQuery} from '@tanstack/react-query';
import axiosInstance from '../axios';
import {ResponseError, UseQueryCustomOptions} from '../types';

interface TodoResponse {
  data: string;
}

export const useQueryTodosAPI = (options?: UseQueryCustomOptions<string>) => {
  const queryKey = '/api/todo';
  const queryFn = async () =>
    await axiosInstance.get(queryKey).then(res => res.data);

  return useQuery<string, ResponseError>({
    queryKey: [queryKey],
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
