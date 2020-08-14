import axios from 'axios';

const apiProtheus = axios.create({
  baseURL: 'http://192.168.2.250:9001',
});

export default apiProtheus;
