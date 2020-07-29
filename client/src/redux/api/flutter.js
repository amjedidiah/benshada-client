import axios from 'axios';

// configure base url
const flutter = axios.create({
  baseURL: 'https://api.flutterwave.com/v3',
  timeout: 30000
});

// intercept requests and add authorization token
flutter.interceptors.request.use((config) => {
  const SEC_KEY = 'FLWSECK_TEST-46cd4a7d89691277ca0193bc6b13e47e-X';
  config.headers.authorization = `Bearer ${SEC_KEY}`;

  return config;
});

export default flutter;
