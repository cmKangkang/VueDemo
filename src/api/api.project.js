import axios from 'axios';

import {projectUrl} from './config/config';

// 获取项目列表
export const getProjectList = data => {
  return axios.get(projectUrl,{
    params:data,
  });
};

// 新建项目
export const addNewProject = data => {
  return axios.post( projectUrl, {
    data:data,
  })
};

// 编辑项目
export const editProjectInfos = data => {
  return axios.put( projectUrl, {
    data:data
  });
};

// 删除项目
export const deleteProject = data => {
 return axios.delete( projectUrl, {
   data:data
 });
};