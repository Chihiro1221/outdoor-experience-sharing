import Axios from './Axios';

const http = new Axios({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
});
export default http;
