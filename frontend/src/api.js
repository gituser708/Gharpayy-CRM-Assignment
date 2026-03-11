import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crm-demo-backend-xbkf.onrender.com/api',
  withCredentials: true, 
});

export default api;
