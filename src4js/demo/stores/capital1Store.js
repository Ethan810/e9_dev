import { observable, action } from 'mobx';
import {WeaTableNew,WeaForm} from 'comsMobx'
const {TableStore} = WeaTableNew;
import objectAssign from "object-assign"
import * as  Apis from '../apis/birthday';
import MobxReactForm from 'mobx-react-form';
// import  testField  from './cpt1Form/fields'
// console.log(testField)
import {getFormFields} from "../util/index"

 class Capital1Store{
    @observable cptDatas ={
        codeType : "1", 
    }
    @observable form = new MobxReactForm();
    @observable formloading = true;
    @observable condition = [];
    @observable tempCondition = [];

    @action 
    initData = (params) =>{
		// Apis.getBirthdayCondition(params).then(data=>{
            let _this = this;
		setTimeout(() => {
            let data =[
                {
                    "labelcol": 6,
                    "colSpan": 2,
                    "viewAttr": 2,
                    "value": "0",
                    "conditionType": "SWITCH",
                    "domkey": [
                        "cptGroupCode"
                    ],
                    "fieldcol": 17,
                    "label": "资产组编号",
                    "id":1,
                    "order":0
                }, 	{
                    "labelcol": 6,
                    "colSpan": 2,
                    "viewAttr": 2,
                    "value": "1",
                    "conditionType": "SWITCH",
                    "domkey": [
                        "cptTypeCode"
                    ],
                    "fieldcol": 17,
                    "label": "资产类型编号",
                    "id":2,
                    "order":1
                }, {
                    "labelcol": 6,
                    "colSpan": 2,
                    "viewAttr": 2,
                    "length": 20,
                    "value": "",
                    "conditionType": "INPUTNUMBER",
                    "domkey": [
                        "flowNum"
                    ],
                    "fieldcol": 17,
                    "label": "流水号位数",
                    "id":3,
                    "order":2
                }, {
                    "labelcol": 6,
                    "colSpan": 2,
                    "viewAttr": 2,
                    "value": "FW",
                    "conditionType": "INPUT",
                    "domkey": [
                        "letter"
                    ],
                    "fieldcol": 17,
                    "label": "字母",
                    "id":4,
                    "order":3                    
                } ,{
                    "labelcol": 6,
                    "colSpan": 2,
                    "viewAttr": 2,
                    "value": "",
                    "conditionType": "INPUT",
                    "domkey": [
                        "str1"
                    ],
                    "fieldcol": 17,
                    "label": "字符串一",
                    "id":5,
                    "order":4                    
                }, {
                    "labelcol": 6,
                    "colSpan": 2,
                    "viewAttr": 2,
                    "value": "",
                    "conditionType": "INPUT",
                    "domkey": [
                        "str2"
                    ],
                    "fieldcol": 17,
                    "label": "字符串二",
                    "id":6,
                    "order":5
                }, {
                    "labelcol": 6,
                    "colSpan": 2,
                    "viewAttr": 2,
                    "value": "",
                    "conditionType": "INPUT",
                    "domkey": [
                        "str3"
                    ],
                    "fieldcol": 17,
                    "label": "字符串三",
                    "id":7,
                    "order":6
                }
            ];
            console.log(getFormFields(data))
            
            _this.form &&  _this.form.initFields({fields:getFormFields(data)});
            _this.condition  = data;
            _this.tempCondition = data;
            _this.formloading = false
        }, 1000);
		// });
    }

    changeCodeType=(obj)=>{
        this.cptDatas = objectAssign({}, this.cptDatas, obj);
    }

    saveTempCondition = (data)=>{
        this.tempCondition = data;
    }

}

const capital1Store = new Capital1Store();
export default capital1Store