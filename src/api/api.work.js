import axios from 'axios';

import {workUrl} from './config/config';

// 获取项目列表
export const getWorkList = data => {
  return axios.get(workUrl,{
    params:data
  });
};

// 编辑项目
export const editWorkInfos = data => {
  return axios.put( workUrl, {
    data:data
  });
};

// 删除项目
export const deleteWork = data => {
 return axios.delete( workUrl, {
   data:data
 });
};