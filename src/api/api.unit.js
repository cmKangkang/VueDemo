import axios from 'axios';

import {unitUrl} from './config/config';

// 获取项目列表
export const getUnitList = data => {
  return axios.get(unitUrl,{
    params:data,
  });
};

// 新建项目
export const addNewUnit = data => {
  return axios.post( unitUrl, {
    data:data,
  })
};

// 编辑项目
export const editUnitInfos = data => {
  return axios.put( unitUrl, {
    data:data
  });
};

// 删除项目
export const deleteUnit = data => {
 return axios.delete( unitUrl, {
   data:data
 });
};