import {UseMutationCustomOptions} from '../types';
import axiosInstance from '../axios';
import {useMutation} from '@tanstack/react-query';

interface LogoutParams {}

export const useMutationLogOut = (
  options?: UseMutationCustomOptions<string, LogoutParams>,
) => {
  const mutationKey = '/logout';
  const mutationFn = async (data: LogoutParams) =>
    await axiosInstance.post(mutationKey, data).then(res => res.data);

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    ...options,
  });
};
