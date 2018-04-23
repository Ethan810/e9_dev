
import {Button,Row,Col,Icon,message,Modal} from 'antd';
import {WeaTab} from 'ecCom';
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx';
import {Condition} from '../list/listCondition';
import {WeaTableNew} from 'comsMobx';
const WeaTable = WeaTableNew.WeaTable;

@observer
export default class TaskSub extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps) {
 
  }
  render() {
        const {contentStore} = this.props;
        const {showSearchAd,taskSubStore,tasksubform} = contentStore;
        const formParams = tasksubform.getFormParams() || {};
    return (
        <div >
            <WeaTab
                buttonsAd={this.getAdButtons()}
                searchType={['base','advanced']}
                searchsBaseValue={formParams.taskname}
                setShowSearchAd={bool=>{contentStore.setShowSearchAd(bool)}}
                hideSearchAd={()=> contentStore.setShowSearchAd(false)}
                searchsAd={
                    <div><Condition listStore={contentStore} form={tasksubform}></Condition></div>
                }
                showSearchAd={showSearchAd}
                onSearch={v=>{contentStore.getTaskSubList()}}
                onSearchChange={v=>{contentStore.setFormFields({taskname:{value:v}})}}
            />
            <WeaTable 
                comsWeaTableStore={taskSubStore}
                hasOrder={true}
                needScroll={true}
            />
        </div>)
    }
    
    getAdButtons = () => {
        const {contentStore} = this.props;
        const {getTaskSubList,setShowSearchAd,clearFormFields} = contentStore;
        return [
            (<Button type="primary" onClick={()=>{getTaskSubList();setShowSearchAd(false);}}>搜索</Button>),
            (<Button type="ghost" onClick={()=>{clearFormFields();}}>重置</Button>),
            (<Button type="ghost" onClick={()=>{setShowSearchAd(false)}}>取消</Button>)
        ];
    }
}

