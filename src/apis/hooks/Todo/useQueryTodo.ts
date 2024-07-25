import {useInfiniteQuery, QueryFunctionContext} from '@tanstack/react-query';
import axiosInstance from '@/apis/axios';
import {ResponseError} from '@/apis/types';

export interface TodoType {
  id: number;
  title: string;
  body: string;
  dueDate: string;
  priority: string;
  notified: boolean;
  category: string;
  completed: boolean;
}

interface TodoResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: TodoType[];
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export const useQueryTodo = (pageSize: number = 10) => {
  const queryKey = '/api/todos';

  const queryFn = async ({pageParam = 0}: QueryFunctionContext) => {
    const response = await axiosInstance.get<TodoResponse>(
      `${queryKey}?page=${pageParam}&size=${pageSize}&sortBy=dueDate`,
    );
    return response.data;
  };

  return useInfiniteQuery<TodoResponse, ResponseError>({
    queryKey: [queryKey],
    queryFn,
    getNextPageParam: lastPage => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    getPreviousPageParam: firstPage => {
      if (firstPage.first) return undefined;
      return firstPage.number - 1;
    },
    initialPageParam: 0,
  });
};
