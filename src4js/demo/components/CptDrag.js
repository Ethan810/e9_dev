import React from 'react';
import { Button, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import {WeaDragula} from 'ecCom';
import Dragula from 'react-dragula';

class CptDrag extends React.Component {
    componentDidMount() {
        this.initDragula();
    }
    initDragula = (container) => {
        // let container = "container";
        // if (typeof(container) == "string") {
        //     container = jQuery(container, ReactDOM.findDOMNode(this))[0];
        // } else if (isFunction(container)) {
        //    container = container();
        // }

        this.drake = Dragula([container], {
            isContainer: function (el) {
              return false;
            },
            moves: (el, source, handle, sibling) => {
              return true;
            },
            mirrorContainer: container
          });
          this.drake.on("drop",(el, target, source, sibling) => {
              console.log(el, sibling)
          })
    }
    render() {

        const style = {
            height:"50px",lineHeight:"50px"
        }
        return (<div className='container' ref={this.initDragula}>
                <div style={style}>Swap me around1111111</div>
                <div style={style}>Swap her around222222</div>
                <div style={style}>Swap him around3333333</div>
                <div style={style}>Swap them around44444</div>
                <div style={style}>Swap us around555555</div>
                <div style={style}>Swap things around66666</div>
                <div style={style}>Swap everything around77777777</div>
            </div>)
        }
      
    onDrop=(data)=>{

    }

    
}
export default CptDrag;