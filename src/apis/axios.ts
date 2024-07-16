import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  // baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030',
  baseURL: 'http://localhost:8080',
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${axiosInstance.defaults.baseURL}/refresh`,
          {},
          {withCredentials: true},
        );
        const {accessToken} = response.data;
        console.log('New accessToken:', accessToken); // 여기에 로그 추가
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
    // 여기에 전역 상태 업데이트 로직 추가
    // 예: dispatch(logoutAction());
    // 또는 이벤트 발생: EventEmitter.emit('logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export default axiosInstance;

// axiosInstance.interceptors.request.use(async config => {
//   const token = await AsyncStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // refreshToken은 쿠키에 있으므로 별도로 보낼 필요 없음
//         const response = await axios.post(
//           'YOUR_REFRESH_TOKEN_ENDPOINT',
//           {},
//           {withCredentials: true},
//         );
//         const {accessToken} = response.data;
//         await AsyncStorage.setItem('accessToken', accessToken);
//         axiosInstance.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // 리프레시 토큰도 만료된 경우 로그아웃 처리
//         await AsyncStorage.removeItem('accessToken');
//         await AsyncStorage.setItem('isLoggedIn', 'false');
//         // 로그아웃 상태로 전환 (전역 상태 업데이트 필요)
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// export default axiosInstance;
