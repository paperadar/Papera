import axios from 'axios';
import QS from 'qs';

// env variable
const isPrd = process.env.NODE_ENV == 'production';

// dev or prd
export const basicUrl = isPrd ? 'http://www.papera.tk' : 'http://www.development.com'

const service = axios.create({
  baseURL: basicUrl
})

service.interceptors.request.use(config => { 
  const token = window.localStorage.getItem('userToken');
  // add token in each request
  config.data = Object.assign({}, config.data, {
    token: token,
  })
  // set request head
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
  config.data = QS.stringify(config.data)
  return config
}, error => { 
    return error;
})

service.interceptors.response.use(response => {
  if (response.code) {
    switch (response.code) {
      case 200:
        return response.data;
      case 401:
        // not registered solution
        break;
      case 403:
        // token outdate solution
        break;
      default:
        // message.error(response.data.msg)
    }
  } else { 
    return response;
  }
})

export default service