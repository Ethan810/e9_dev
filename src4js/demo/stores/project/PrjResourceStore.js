import {observable, action} from 'mobx';

import * as  Apis from '../../apis/project';

import { WeaTools } from 'ecCom';

import {WeaTableNew} from 'comsMobx'
const {TableStore} = WeaTableNew;

class PrjResourceStore {
  @observable dataKey = '';
  @observable searchParams = {};

  @observable tableStore = new TableStore()

  @action
  doSearch(params = {}) {
    Apis.getPrjResource(params).then((data) => {
      this.tableStore.getDatas(data.sessionkey, params.current || 1);
      this.searchParams = { ...params };
      this.dataKey = data.sessionkey;
    });
  }
  
}

export default PrjResourceStore;