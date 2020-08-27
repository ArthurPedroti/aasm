import axios from 'axios';
import { API_PROTHEUS_URL } from 'react-native-dotenv';

const apiProtheus = axios.create({
  baseURL: API_PROTHEUS_URL,
});

export default apiProtheus;
