import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Tabs,Card,Pagination,Row,Col } from 'antd';
import {toJS} from "mobx";
import {Condition,getAdButtons} from './list/listCondition';
import {WeaTableNew} from 'comsMobx';
const WeaTable = WeaTableNew.WeaTable;
import {WeaRightMenu,WeaTop,WeaTab,WeaErrorPage, WeaDialog,WeaBrowser,WeaTools,WeaLeftRightLayout,WeaProgress} from 'ecCom';

@inject('taskExecuteStore')
@observer
class ProjectExecute extends React.Component {
    constructor(props) {
		super(props);
	}

    componentDidMount() {
        this.doInit(this.props);
    }
    doInit(props){
        const { location,taskExecuteStore } = props;
        const {initDatas,doSearch} = taskExecuteStore;
        initDatas();
        doSearch();
    }
    componentWillUnmount(){
        const { taskExecuteStore } = this.props;
        taskExecuteStore.clearStatus();
    }

    render(){
        const {taskExecuteStore} = this.props;
        const {title,loading,tableStore,showSearchAd,showBatchSubmit,form,config,formParams,topTab,topTabCount,searchParams} = taskExecuteStore;
        return (
        <WeaRightMenu datas={this.getRightMenu()} >
            <WeaTop
                    title={title}
                    loading={loading}
                    icon={<i className='icon-coms-project' />}
                    iconBgcolor='#217346'
                    buttons={[]}
                    buttonSpace={10}
                    showDropIcon={true}
                    dropMenuDatas={this.getRightMenu()}
                    /* onDropMenuClick={this.onRightMenuClick} */
                >
                <WeaLeftRightLayout 
                    leftCom={<a>ee</a>}
                    defaultShowLeft={true}  
                    leftWidth={25}
                >
                    <WeaTab
                        datas={topTab}
                        counts={topTabCount}
                        keyParam="tabkey"  //主键
                        countParam="groupid" //数量
                        selectedKey={ searchParams.tabkey }
                        buttonsAd={getAdButtons(taskExecuteStore)}
                        searchType={['base','advanced']}
                        searchsBaseValue={""}
                        setShowSearchAd={bool=>{taskExecuteStore.setShowSearchAd(bool)}}
                        hideSearchAd={()=> taskExecuteStore.setShowSearchAd(false)}
                        searchsAd={
                            <div><Condition listStore={taskExecuteStore} form={form}></Condition></div>
                        }
                        showSearchAd={showSearchAd}
                        onSearch={v=>{taskExecuteStore.doSearch()}}
                        onSearchChange={v=>{taskExecuteStore.setFormFields({taskname:{value:v}})}}
                        onChange={ this.changeData }
                    />
                   
                   {
                //     <WeaTable 
                //     comsWeaTableStore={tableStore}
                //     hasOrder={true}
                //     needScroll={true}
                //     getColumns={c=>this.reRenderColumns(c)}
                // />
                   }
                    </WeaLeftRightLayout>
                </WeaTop>
        </WeaRightMenu>)

    }

    getRightMenu(){

    }
    reRenderColumns(columns){
        columns.forEach(c=>{
            if(c.dataIndex=='finish'){
                c.render = function(text, record){
                    return  <span  className='wea-prj-progressStyle' >
                    <WeaProgress percent={record.finish}  strokeColor={record.finishspan} />
                </span>
                }
            } else {
              c.render = function(text, record){
                  let valueSpan = record[c.dataIndex + "span"] !== undefined ? record[c.dataIndex + "span"] : record[c.dataIndex];
                  return <span dangerouslySetInnerHTML={{__html: valueSpan}}></span>
                }
            }
        })
        return columns;
    }
    changeData=(key)=>{
        const {taskExecuteStore} = this.props;
        taskExecuteStore.setShowSearchAd(false);
        taskExecuteStore.doSearch({
            tabkey:key
        });
    }
}

export default ProjectExecute;