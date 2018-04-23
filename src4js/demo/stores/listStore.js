import { observable, action } from 'mobx';
import {WeaTableNew,WeaForm} from 'comsMobx'
const {TableStore} = WeaTableNew;

/**
 * @author ljc 2017-11-20
 * 项目列表通用store模板，适用于列表+高级搜索查询模式，实例：任务执行/
 */
export class ListStore{
    /** 列表store */
    @observable loading = false;
    title = "";
    dataKey = "";
    @observable tableStore = new TableStore();

    /** 高级查询store */
    @observable form = new WeaForm();
    @observable showSearchAd = false;   //高级搜索显隐
    condition = [];

    /** 顶部Tab组件store */
    topTab = [];
    topTabCount = {};

    constructor() {
        this.setLoading = this.setLoading.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setShowSearchAd = this.setShowSearchAd.bind(this);
        this.setFormFields = this.setFormFields.bind(this);
        this.appendFormFields = this.appendFormFields.bind(this);
        this.clearFormFields = this.clearFormFields.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.resetTable = this.resetTable.bind(this);
    }

    @action
    setLoading(bool = false){
        this.loading = bool;
    }
    
    setTitle(title){
        this.title = title;
    }

    setShowSearchAd(bool) {
        this.showSearchAd = bool;
    }

    setFormFields(value){
        this.form.updateFields(value, true);    //true代表完全覆盖方式更新条件值
    }

    appendFormFields(){
        this.form.updateFields(value, false);
    }

    clearFormFields(){
        this.form.reset();      //清除查询条件值
    }

    resetForm(){
        this.form = new WeaForm();
    }

    resetTable(){
        this.dataKey = "";
        this.tableStore = new TableStore();
    }

}