
import {Button,Row,Col,  Icon,message,Modal} from 'antd';
import {WeaTools,WeaBrowser} from 'ecCom';
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx';
import PrjShowGroup from '../comp/prj-show-group'
import PrjTableEdit from '../comp/prj-table-edit'
import {WeaTableNew} from 'comsMobx';
const WeaTable = WeaTableNew.WeaTable;

@observer
export default class RelateExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state ={

    }

  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps) {
 
  }
  render() {
    const {contentStore} = this.props;
    const {taskReqStore,relateList} = contentStore;
      const columns = [
        {
            title: '流程类型', //列名
            dataIndex: 'wfname', //列的id 对应数据
            key: 'wfname', //前端渲染key值
            com: [
               { label: '', type: 'LINK_WF' , key: 'wfname', viewAttr:1, width: 120, otherParams: {className: 'test-className'}},
            ],
            colSpan: 1,
            width: '50%',
            className: 'wea-table-edit-name',
        },
        {
            title: '必要', //列名
            dataIndex: 'isNecessary', //列的id 对应数据
            key: 'isNecessary', //前端渲染key值
            com: [
                  { label: '', type: 'CHECKBOX' ,editType: '1', key: 'isNecessary', width: 80, }
            ],
            colSpan: 1,
            width: '40%',
            className: 'wea-table-edit-ismust',
        },
        {
            title: '', //列名
            dataIndex: 'operate', //列的id 对应数据
            key: 'sex', //前端渲染key值
            com: [
                { label: '', type: 'OPERATE' ,editType: '1', key: 'operate', options: [{ key: '1', showname: '删除'}] }
            ],
            colSpan: 1,
            width: '10%',
            className: 'prj-dropdown-link',
        },
    ]
    return (
        <div className="prj-exchange">
            <PrjShowGroup
                leftComponent="所需流程"
                rightComponent={this.getButtons()}
             >
                <PrjTableEdit 
                    columns={columns} 
                    datas={toJS(relateList.needList)}
                    onChange={this.onChange}
                    onRowSelect={null} 
                    pagination={false}
                    viewAttr={1}
                    tableProps={{rowSelection:null}}
                
                    getRowSelection={this.getRowSelection}
                />
                
            </PrjShowGroup>
            <PrjShowGroup
                leftComponent="相关流程"
                rightComponent={this.getRelateButtons()}
                btnspace={10}
            >
                <WeaTable 
                    comsWeaTableStore={taskReqStore}
                    hasOrder={true}
                    needScroll={true}
                />
        </PrjShowGroup>
        </div>)
    }
    getButtons(){
        const {contentStore} = this.props;
        const {taskReqStore,relateList:{canRef}} = contentStore;
        let btn = [];
        if(canRef){
            btn.push(<Button type="primary" className="prj-btn-small" title='添加' size="small" onClick={()=>{}}><Icon type="plus" /></Button>);
        }
        return btn;
    }
    getRelateButtons(){
        const {contentStore} = this.props;
        const {taskReqStore,relateList:{canRelated}} = contentStore;
        let btn = [];
        if(canRelated){
            btn.push(<WeaBrowser type={"152"} title={"流程"} hasAdvanceSerach={true} isSingle={false} onChange ={(ids, names, datas)=>this.addWorkFlow(ids, names, datas)} customized={true} >
                <Button type="primary" className="prj-btn-small" title='添加' size="small" onClick={()=>{}}><Icon type="plus" /></Button>
            </WeaBrowser>);
            btn.push(  <Button type="primary" className="prj-btn-small" title='删除'  disabled={false} size="small" onClick={()=>{}}><Icon type="minus" /></Button>);
        }
        return btn;
    }
    onChange=(data)=>{
        console.log(data)
    }
    //新建流程
    addWorkFlow=(ids, names, datas)=>{
        console.log(ids, names, datas)
    }

}

