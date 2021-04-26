import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/rest/`,
  headers: {
    Authorization: 'DxT {token}'
  }
})