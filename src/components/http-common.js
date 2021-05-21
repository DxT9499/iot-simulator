import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/rest/`,
  headers: {
    Authorization: "Bearer oh.test.PgGrq56Et45iSxmZ3546lpi7BQbSiJC3HX8kBVjtVCBJ0AaYc26FAEaOaBpkaQHQm6jKLPqWoBZhmkPUm8w",
    ContentType: "application/json",
    AccessControlAllowOrigin: "*"
  }
})