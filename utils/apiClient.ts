import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
});

export default api;



