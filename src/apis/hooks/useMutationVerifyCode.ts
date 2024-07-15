import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../axios';
import {UseMutationCustomOptions} from '../types';

interface VerifyCodeParams {
  email: string;
  code: string;
}

export const useMutationVerifyCode = (
  options?: UseMutationCustomOptions<string, VerifyCodeParams>,
) => {
  const mutationKey = '/verify';
  const mutationFn = async (data: VerifyCodeParams) =>
    await axiosInstance.post(mutationKey, data).then(res => res.data);

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    ...options,
  });
};
