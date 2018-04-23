import React from 'react';
import { Button, Tabs,Card,Pagination,Row,Col } from 'antd';
import { inject, observer } from 'mobx-react';
import { Tree, Menu, TopTitle,Form } from 'modeCom'
import { WeaNewScroll, WeaRightMenu,WeaPopoverHrm } from 'ecCom';
import {toJS} from "mobx"
import Immutable from 'immutable';
const is = Immutable.is;
const NavTree = Tree.NavTree;
import PrjKanBan from "../comp/kanban"

import ProcessList from './ProcessList'
import Prjschedule from '../comp/Prjschedule'
import PrjResource from './PrjResource'

const datas = [
    {
        name: "应用1",
        primaryKey: "1",
        parentKey: "",
        children: [{
            name: "应用2",
            primaryKey: "2",
            parentKey: "1",
        }]
    }
]

const datas2 = [
    {
        name: "项目1",
        primaryKey: 1,
        subName: "aaaaaa"
    }
]
const getDocker = { getDockerHeight: () => document.documentElement.clientHeight };

@inject("projectStore")
@inject("prjResourceStore")
@observer
class Project extends React.Component {
    constructor(props) {
		super(props);
	}
    componentDidMount() {
        const {projectStore} = this.props;
        projectStore.getLeftList();
    }

    
    handleClick = () => {

    }

    render() {
        const {projectStore} = this.props;
        const leftdatas = toJS(projectStore.status.leftdatas);
        const middatas = toJS(projectStore.status.middatas);
        const midCurrent = projectStore.status.midCurrent;
        const tabkey = projectStore.status.tabkey;

        const {groups = [], collapse = false, rightMenu = [],  top,defaultActiveCollapse,height,dataSource,hasright} =this.props;
        const prjinfo = toJS(projectStore.status.prjinfo);
        const columns = [
            {
                title: '立项阶段',
                key: '1',
                items: [
                    { title: '项目交底', key: '1' },
                    { title: '项目启动任务', key: '2' },
                ]
            },
            {
                title: '搭建阶段',
                key: '2',
                items: [
                    { title: '项目交底', key: '4' },
                    { title: '人力资源模块调研', key: '5' },
                    { title: '文档模块需求调研', key: '6' },
                ]
            },
            {
                title: '上线阶段',
                key: '3',
                items: [
                    { title: '项目交底', key: '7' },
                    { title: '人力资源模块调研', key: '8' },
                    { title: '文档模块需求调研', key: '9' },
                ]
            },
            {
                title: '测试阶段',
                key: '4',
                items: [
                    { title: '项目交底', key: '12' },
                    { title: '人力资源模块调研', key: '11' },
                    { title: '文档模块需求调研', key: '13' },
                ]
            }
        ];
        return (
            <NavTree
                top={{ name: '类型', placeholder: '请输入关键字搜索' }}
                datas={leftdatas.datas}
                defaultExpandedKeys={["1"]}
                selectedKeys = {leftdatas.selectedKeys}
                getDocker={{ getDockerHeight: () => document.documentElement.clientHeight }}
                onSelect={this.onSelect}
            >
                <Menu
                    top={{ name: '项目', icon: "icon-coms-project", iconBgcolor: "#217346", placeholder: "请输入关键字搜索" }}
                    datas={middatas.datas}
                    selectedKey={middatas.selectedKey}
                    getDocker={{ getDockerHeight: () => document.documentElement.clientHeight }}
                    leftWidth={300}
                    current = {midCurrent}
                    pageSize = {projectStore.status.pageSize}
                    total={middatas.totalSize}
                    onSelect={this.onPrjSelect}
                    onPaginationChange = {this.onPaginationChange}
                >
                    <TopTitle name={projectStore.status.prjname} icon="icon-coms-project" iconBgcolor="#217346" style={{background:'#fff'}} loading={projectStore.status.loading}>
                        <Tabs defaultActiveKey={'1'} activeKey={tabkey} onChange={this.changeTab}>
                            <Tabs.TabPane key="1" tab="项目信息">
                                <WeaRightMenu
                                    datas={this.getRightMenu()}
                                    onClick={this.onRightMenuClick}
                                >
                                    {prjinfo.defaultActiveCollapse &&
                                        <WeaNewScroll height={700}><Form
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
                            </Tabs.TabPane>
                            <Tabs.TabPane key="2" tab="日报">
                                <Prjschedule></Prjschedule>
                            </Tabs.TabPane>
                            <Tabs.TabPane key="3" tab="资源">
                                <PrjResource></PrjResource>
                            </Tabs.TabPane>
                            <Tabs.TabPane key="4" tab="看板">
                                <PrjKanBan columns={columns} />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="5" tab="甘特图">
                            <iframe src={"/proj/gantt/gantt.jsp?projectid=8&ProjID=8"} id="prjtabiframe" name="prjtabiframe" className="flowFrame" frameborder="0" width="100%" height="800px" />
                            </Tabs.TabPane>
                        </Tabs>
                    </TopTitle>

                </Menu>
            </NavTree>
        )
    }

    onSelect = (selectedKeys) =>{
        const {projectStore} = this.props;
        if (selectedKeys && selectedKeys.length > 0){
            projectStore.getMidList({'prjtype':selectedKeys[0]})
        }
    }

    onPrjSelect = (selectedKey) =>{
        const {projectStore} = this.props;
        projectStore.getProjectView({'prjid':selectedKey})
    }

    onPaginationChange = (pageparams) =>{
        const {projectStore} = this.props;
        projectStore.setMidCurrent(pageparams.current);
        projectStore.getMidList({'prjtype':projectStore.status.prjtype,pageindex:pageparams.current})
    }

    updateDataSource = (fields)=>{
        const {projectStore} = this.props;
        const prjdatas = toJS(projectStore.status.prjdatas);
        projectStore.updateDataSource({...prjdatas,...fields});
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

    changeTab = (tabkey) =>{
        const {projectStore,prjResourceStore} = this.props;
        projectStore.setTabKey(tabkey);
        if(tabkey=='3'){
            prjResourceStore.doSearch({'prjid':projectStore.status.prjid})
        }
    }
    
}

export default Project;