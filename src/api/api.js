import axios from 'axios';

export default axios.create({
  baseURL: 'https://benshada-api.herokuapp.com/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
});
