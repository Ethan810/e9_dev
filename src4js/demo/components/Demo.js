import React from 'react';
import { Button, Tabs , Tree, Menu, TopTitle} from 'antd';
import { inject, observer } from 'mobx-react';
import StateLessComponent from './test/StateLessComponent'
import projectExecute from './projectExecute';
import Synergy from './Synergy';
import {WeaTop ,WeaLeftRightLayout} from "ecCom"

const NavTree = Tree.NavTree;
class Demo2 extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.text}</div>
        )
    }
}

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

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        }
    }
    componentDidMount() {
        jQuery(window).resize(() => {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.forceUpdate();
            }, 200);
        });
    }
    handleClick = () => {

    }
    render() {
        return (
            <div>
                <WeaTop
                    title={"title"}
                    loading={false}
                    icon={"icon-coms-crm"}
                    iconBgcolor={"red"}
                    buttons={[]}
                    buttonSpace={10}
                    showDropIcon={true}
                    dropMenuDatas={[]}
                >
                     <WeaLeftRightLayout defaultShowLeft={true}
                        leftCom={<div>fffff</div>}
                        leftWidth={25}>
                        {/* { contentDiv } */}
                        </WeaLeftRightLayout>
                </WeaTop>
                <Synergy  />
            </div>
        )
    }
}

export default Demo;


{/* <Tabs>
                <Tabs.TabPane key="1" tab="项目信息">
                    
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab="日报">
                     <StateLessComponent text={this.state.time} onClick={() => { this.setState({ time: this.state.time + 2 }) }} />
                </Tabs.TabPane>
                <Tabs.TabPane key="3" tab="资源">
                </Tabs.TabPane>
                <Tabs.TabPane key="4" tab="看板">
                </Tabs.TabPane>
                <Tabs.TabPane key="5" tab="甘特图">
                </Tabs.TabPane>
            </Tabs> */}