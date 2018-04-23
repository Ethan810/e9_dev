
import {Button,Row,Col,Icon,message,Modal} from 'antd';
import {WeaTab,WeaAuth } from 'ecCom';
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx';
import {WeaTableNew} from 'comsMobx';
const WeaTable = WeaTableNew.WeaTable;

@observer
export default class TaskShare extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps) {
 
  }
  render() {
        const {contentStore:{taskShareStore,isShowTaskShare,showTaskShare,shareCondition},title,contentStore} = this.props;
   
    return (
        <div >
            <WeaTable 
                comsWeaTableStore={taskShareStore}
                hasOrder={true}
                needScroll={true}
            />
            <WeaAuth 
                visible={isShowTaskShare}
                conditions={toJS(shareCondition)}
                title={title}
                icon={"icon-coms-project"}
                iconBgcolor="#217346"
                onOk={v => {
                    console.log('onOk datas: ', v);
                    showTaskShare(false);
                }}
                onCancel={() => {
                    console.log('onCancel!');
                   showTaskShare(false);
                 }}
            />
        </div>)
    }
    

}

