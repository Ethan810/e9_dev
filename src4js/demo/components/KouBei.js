import React from 'react';
import { NavBar, Icon,} from 'antd-mobile';
import Button2 from "../coms/Button2";

export default class KouBeiPage extends React.Component {

    render(){
        return (
            <div style={{marginTop:50}}>
                <Button2 primary >测试一下styled-components插件</Button2>
                <Button2 primary >测试一下styled-components插件</Button2>
                <Button2  onClick={()=>{alert(2)}}>测试三</Button2>
            </div>
        )
    }
}