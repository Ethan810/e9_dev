import {observable, action} from 'mobx';

import {WeaTableNew} from 'comsMobx'
const {TableStore} = WeaTableNew;
import * as  Apis from '../../apis/project';

import { WeaTools } from 'ecCom';

class ProcessListStore {

  @observable orderFields = {};
  @observable dataKey = '';
  @observable tableStore = new TableStore()

  @action
  doSearch(params = {}) {
    Apis.getProject(newParams).then((data) => {
      this.tableStore.getDatas(data.sessionkey, params.current || 1);
      this.searchParams = {...params };
      this.dataKey = data.sessionkey;
    });
  }
  
}

export default ProcessListStore;