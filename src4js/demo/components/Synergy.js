import React from 'react';
import {WeaTools,WeaTop} from 'ecCom';
import {Table, Icon, Tabs} from "antd";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (<span> text</span>),
  }];
  
function createData (){
    let dataArr = [];
    for(let i = 0; i < 10000; i++){
        dataArr.push({
            key: i+1,
            name: 'John Brown'+i,
            age: 32,
            address: `${'New York No.'+i+'Lake Park'}`,
        })
    }
    return dataArr;
}
  const data = createData();

class Synergy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hpid: 0,
            isuse: true
        }
    }
    componentWillMount() {
       
    }
    componentDidMount() {
        // window.isShowSynergy = this.isShowSynergy.bind(this);
    }
    componentWillReceiveProps(nextProps) {
       
    }
    shouldComponentUpdate(nextProps, nextState){
        const { hpid, isuse } = this.state;
        return hpid != nextState.hpid || isuse != nextState.isuse;
    }
    
    isShowSynergy(isshow) {
        this.refs['synergy'].style.display = isshow ? 'block' : 'none';
        this.refs['synergyHide'].style.display = isshow ? 'block' : 'none';
        this.refs['synergyShow'].style.display = isshow ? 'none' : 'block';
    }

    changeImgUrl(type, event) {
        if ('hideOver' == type) {
            event.target.attributes['src'].value = '/wui/theme/ecology9/image/left-hide-hover.png';
        } else if ('showOver' == type) {
            event.target.attributes['src'].value = '/wui/theme/ecology9/image/left-show-hover.png';
        } else if ('hideOut' == type) {
            event.target.attributes['src'].value = '/wui/theme/ecology9/image/left-hide.png';
        } else if ('showOut' == type) {
            event.target.attributes['src'].value = '/wui/theme/ecology9/image/left-show.png';
        }
    }

    render() {
        let isuse = this.state.isuse;
        let hpid = this.state.hpid || 0;
        let sWidth = '830px';
        let btnRight = '813px';

        if (isuse) {
            return (
                <div style={{position: 'absolute', top: 0, right: 0, height: '100%'}}>
                    <div ref="synergy" style={{display: 'none', position: 'absolute', top: 0, right: 0, zIndex: 998, width: sWidth, height: '100%', overflow: 'auto', background: '#f6f7f9', boxShadow: '0 0 5px #ddd'}}>
                        <WeaTop
                            title={"上海泛微网络科技股份有限公司"}
                            loading={false}
                            icon={<i className="icon-coms-crm"  />}
                            iconBgcolor={"red"}
                            buttons={[]}
                            buttonSpace={10}
                            showDropIcon={true}
                            dropMenuDatas={[]}
                        >
                            <Tabs>
                                <Tabs.TabPane key="1" tab="基本信息">
                                    <Table columns={columns} dataSource={data} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="2" tab="风险">
                                    <Table columns={columns} dataSource={data} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="3" tab="收款">
                                    <Table columns={columns} dataSource={data} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="4" tab="付款">
                                    <Table columns={columns} dataSource={data} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="5" tab="发票">
                                    <Table columns={columns} dataSource={data} />
                                </Tabs.TabPane>
                            </Tabs> 
                        </WeaTop>
                    </div>
                    <div ref="synergyHide" style={{display: 'none', position: 'absolute', top: '50%', right: btnRight, zIndex: 999, cursor: 'pointer'}} title="隐藏右侧栏" onClick={this.isShowSynergy.bind(this, false)}>
                        <img src="/wui/theme/ecology9/image/left-hide.png" alt="" onMouseOver={this.changeImgUrl.bind(this, 'hideOver')} onMouseOut={this.changeImgUrl.bind(this, 'hideOut')}/>
                    </div>
                    <div ref="synergyShow" style={{position: 'absolute', top: '50%', right: 0, zIndex: 999, cursor: 'pointer'}} title="显示右侧栏" onClick={this.isShowSynergy.bind(this, true)}>
                        <img src="/wui/theme/ecology9/image/left-show.png" alt="" onMouseOver={this.changeImgUrl.bind(this, 'showOver')} onMouseOut={this.changeImgUrl.bind(this, 'showOut')}/>
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default Synergy;