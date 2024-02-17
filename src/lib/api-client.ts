import axios from 'axios';

const apiclient = axios.create({
  baseURL: 'api',
});

export default apiclient;
