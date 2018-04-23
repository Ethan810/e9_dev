import {observable, action} from 'mobx';

import * as  Apis from '../../apis/project';

class ProjectStore {
  @observable
  status = {
    loading: false,
    leftdatas:{selectedKeys:'',datas:[]},
    middatas:{selectedKey:'',selectname:'',datas:[],totalSize:"0",prjinfo:{}},
    midCurrent: 1,
    pageSize:10,
    prjtype:'',
    prjid:'',
    prjname:'',
    prjinfo:{},
    prjdatas:{},
    tabkey:'1',
  };
  
  @action
  getLeftList(params) {
    let resultParams = {...params,pageSize:this.status.pageSize};
    this.status.loading = true;
    Apis.getPrjTypeTreePageList(resultParams).then((result) => {
      this.status.prjtype = result.leftdatas.selectedKeys;
      this.status.leftdatas = result.leftdatas;
      this.status.middatas = result.middatas;
      this.status.prjid = result.middatas.selectedKey;
      this.status.prjname = result.middatas.selectname;
      this.status.prjinfo = result.middatas.prjinfo;
      this.status.loading = false;
    });
  }

  @action
  getMidList(params) {
    let resultParams = {...params,pageSize:this.status.pageSize};
    this.status.prjtype = params.prjtype;
    Apis.getPrjPageListByTypeId(resultParams).then((result) => {
      this.status.middatas = result;
      this.status.tabkey = '1';
      this.status.prjinfo = result.prjinfo;
      this.status.prjid = result.selectedKey;
      this.status.prjname = result.selectname;
    });
  }

  @action
  setMidCurrent(pagenum) {
    this.status.midCurrent = pagenum;
  }

  @action
  setTabKey(tabkey) {
    this.status.tabkey = tabkey;
  }

  @action
  getProjectView(params) {
    this.status.prjid = params.prjid;
    Apis.getProjectView(params).then((result) => {
      this.status.tabkey = '1';
      this.status.prjname = result.top.name;
      this.status.prjinfo = result;
    });
  }

  @action
  editProject(params) {
    Apis.getProjectView(params).then((result) => {
      this.status.prjinfo = result;
      this.status.prjdatas = result.dataSource;
    });
  }

  @action
  updateDataSource(params) {
      this.status.prjdatas = params;
  }

  @action
  doProjectSave(){
    const prjdatas = this.status.prjdatas;
    let par = { 'prjid': this.status.prjid };
    for (var item in prjdatas) {
      let fieldValue = prjdatas[item].value;
      par[item] = fieldValue;
    }
    this.doProjectBack();
  }

  @action
  doProjectBack(){
    let params = {'prjid':this.status.prjid};
    Apis.getProjectView(params).then((result) => {
      this.status.prjinfo = result;
      this.status.prjdatas = result.dataSource;
    });
  }
}

export default ProjectStore;