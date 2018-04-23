import {WeaTools} from 'ecCom'

//项目类型-树形
export const getPrjTypeTreePageList = params => {
	return WeaTools.callApi('/api/prj/pcproject/init', 'GET', params);
}

//根据项目类型查询项目
export const getPrjPageListByTypeId = params => {
	return WeaTools.callApi('/api/prj/pcproject/getPrjByTypeId', 'GET', params);
}

//获取项目信息
export const getProjectView = params => {
	return WeaTools.callApi('/api/prj/pcproject/getProjectById', 'GET', params);
}

//获取项目信息
export const getPrjResource = params => {
	return WeaTools.callApi('/api/prj/pcproject/getPrjResource', 'GET', params);
}