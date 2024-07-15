import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../axios';
import {UseMutationCustomOptions} from '../types';

interface SignInParams {
  email: string;
  password: string;
}

export const useMutationSignIn = (
  options?: UseMutationCustomOptions<string, SignInParams>,
) => {
  const mutationKey = '/login';
  const mutationFn = async (data: SignInParams) =>
    await axiosInstance.post(mutationKey, data).then(res => res.data);

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn,
    ...options,
  });
};
