import axios from 'axios';
import qs from 'qs'

// const NODE_ENV = process.env.NODE_ENV;

let BS_URL = "https://www.fastmock.site/mock/4bb9a95aff13186f64738dd7707e7930/form";
// switch (NODE_ENV) {
//   case "production":
//     BS_URL = '';
//     break;
//   case "test":
//     BS_URL = '';
//     break;
//   case "uat":
//     BS_URL = '';
//     break;
//   case "develop":
//     BS_URL = '';
//     break;
//   default:
//     BS_URL = '';
// }

//默认设置
const instance = axios.create({
  baseURL: BS_URL,
  // baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  withCredentials:true,
});

// let config = {}

// Request 拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
// Response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error);
  }
);

// const get = (url, params = {}) => {

//   return new Promise((resolve, reject) => {

//     instance.get(url, {params}).then(response => {

//       resolve(response.data || {});

//     }).catch(err => {
//       reject(err);
//     })
//   })
// };


const post = (url, params = {}) => {

  return new Promise((resolve, reject) => {
    params = params || {};

    instance.post(url, qs.stringify(params)).then(response => {
      resolve(response.data || {});

    }).catch(err => {
      reject(err);
    })
  })
};

export default {
  BS_URL,
  // post请求示例
  postInfo(param){
    return post('/api/test', param)
  },
}
