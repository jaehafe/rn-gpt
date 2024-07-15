import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../axios';
import {UseMutationCustomOptions} from '../types';

interface SignUpParams {
  email: string;
  password: string;
}

export const useMutationSignUp = (
  options?: UseMutationCustomOptions<string, SignUpParams>,
) => {
  const mutationKey = '/join';
  const mutationFn = async (data: SignUpParams) =>
    await axiosInstance.post(mutationKey, data).then(res => res.data);

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    ...options,
  });
};
