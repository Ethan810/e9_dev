import React from 'react';
import { Button, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import {WeaRightMenu,WeaReqTop,WeaNewScroll,WeaSearchGroup,WeaFormItem ,WeaDatePicker,WeaTimePicker,WeaTools,WeaAlertPage} from "ecCom"
import {WeaTableNew,WeaSwitch} from 'comsMobx';
const WeaTable = WeaTableNew.WeaTable;
const getKey = WeaTools.getKey;
import RelareExchange from '../common/relateExchange'
import RelateWorkFlow from '../common/relateWorkFlow'
import RelateDocument from "../common/relateDocument"
import TaskSub from '../common/taskSub'
import TaskShare from '../common/taskShare'

@inject('taskCardStore')
@observer
class TaskCard extends React.Component {
    componentDidMount() {
        const {taskCardStore,location:{query} }= this.props;
        const {tabDatas,selectTabKey,form} = taskCardStore;
        console.log(query)
        taskCardStore.getTaskForm({viewtype:'edit',...query});
    }

    render() {
        const {taskCardStore }= this.props;
        const {tabDatas,selectTabKey,loading,taskname,isShowTaskShare,taskCptStore,taskCrmStore,hasRight,verified} = taskCardStore;
        if (verified && !hasRight) {
            return (<WeaAlertPage >
                    <div style={{color : '#000'}}>
                        对不起，您暂时没有权限！
                    </div>
                </WeaAlertPage>
            )
        } 
        if (verified && hasRight) {
            return (
            <div>
                <WeaRightMenu datas={this.getRightMenu()} onClick={this.onRightMenuClick.bind(this)}>
                    <WeaReqTop
                        title={taskname}
                        loading={loading}
                        icon={<i className='icon-coms-project' />}
                        iconBgcolor='#217346'
                        buttons={this.getButtons()}
                        buttonSpace={10}
                        showDropIcon={true}
                        dropMenuDatas={this.getRightMenu()}
                        onDropMenuClick={this.onRightMenuClick.bind(this)}
                        tabDatas={tabDatas}
                        selectedKey={selectTabKey}
                        onChange={this.taskCardChangeTab.bind(this)}
                    >
                        <div className="prj-req-content">
                            <div className='prj-req-content-inner'>
                            <WeaNewScroll scrollId='prj-req-content-main-scroll' height='100%'>
                            {
                                selectTabKey === 'taskinfo' && 
                                <div style={{height: '100%' }}>
                                        {this.getFormFields()}
                                </div>
                            }
                            {
                                selectTabKey === 'tasksub' && 
                                <div style={{height: '100%' }}>
                                    <TaskSub contentStore={taskCardStore} />
                                    
                                </div>
                            }
                            {
                                selectTabKey === 'exchange' && 
                                <div style={{height: '100%' }}>
                                    <RelareExchange contentStore={taskCardStore}  />
                                </div>
                            }
                            {
                                selectTabKey === 'taskshare' && 
                                <div style={{height: '100%' }}>
                                    <TaskShare contentStore={taskCardStore}   title="添加任务共享"/>
                                </div>
                            }
                            {
                                selectTabKey === 'req' && 
                                <div style={{height: '100%' }}>
                                        <RelateWorkFlow contentStore={taskCardStore} />
                                </div>
                            }
                            {
                                selectTabKey === 'doc' && 
                                <div style={{height: '100%' }}>
                                    <RelateDocument contentStore={taskCardStore} />
                                </div>
                            }
                            {
                                selectTabKey === 'crm' && 
                                <div style={{height: '100%' }}>
                                    <WeaTable 
                                        comsWeaTableStore={taskCrmStore}
                                        hasOrder={true}
                                        needScroll={true}
                                    />
                                </div>
                            }
                            {
                                selectTabKey === 'cpt' && 
                                <div style={{height: '100%' }}>
                                    <WeaTable 
                                        comsWeaTableStore={taskCptStore}
                                        hasOrder={true}
                                        needScroll={true}
                                    />
                                </div>
                            }
                            </WeaNewScroll>
                            </div>
                        </div>
                    </WeaReqTop>
                </WeaRightMenu>
            </div>
            )
        }
        return (<div></div>)
    }
    getButtons(){
        const {taskCardStore }= this.props;
        const {rightMenu} = taskCardStore;
        let btnArr = [];
        let that = this;
        rightMenu && rightMenu.length>0  && rightMenu.map(m=>{
            m.isTop == '1' && btnArr.length < 4 && btnArr.push(
                <Button type="primary" 
                    onClick={()=>{
                     let fn = m.menuFun.indexOf('this') >= 0 ? `${m.menuFun.split('this')[0]})` : m.menuFun;
                     if(m.type == "BTN_NEWSUB"){ //添加子任务
                        
                     }else if(m.type == "BTN_DELETE"){ //删除
 
                     }else if(m.type == "BTN_APPEND"){ //共享-添加
                        taskCardStore.showTaskShare(true);
                    }
                 }}>
                    {m.menuName}
                </Button>
            );
        });
        return btnArr;
    }
    getRightMenu(){
        const {taskCardStore }= this.props;
        const {rightMenu} = taskCardStore;
        let btnArr = [];
        rightMenu && rightMenu.length>0 && rightMenu.map(m=>{
            btnArr.push({
                icon: <i className={m.menuIcon} />,
                content: m.menuName
            })
        });
    	return btnArr
    }
    onRightMenuClick(key){
        const {taskCardStore }= this.props;
        const {rightMenu} = taskCardStore;
        let that = this;
        rightMenu &&  rightMenu.length>0  && rightMenu.map((m,i)=>{
        	if(Number(key) == i){
                let fn = m.menuFun.indexOf('this') >= 0 ? `${m.menuFun.split('this')[0]})` : m.menuFun;
                if(m.type == "BTN_NEWSUB"){ //添加子任务
                 
                }else if(m.type == "BTN_COLUMN"){ //定制列
                    taskCardStore.onShowColumn();
                }else if(m.type == "BTN_APPEND"){ //共享-添加
                    taskCardStore.showTaskShare(true);
                }
            }
        });
    }
    taskCardChangeTab(key){
        const {taskCardStore} =this.props;
        taskCardStore.changeTab(key);
    }
    getFormFields(){
        const { fieldInfo, form } = this.props.taskCardStore;
        const {isFormInit} = form;
        let group = [];
        const formParams = form.getFormParams();
        isFormInit &&  fieldInfo.map(c =>{
          let items = [];
          c.items.map(fields => {
            if(fields.conditionType == "DATE_TIME"){
                // const key = getKey(c);
                // const bindObj = form.$(key);
                // delete c.value;
                // items.push({
                //     com:(<WeaFormItem
                //         label={`${fields.label}`}
                //         labelCol={{span: `${fields.labelcol}`}}
                //         wrapperCol={{span: `${fields.fieldcol}`}}>
                //             <WeaDatePicker
                //                 {...bindObj.bind()}
                //                 onChange={(...args)=> {this.onChange(key, args); bindObj.onChange(...args)}}
                //                 {...c}
                //                 {...c.otherParams}
                //                 formatPattern={c.formatPattern || 2}
                //             />
                //             <WeaTimePicker
                //             {...bindObj.bind()}
                //             onChange={(...args)=> {this.onChange(key, args); bindObj.onChange(...args)}}
                //             {...c}
                //             {...c.otherParams}
                //             formatPattern={c.formatPattern || 3}
                //             />
                //         </WeaFormItem>),
                //     colSpan:1
                // })
            }else{
                items.push({
                    com:(<WeaFormItem
                        label={`${fields.label}`}
                        labelCol={{span: `${fields.labelcol}`}}
                        wrapperCol={{span: `${fields.fieldcol}`}}>
                              <WeaSwitch fieldConfig={fields} form={form} formParams={formParams}/>
                        </WeaFormItem>),
                    colSpan:1
                })
            }
          });
          group.push(<WeaSearchGroup needTigger={true} title={c.title} col={2} showGroup={c.defaultshow} items={items}/>)
        });
        return group;
    }
    cancelShare=()=>{
        const {taskCardStore} = this.props;
        taskCardStore.showTaskShare(false);
    }
    saveShare=()=>{
        const {taskCardStore} = this.props;
        taskCardStore.showTaskShare(false);
    }
}

export default TaskCard;