import { WeaSearchGroup,WeaFormItem } from 'ecCom';
import { Button,Form } from 'antd';
import {toJS} from "mobx"
import {WeaSwitch} from "comsMobx"

class Condition extends React.Component{
    render(){
        const { condition,  } = this.props.listStore;
        const {form} = this.props;
        const {isFormInit} = form;
        let group = [];
        const formParams = form.getFormParams();
        isFormInit &&  toJS(condition).map(c =>{
          let items = [];
          c.items.map(fields => {
            items.push({
              com:(<WeaFormItem
                  label={`${fields.label}`}
                  labelCol={{span: `${fields.labelcol}`}}
                  wrapperCol={{span: `${fields.fieldcol}`}}>
                        <WeaSwitch fieldConfig={fields} form={form} formParams={formParams}/>
                  </WeaFormItem>),
              colSpan:1
            })
          });
          group.push(<WeaSearchGroup needTigger={true} title={c.title} showGroup={c.defaultshow} items={items}/>)
        });
        return group;
    }
}

const getAdButtons = (listStore) => {
	const {doSearch,setShowSearchAd,clearFormFields} = listStore;
	return [
		(<Button type="primary" onClick={()=>{doSearch();setShowSearchAd(false);}}>搜索</Button>),
		(<Button type="ghost" onClick={()=>{clearFormFields();}}>重置</Button>),
		(<Button type="ghost" onClick={()=>{setShowSearchAd(false)}}>取消</Button>)
	];
}

export {Condition,getAdButtons}
