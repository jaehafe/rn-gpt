import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  // baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030',
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export default axiosInstance;
