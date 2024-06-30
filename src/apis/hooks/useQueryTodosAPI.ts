import {keepPreviousData, useQuery} from '@tanstack/react-query';
import axiosInstance from '../axios';
import {ResponseError} from '../types';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useQueryTodosAPI = () => {
  const queryKey = ['/posts'];
  const queryFn = async () =>
    await axiosInstance.get(`/posts`).then(res => res.data);

  return useQuery<Post[], ResponseError>({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
