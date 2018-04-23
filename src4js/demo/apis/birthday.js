import { WeaTools } from 'ecCom';

//列表
export const getBirthdayList = params => {
	return WeaTools.callApi('/api/crm/customer/birthdayList', 'GET', params);
}

//高级搜索
export const getBirthdayCondition = params => {
	return WeaTools.callApi('/api/crm/customer/birthdayCondition', 'GET', params);
}

