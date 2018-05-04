import { observable, action, autorun,toJS } from 'mobx';

class TestStore {
     /** 高级查询store */
    @observable tabkey = "1";//右边部分key

    @action 
    setShowSearchAd=(bool)=> {
      this.showSearchAd = bool;
    }

    doSearch=()=>{
      this.loading = true;
    
    }

    changeTab=(key)=>{
        this.tabkey = key
    }

    getList(){
     
    }


}
const testStore = new TestStore()
export default testStore;