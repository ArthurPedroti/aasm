import axios from 'axios';

const apiProtheus = axios.create({
  baseURL: 'https://agf.acervogeek.com.br:9443',
});

export default apiProtheus;
