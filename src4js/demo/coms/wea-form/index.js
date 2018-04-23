import * as mobx from 'mobx';
import {observable, action} from 'mobx';
import {Form, Field} from 'mobx-react-form';
import {WeaTools} from 'ecCom';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
const getKey = WeaTools.getKey;
const types = WeaTools.types;
import _ from 'lodash';

function getValueByfield(field) {
  const type = field.conditionType.toUpperCase();
  let arrs = [types.INPUT, types.CHECKBOX, types.DATEPICKER, types.TIMEPICKER, types.TEXTAREA];
  if (arrs.indexOf(type) > -1) {
    if (field.value !== undefined) {
      return {
        value: field.value
      }
    }
  }
  if (types.SELECT === type) {
    let value = WeaTools.getSelectDefaultValue(field.options);
    if (field.value !== undefined) value = field.value;
    if (value !== undefined) {
      return {
        value: value
      }
    }
  }
  if (types.BROWSER === type) {
    if (!isEmpty(field.browserConditionParam)) {
      const replacesDatas = field.browserConditionParam.replaceDatas || field.browserConditionParam.valueObj;
      if (!isEmpty(replacesDatas)) {
        let values = [], names = [];
        replacesDatas.forEach((d)=> {
          values.push(d.id);
          names.push(d.lastname || d.name); // 人力按钮特殊处理
        })
        return {
          value: values.join(','),
          valueSpan: names.join(','),
          valueObj: replacesDatas
        }
      }
    }
  }
  if (types.DATE === type) {
    let selectValue = '0', startValue = null, endValue = null;
    if (!isEmpty(field.options)) selectValue = WeaTools.getSelectDefaultValue(field.options) || selectValue;
    if (!isEmpty(field.value)) {
      selectValue = field.value[field.domkey[0]];
      startValue = field.value[field.domkey[1]];
      endValue = field.value[field.domkey[2]];
    }
    return {
      value: [selectValue, startValue, endValue]
    }
  }

  if (types.SELECT_LINKAGE === type) {
    let selectValue = WeaTools.getSelectDefaultValue(field.options) || '0';
    return {
      value: [selectValue]
    }
  }

  if (types.SCOPE === type) {
    let sValue = field.startValue || '', eValue = field.endValue || '';
    return {
      value: [sValue, eValue]
    }
  }
}

class MyField extends Field {
  @observable valueSpan = null;
  @observable valueObj = null;

  onChange = (...args) => {
    if (args[1]) this.valueSpan = args[1];
    if (args[2]) this.valueObj = args[2];
    this.set(args[0]);
  }
}

const bindings = {
  default: {
    id: 'id',
    name: 'name',
    value: 'value',
    valueSpan: 'valueSpan',
    valueObj: 'valueObj',
    label: 'label',
    checked: 'checked',
    placeholder: 'placeholder',
    disabled: 'disabled',
    onChange: 'onChange',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
    autoFocus: 'autoFocus',
  }
};

export class WeaForm extends Form {
  fieldArr = [];
  @observable isFormInit = false;

  constructor(props) {
    super(props);
    this.keyTypeMap = {};
  }

  makeField(props) {
    return new MyField(props);
  }

  bindings() {
    return bindings;
  }

  @action
  initFormFields(condition) {
    let fields = [];
    let values = {};
    condition && condition.map(c =>{
      c.items.map(f => {
        this.fieldArr.push(f);
        let key = getKey(f);
        let v = getValueByfield(f);
        this.keyTypeMap[key] = f.conditionType.toUpperCase();
        if (v) values[key] = v;
        fields.push(key);
      });
    })
    this.initFields({fields});
    this.updateFields(values); //根据默认条件初始化值
    this.isFormInit = true;
  }

  @action
  initFormFieldObj(obj){
    let fields = [];
    let values = {};
    if(isArray(obj)){
      obj.map(item=>{
        this.fieldArr.push(item);
        let key = getKey(item);
        let v = getValueByfield(item);
        this.keyTypeMap[key] = item.conditionType.toUpperCase();
        if (v) values[key] = v;
        fields.push(key);
      });
    }else{
      for(let i in obj){
        let item = obj[i];
        this.fieldArr.push(item);
        let key = getKey(item);
        let v = getValueByfield(item);
        if (v) values[key] = v;
        fields.push(key);
      }
    }
    this.initFields({fields});
    this.updateFields(values); //根据默认条件初始化值
    this.isFormInit = true;
  }

  @action
  resetConditionValue() { // 保留select的默认值
    this.reset();
    let values = {};
    this.isFormInit && this.fieldArr.map(item =>{
      const type = item.conditionType.toUpperCase();
      if (types.SELECT === type || types.DATE === type || types.SELECT_LINKAGE === type) {
        let key = getKey(item);
        let v = getValueByfield(item);
        if (v) values[key] = v;
      }
    })
    this.updateFields(values);
  }

  @action
  updateFields(datas, updateAll = false) {
    if (updateAll)
      this.resetConditionValue();
    const fields = this.fields;
    _.each(datas, (data, k) => {
      let item = fields.get(k);
      if (_.isString(data)) {
        item.value = data;
      } else {
        item.value = data.value;
        item.valueSpan = data.valueSpan;
        item.valueObj = data.valueObj;
      }
    })
  }

  getFormDatas() {
    let params = {};
    this.each((f)=> {
      let key = f.key;
      let value = mobx.toJS(f.value);
      let valueSpan = f.valueSpan;
      let valueObj = f.valueObj;
      if (value) {
        if (isArray(value) && value[1]) value[1] = mobx.toJS(value[1]); // 联动组件中的浏览按钮数据特殊处理
        params[key] = {
          value: value,
        };
        if (valueSpan) params[key].valueSpan = valueSpan;
        if (valueObj) params[key].valueObj = mobx.toJS(valueObj);
      }
    })
    return params;
  }

  getFormParams() {
    let params = {};
    this.each((f)=> {
      let key = f.key.split('__');
      let value = f.value;
      //hardcode 处理SELECT_LINKAGE类型的组件
      if (types.SELECT_LINKAGE == this.keyTypeMap[f.key]) {
        params[key[0]] = value[0];
        let target = mobx.toJS(value[1]);
        let targetKey = f.valueSpan || key[1];
        if (target != undefined) params[targetKey] = isArray(target)? target[0]: target;
      } else {
        if (!isEmpty(value)) {
          if (key.length > 1) {
            key.forEach((k, i)=> {
              let item = mobx.toJS(value[i]);
              if (isArray(item)) item = item[0];
              if (item) params[k] = item;
            })
          } else {
            params[key[0]] = value;
          }
        }
      }
    })
    return params;
  }
};