import {WeaTools} from 'ecCom'

//任务执行条件
export const getTaskCondition = params => {
	return WeaTools.callApi('/api/prj/pctask/taskcondition', 'GET', params);
}

//任务执行列表
export const getTaskExecuteList = params => {
	return WeaTools.callApi('/api/prj/pctask/taskexecute', 'GET', params);
}

//任务卡片--任务信息
export const getTaskForm = params => {
	return WeaTools.callApi('/api/prj/pctask/gettaskform', 'GET', params);
}

//任务卡片--子任务查询
export const getTaskSubList = params => {
	return WeaTools.callApi('/api/prj/pctask/tasksub', 'GET', params);
}

//任务卡片--子任务查询
export const getTaskSubCondition = params => {
	return WeaTools.callApi('/api/prj/pctask/taskcondition', 'GET', params);
}

//任务卡片--共享设置
export const getTaskShareList = params => {
	return WeaTools.callApi('/api/prj/pctask/taskshare', 'GET', params);
}


//任务卡片--相关流程-文档-客户-资产 reftype=req ，doc, crm , cpt
export const getTaskReference = params => {
	return WeaTools.callApi('/api/prj/pctask/taskreference', 'GET', params);
}

//任务卡片--相关交流--内容
export const getTaskExchange = params => {
	return WeaTools.callApi('/api/prj/pctask/taskdiscuss', 'GET', params);
}

//任务卡片--相关交流--高级搜索
export const getTaskExchangeCondition = params => {
	return WeaTools.callApi('/api/prj/pctask/taskcondition', 'GET', params);
}