import React from 'react';
import { NavBar, Icon, Grid, List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


const data = Array.from(new Array(8)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));


class ListPage extends React.Component {

    render() {
        return (
            <div style={{height:"100%"}}>
                <div style={{height:"45px",position:"fixed",top:0,left:0,width:"100%",zIndex:2}}>
                    <NavBar
                        mode="dark"
                        leftContent="Back"
                        rightContent={[
                            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                            <Icon key="1" type="ellipsis" />,
                        ]}
                    >NavBar</NavBar>
                </div>
                <div style={{paddingTop:"45px",boxSizing:"border-box"}}>
                    <Grid data={data} activeStyle={false} />
                    {this.getList()}
                </div>
            </div>
        )
    }
    getList=()=>{
        let arr = [];
        for(let i=0;i<50;i++){
            arr.push( <List key={i} renderHeader={() => 'Basic Style'} className="my-list">
            <Item extra={'extra content'}>{"title----"+i}</Item>
        </List>)
        }
        return arr
    }
}

export default ListPage
