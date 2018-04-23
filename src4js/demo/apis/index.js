import { WeaTools } from 'ecCom';

//右键菜单
export const getRightMenus = params => {
	return WeaTools.callApi('/api/prj/prjutil/getrightmenus', 'GET', params);
}