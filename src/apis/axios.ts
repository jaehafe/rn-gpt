import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8080'
      : 'http://localhost:8080',

  withCredentials: true,
});

axiosInstance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${axiosInstance.defaults.baseURL}/refresh`,
          {},
          {withCredentials: true},
        );
        const {accessToken} = response.data;
        console.log('New accessToken:', accessToken);
        await AsyncStorage.setItem('accessToken', accessToken);
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        await handleLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

async function handleLogout() {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.setItem('isLoggedIn', 'false');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export default axiosInstance;
