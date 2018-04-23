import { observable, action, autorun,toJS } from 'mobx';
import {WeaTableNew,WeaForm} from 'comsMobx'
const {TableStore} = WeaTableNew;
import { ListStore } from '../listStore';


import {WeaTools} from "ecCom"
import * as  Apis from '../../apis/task';
import * as  Apis_common from '../../apis/';

class TaskExecuteStore  extends ListStore{	
	title = "任务执行";
	topTab = [
		{
			color: '#000000',
			groupid: 'totalCount1',
			showcount: true,
			title: '全部',
			tabkey: "all"
		},
		{
			color: '#ff3232',
			groupid: 'totalCount2',
			showcount: true,
			title: '未开始',
			tabkey: "todo"
		},
		{
			color: '#fea468',
			groupid: 'totalCount3',
			showcount: true,
			title: '进行中',
			tabkey: "doing"
		},
		{
			color: '#9766fd',
			groupid: 'totalCount4',
			showcount: true,
			title: '已延期',
			tabkey: "overtime"
		}
	];
	@observable topTabCount =[];
	@observable baseParams={

	}
	@observable searchParams =  {
		tabkey: "all",
	}
	@observable rightMenu =[];
	conditiontype = {conditiontype:"execute"};
	
	@observable shareData ={
		type:"任务",
		visible:false
	}

	@action
	appendBaseParams=(params)=> {
        this.baseParams = {...this.baseParams,...params};
    }

    initDatas=(params = {})=> {
		let newParams = {...this.conditiontype,...params};
		this.title = this.title;
		this.topTab = this.topTab;
		this.topTabCount = this.topTabCount;
		Apis.getTaskCondition(newParams).then(data=>{
			this.condition = data.condition;
			//根据高级搜索条件初始化form
			this.form && !this.form.isFormInit && this.form.initFormFields(this.condition);
		});
	}

    doSearch=(params={})=>{
		this.loading = true;
		 //获取表单的参数值
		 const searchParamsAd = this.form.getFormParams();
		 const newParams = { ...this.baseParams, ...this.searchParams, ...searchParamsAd, ...params };
        Apis.getTaskExecuteList(newParams).then(data=>{
			this.tableStore.getDatas(data.sessionkey,  params.current || 1);
			this.searchParams = { ...this.searchParams, ...params };
			this.topTabCount = data.tabnum;
            this.dataKey = data.sessionkey;
            this.loading = false;
        })
	}

	getRightMenu=(params)=> {
		let newParams = {...this.conditiontype,...params};
		Apis_common.getRightMenus(newParams).then(data=>{
            this.rightMenu = data.rightMenus;
        })
	}
	
	clearStatus=()=>{
        // this.searchParams = {viewcondition:0};
        // this.showSearchAd = false;
        // this.selectedTreeKey = "";
        // this.clearFormFields();
    }


    // @action
    // getFormParams() {
    //   return this.form.getFormParams();
	// }
	init=()=>{
		console.log("----------------")
	}

}

export default TaskExecuteStore;