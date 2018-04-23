import React from 'react';
import { inject, observer } from 'mobx-react';
import {toJS} from "mobx"
import {WeaTop ,WeaDropMenu,WeaOrgTree,WeaLeftTree,WeaTab,WeaRadioGroup,WeaRightMenu,WeaNewScroll,WeaProgress} from "ecCom"
import {Card,Button,Spin,Tabs } from "antd"
const TabPane = Tabs.TabPane;
import ThreeSideLayout from "../comp/three-side-layout"
import {Condition,getAdButtons} from '../list/listCondition';
import { Form } from 'modeCom'
import Immutable from 'immutable';
const is = Immutable.is;
import { WeaPopoverHrm} from 'ecCom'

import {WeaTableNew} from 'comsMobx';
const WeaTable = WeaTableNew.WeaTable;

@inject('testStore')
@inject('projectStore')
@observer
 class Demo extends React.Component {
    static defaultProps = {
        dataUrl : '/api/hrm/base/getHrmSearchTree?',//异步树的异步url
		companyDropMenu : [{
	    	companyid: "1",
	        name: "类型",
	        isvirtual: "0"},{
	        companyid: "2",
	        name: "组织",
	        isvirtual: "0"}
	    ],//左侧默认下拉菜单
    }
    constructor(props) {
        super(props);
        this.state={
            loading:true,
            showRight:false,
            companysDefault:{
		    	companyid: "1",
		        name: "类型",
		    },
		    showThumbnails:false,
		    checkedThumbnailes:[],
        }
    }  
    
    componentDidMount() {
        this.doInit(this.props);
        const {projectStore} = this.props;
        projectStore.getLeftList();
    }
    doInit(props){
        const {testStore} = this.props;
        const {doSearch} = testStore;
        doSearch();
    }
    shouldComponentUpdate(nextProps,nextState) {
        return true;
    }
    render() {  
        const {testStore} = this.props;
        const {title,loading,dataKey,tableStore,topTab,topTabCount,searchParams,showSearchAd,showBatchSubmit,form,config} = testStore;
        const formParams = form.getFormParams() || {};
        const {showRight } = this.state;
        tableStore.readAll();
        return ( 
            <ThreeSideLayout
                defaultShowLeft={true}
                leftWidth={250}
                leftCom={this.leftCom()}
                rightCom={this.rightCom()}
                rightWidth={"60%"}
                showRight={showRight}
            >
            <WeaPopoverHrm />
            <div className="prjTop-search" onClick={()=>this.setShowRight(false)}>
                <WeaTop
                    title={"项目"}
                    loading={loading}
                    icon={<i className='icon-coms-project' />}
                    iconBgcolor='#217346'
                    buttons={[]}
                    buttonSpace={10}
                    showDropIcon={true}
                    // dropMenuDatas={this.getRightMenu()}
                    // onDropMenuClick={this.onRightMenuClick.bind(this)}
                >
                    <WeaTab
                        buttonsAd={getAdButtons(testStore)}
                        searchType={['base','advanced']}
                        searchsBaseValue={formParams.requestname}
                        setShowSearchAd={bool=>{testStore.setShowSearchAd(bool)}}
                        hideSearchAd={()=> testStore.setShowSearchAd(false)}
                        searchsAd={
                        <div></div>
                        }
                        showSearchAd={showSearchAd}
                        onSearch={v=>{testStore.doSearch()}}
                        onSearchChange={v=>{testStore.setFormFields({requestname:{value:v}})}}
                    />
                    <WeaRadioGroup config={toJS(config)} onChange={(params)=> {  this.doInit();console.log('params', params)}}/>
                    <Spin spinning={loading}>
                        <WeaTable 
                            sessionkey={dataKey}
                            comsWeaTableStore={tableStore}
                            hasOrder={true}
                            needScroll={true}
                            getColumns={c=>this.reRenderColumns(c)}
                            onRowClick={(record, index)=>{this.setShowRight(true);console.log(record, index)}} />
                    </Spin>
                </WeaTop>
            </div>
            </ThreeSideLayout>)
    }
    //<Button type="primary" onClick={this.setShowRight}>显示列表</Button>
    
    leftCom(){
        const {actions,defaultExpandedKeys,firstClassTree,loading,companyDropMenu,testStore} = this.props;
        const {companysDefault}=this.state;
        const {typeData}= testStore
        return  <div onClick={()=>this.setShowRight(false)}>
                <WeaDropMenu defaultMenu={companysDefault.name} dropMenu={companyDropMenu} onSelect={this.menuSelect}/>
                {companysDefault.companyid=='2' &&
                    <WeaOrgTree
                        topPrefix={'prjOrg'}
                        inputLeftDom = {'<b>全部类型</b>'}
                        dataUrl={this.props.dataUrl}
                        needDropMenu={false}
                        needSearch
                        isLoadSubDepartment
                        companyDropMenu={companyDropMenu}
                        companysDefault={{name : companysDefault.name}}
                        onSelect={this.menuSelect}
                        defaultExpandedKeys={defaultExpandedKeys}
                        firstClassTree={firstClassTree&&firstClassTree.toJS()}
                        treeNodeClick={this.treeNodeClick}
                        onSearchChange={v => actions.treeSearch({keyword:v})}
                        onFliterAll={()=>{}}
                    />
                }
                {companysDefault.companyid=='1' &&
                    <div>
                        <WeaLeftTree
                            datas={toJS(typeData.treedata)}
                            counts={toJS(typeData.treecount)}
                            countsType={toJS(typeData.treecountcfg)}
                            selectedKeys={ []}
                            onFliterAll={()=>{console.log("全部")}}
                            onSelect={(key,topTabCount,countsType)=>{console.log(key,topTabCount,countsType.selectedNodes[0].props.haschild)}} />
                    </div>
                }
            </div>
    }
    rightCom(){
        const {testStore,projectStore} = this.props
        const {tabkey} = testStore;

        const prjinfo = toJS(projectStore.status.prjinfo);

       return <div >
        <WeaTop
                title={"上海投资咨询公司"}
                loading={false}
                icon={<i className='icon-coms-project' />}
                iconBgcolor='#4A4A4A'
                buttons={[]}
                buttonSpace={10}
                showDropIcon={false}
            ><div style={{minWidth:900}}>
                <Tabs defaultActiveKey={'1'} activeKey={tabkey} onChange={this.changeTab}>
                    <TabPane key="1" tab="项目信息">
                    <WeaRightMenu
                        datas={this.getRightMenu()}
                        onClick={this.onRightMenuClick}
                    >
                        {prjinfo.defaultActiveCollapse &&
                            <WeaNewScroll height={700}>
                            <Form
                                groups={prjinfo.groups}
                                dataSource={prjinfo.dataSource}
                                collapse={true}
                                noBorder={false}
                                defaultActiveCollapse={toJS(prjinfo.defaultActiveCollapse)}
                                updateDataSource={this.updateDataSource}
                                // update={this.updatePageConfig}
                                size="middle" >
                            </Form>
                            </WeaNewScroll>}
                    </WeaRightMenu>
                    </TabPane>
                    <TabPane key="2" tab="日报">
                        <div style={{width:1900}}>djih</div>
                    </TabPane>
                    <TabPane key="3" tab="资源">
                       3
                    </TabPane>
                    <TabPane key="4" tab="看板">
4
                    </TabPane>
                    <TabPane key="5" tab="甘特图">
5
                    </TabPane>
                </Tabs>
                </div>
            </WeaTop>
       </div>
    }
    setShowRight=(bool)=>{
        if(bool){
           this.canhide=false
        }else{
            if(!this.canhide){ return; }
        }
        setTimeout(()=>{ this.canhide= true; },200)
        this.setState({
            showRight:bool
        })
    }

    menuSelect=(e)=>{
        const {companysDefault} = this.state;
        this.props.companyDropMenu.forEach((item)=>{
            if(e.key == item.companyid){
                this.setState({
                    companysDefault:{companyid:e.key,name:item.name},
                });
            }
        })
    }
    setModuleData = (a,b) => {
        console.log(a,b)
		//this.props.actions.setSearchInfo(b.id,a);
    }
    treeNodeClick=(nodeObj)=>{
        console.log('onSelect-t',nodeObj);
    }

    getCurrentTable(){
        const { testStore } = this.props;
        const { dataKey,tableStore } = testStore;
        const tableKey = dataKey ? dataKey.split('_')[0] : 'init';
        return tableStore.state[tableKey];
    }
    changeTab=(key)=>{
        const {testStore} = this.props;
        testStore.changeTab(key);
    }
    getRightMenu = () => {
        const {projectStore} = this.props;
        const rightMenu = projectStore.status.prjinfo.rightMenu;
		let btnArr = [];
		rightMenu && !is(rightMenu, Immutable.fromJS({})) && rightMenu.map(m => {
			btnArr.push({
				icon: <i className={m.menuIcon} />,
				content: m.menuName,
				disabled: m.isControl == '1'
			})
		});
		return btnArr
    }
    
    onRightMenuClick = (key) => {
        const {projectStore} = this.props;
        const rightMenu = projectStore.status.prjinfo.rightMenu;
		rightMenu && rightMenu.map((m, i) => {
			if (Number(key) == i) {
				let fn = m.menuFun.indexOf('this') >= 0 ? `${m.menuFun.split('this')[0]})` : m.menuFun;
				if (fn == "") {
					if (m.type == "BTN_EDIT") { //编辑
						projectStore.editProject({'prjid':projectStore.status.prjid,'viewtype':'edit'})
					}else if(m.type == "BTN_SAVE") {
                        projectStore.doProjectSave();
                    }else if(m.type == "BTN_BACK") {
                        projectStore.doProjectBack();
                    }
				}
			}
		});
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
}  




export default Demo