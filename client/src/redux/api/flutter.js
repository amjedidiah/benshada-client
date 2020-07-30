import axios from 'axios';

// configure base url
const flutter = axios.create({
  baseURL: 'https://api.flutterwave.com/v3',
  timeout: 30000
});

// intercept requests and add authorization token
flutter.interceptors.request.use((config) => {
  const SEC_KEY_TEST = 'FLWSECK_TEST-46cd4a7d89691277ca0193bc6b13e47e-X';
  // const SEC_KEY = 'FLWSECK-c646beae89f0d912807126ace6d51153-X';

  config.headers.authorization = `Bearer ${SEC_KEY_TEST}`;

  return config;
});

export default flutter;
