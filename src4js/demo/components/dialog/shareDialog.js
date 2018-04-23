
import {Form, Input, Button, Select, Switch, Tabs} from 'antd';
import {WeaDialog, WeaSearchGroup, WeaInput,WeaAuth ,WeaTab,WeaTools,WeaNewScroll} from 'ecCom';
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx';
import _mapValues from 'lodash/mapValues'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;



class ShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        title:'共享设置',
        closable:true,
        maskClosable:true,
        dialogStyle:{
          width:'700px',
          height:'400px'
        },
        scrollWidth:400,
        visible:false
    }
  }
  componentDidMount(){
    this.props.shareStore.init(1)
  }
  componentWillReceiveProps(nextProps) {
 
  }
  render() {
    const {shareData} = this.props.shareStore;
    const {type,visible} = shareData;
    let buttons = [
       (<Button  type="primary">关闭</Button>)
    ];
   
    const { title , closable , maskClosable, icon, showSearchAd, dialogStyle, scrollWidth } = this.state;
    return (
        <div>
            <WeaDialog
                title={title}
                visible={visible}
                buttons={buttons}
                closable={closable}
                maskClosable={maskClosable}
                icon="icon-coms-project"
                iconBgcolor="#217346"
                onCancel={this.back}
                style={dialogStyle}
            >
            <WeaNewScroll height={"100%"}>
                <WeaTab
                    buttons={this.getButtons()}
                    selectedKey={""}
                />
            
            </WeaNewScroll>
            </WeaDialog>
            <WeaAuth
                visible={this.state.visible}
                conditions={[]}
                title='共享设置'
                onOk={v => {
                    console.log('onOk datas: ', v);
                    this.setState({ visible: false });
                }}
                onCancel={() => {
                    console.log('onCancel!');
                    this.setState({ visible: false });
                }}
            />
        </div>)
  }
  getButtons(){
      let btn = [];
      btn.push(<Button  type="primary" onClick={()=>this.setState({visible:true})}>添加</Button>);
      btn.push(<Button  type="primary">批量删除</Button>);
      return btn
  }
}

export default ShareDialog;