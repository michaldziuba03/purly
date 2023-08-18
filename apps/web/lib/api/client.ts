import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_API_BASE || 'http://localhost:8000/api',
  withCredentials: true,
});
