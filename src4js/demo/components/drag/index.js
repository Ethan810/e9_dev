import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import LeftMiddeleRightLayout from '../comp/left-middle-right-layout'

class Demo extends React.Component {
    
    //   eventLogger = (e: MouseEvent, data: Object) => {
    //     console.log('Event: ', e);
    //     console.log('Data: ', data);
    //   }

  render() {
    return (
        <LeftMiddeleRightLayout 
            defaultShowLeft={true}
            leftWidth={500}
            leftCom={this.leftCom()}
            rightCom={this.rightCom()}
            rightWidth={250}
            showRight={true}
        >
            
                <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[25, 25]}
                onStart={this.handleStart}
                onDrag={this.handleDrag}    
                onStop={this.handleStop}>
                <div style={{height:"200px",width:"200px",border:"1px solid red"}}>
                    <div className="handle" style={{height:"40px"}}>Drag from here</div>
                    <div>This readme is really dragging on...</div>
                </div>
            </Draggable>
        </LeftMiddeleRightLayout>
    );
  }
  leftCom(){
        return <a>eee</a>
  }
  rightCom(){
    return <a>222</a>
  }
  handleStart=(e)=>{
   // console.log(e)
  }
  handleDrag=(e)=>{
   // console.log(e)
  }
  handleStop=(e)=>{
   // console.log(e)
  }
}

export default Demo