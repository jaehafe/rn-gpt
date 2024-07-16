import {UseMutationCustomOptions} from '../types';
import axiosInstance from '../axios';
import {useMutation} from '@tanstack/react-query';

interface TokenInfoParams {
  token: string;
}

export const useMutationFCMToken = (
  options?: UseMutationCustomOptions<string, TokenInfoParams>,
) => {
  const mutationKey = '/fcm-token';
  const mutationFn = async (data: TokenInfoParams) =>
    await axiosInstance.post(mutationKey, data).then(res => res.data);

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    ...options,
  });
};
