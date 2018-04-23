import { observable, action, autorun,toJS } from 'mobx';

import {WeaTools} from "ecCom"

import {WeaTableNew,WeaForm} from 'comsMobx'
const {TableStore} = WeaTableNew;

class TestStore {
    @observable typeData={
      "treecountcfg": [
        {
          "title": "新的文档",
          "isshow": true,
          "color": "#ff3232",
          "name": "newNum",
          "hovercolor": "#ff3232"
        }, {
          "isshow": true,
          "color": "#c5c5c5",
          "name": "allNum",
          "hovercolor": "#c5c5c5"
        }
      ],
      "treedata": [
        {
          "isopen": true,
          "haschild": false,
          "name": "项目类型（fj）",
          "domid": "prjtype_1",
          "childs": [],
          "key": "1"
        }, {
          "isopen": true,
          "haschild": false,
          "name": "产品类",
          "domid": "prjtype_2",
          "childs": [],
          "key": "2"
        }, {
          "isopen": true,
          "haschild": false,
          "name": "开发类",
          "domid": "prjtype_3",
          "childs": [],
          "key": "3"
        }, {
          "isopen": true,
          "haschild": false,
          "name": "权限重构类型",
          "domid": "prjtype_4",
          "childs": [],
          "key": "4"
        }, {
          "isopen": true,
          "haschild": false,
          "name": "test1",
          "domid": "prjtype_5",
          "childs": [],
          "key": "5"
        }, {
          "isopen": true,
          "haschild": false,
          "name": "甘特图test1",
          "domid": "prjtype_6",
          "childs": [],
          "key": "6"
        }, {
          "isopen": true,
          "haschild": false,
          "name": "20170908项目类型",
          "domid": "prjtype_7",
          "childs": [],
          "key": "7"
        }
      ],
      "selectedKeys": "1",
      "treecount": {
        "prjtype_2": {
          "keyid": "2",
          "newNum": "0",
          "allNum": "5",
          "domid": "prjtype_2"
        },
        "prjtype_1": {
          "keyid": "1",
          "newNum": "0",  "allNum": "5",
          "domid": "prjtype_1"
        },
        "prjtype_4": {
          "keyid": "4",
          "newNum": "0",  "allNum": "5",
          "domid": "prjtype_4"
        },
        "prjtype_3": {
          "keyid": "3",
          "newNum": "0",  "allNum": "5",
          "domid": "prjtype_3"
        },
        "prjtype_6": {
          "keyid": "6",  "allNum": "5",
          "newNum": "0",
          "domid": "prjtype_6"
        },
        "prjtype_5": {
          "keyid": "5",  "allNum": "5",
          "newNum": "0",
          "domid": "prjtype_5"
        },
        "prjtype_7": {
          "keyid": "7",
          "newNum": "0",  "allNum": "5",
          "domid": "prjtype_7"
        }
      }
    }
     /** 高级查询store */
     @observable form = new WeaForm();
     @observable showSearchAd = false;
     condition = [];

      /** 列表store */
    @observable loading = false;
    title = "";
    dataKey = "";
    @observable tableStore = new TableStore();
    @observable cptStore = new TableStore();

    @observable config =[
      {
        label: '阶段',
        options: [
          {key:'1',showname:'全部'},
          {key:'2',showname:'立项', selected: true},
          {key:'3',showname:'搭建中'},
          {key:'4',showname:'验收中'},
          {key:'5',showname:'维护中'}
        ],
        domkey: ['state'],
        labelcol:3,
        fieldcol: 21,
      },
      {
        label: '状态',
        options: [
          {key:'1',showname:'全部'},
          {key:'2',showname:'草稿', selected: true},
          {key:'3',showname:'正常'},
          {key:'4',showname:'延期'},
          {key:'5',showname:'已完成'},
          {key:'6',showname:'警告'}
        ],
        domkey: ['status'],
        labelcol:3,
        fieldcol: 21,
      },
      {
        label: '标签',
        options: [
          {key:'1',showname:'重点关注'},
          {key:'2',showname:'e-weaver', selected: true},
          {key:'3',showname:'e-cology'},
          {key:'4',showname:'政府OA办公项'}
        ],
        domkey: ['tag'],
        labelcol:3,
        fieldcol: 21,
      }
    ]
    @observable tabkey = "1";//右边部分key

    @action 
    setShowSearchAd=(bool)=> {
      this.showSearchAd = bool;
    }

    doSearch=()=>{
      this.loading = true;
      WeaTools.callApi('/api/prj/pcproject/getProjectList', 'GET', {}).then(data=>{
        this.tableStore.getDatas(data.sessionkey, 1);
        this.dataKey = data.sessionkey;
        this.loading = false;
      })
    }

    changeTab=(key)=>{
        this.tabkey = key
    }

    getList(){
      WeaTools.callApi('/api/cpt/capitalsearch/list?type=mycpt', 'GET', {}).then(data=>{
        this.cptStore.getDatas(data.sessionkey, 1);
      
      })
    }


}
const testStore = new TestStore()
export default testStore;