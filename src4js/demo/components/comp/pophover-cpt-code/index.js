import {Row, Col, message} from 'antd';
import {routerShape} from 'react-router';
import "./style/index.less"

class PopoverCptCode extends React.Component {
  static contextTypes = {
    router: routerShape
  }
  listenRouter(){
    this.context.router.listen(nextState => {
      const { path } = this.state;
      let pathname = nextState ? nextState.pathname : this.context.router.routes.map(r => r.path).join('/');
      if(path !== pathname){
        this.setState({path:pathname,visible:false});
      }
    })
  }
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.state = {
      random: `${new Date().getTime()}_${Math.ceil(Math.random() * 100000)}`,
      cptid: '',
      userinfo: '',
      visible: false,
      showSQR: false,
      x:-0,
      y:-0,
      loading: false,
      imgLoading: false,
      targetHeight: 0,
      targetWidth: 0,
      path: window.location.hash && window.location.hash.split('#/')[1].split('?')[0]
    }
    this.onError = this.onError.bind(this);
  }
  componentDidMount(){
    this.isMounted = true;
    this.listenRouter();
    let opencptOld = null;
    if(typeof window.opencptcode === 'function'){
        opencptOld = window.opencptcode;
    }

    window.opencptcode = (url,width,height) =>{
      let change = url && this.state.cptid !== url;
      let initStates = change ? {loading: true,imgLoading: true, cptid:url,} : {};
      this.setState(initStates);
      if(change){  
            jQuery("#qrcode").attr({"src":url,}).css({"width":width,height:height});
      }
      opencptOld && opencptOld(id)
    }

    let pointercptXYOld = null;
    if(typeof window.pointercptXY === 'function'){
        pointercptXYOld = window.pointercptXY;
    }
    window.pointercptXY = e =>{
        const { random } = this.state;
          this.setState({
            x: jQuery(e.target).offset().left,
            y: jQuery(e.target).offset().top,
            targetWidth: e.target.offsetWidth,
            targetHeight: e.target.offsetHeight,
            visible: true
          })
        pointercptXYOld && pointercptXYOld(e);
    }

      this.getParentStyle()
        jQuery(window).resize(() => {
            this.isMounted && this.getParentStyle();
        });
       
    }
  componentWillUnmount() {
    this.isMounted = false;
  }
  getParentStyle(){
    const { children } = this.props;
      let com = children ? jQuery('.wea-popover-cpt-code-parent') : '';
      if(com){
        this.setState({
            pWidth: com.width(),
            pHeight: com.height(),
            pTop: com.offset().top,
            pLeft: com.offset().left,
        })
      }
  }

  onError(){
    let { userinfo } = this.state;
    userinfo.userimg = defaultIcon[userinfo.sex];
    this.setState({ userinfo })
  }
  render(){
    const { children } = this.props;
    const { cptid, userinfo, showSQR, visible, x, y, targetWidth, targetHeight, loading, imgLoading,
      pWidth, pHeight, pTop, pLeft,  random} = this.state;
    const _pHeight = pHeight || 0;
    const _pLeft = pLeft || 0;
    const _pTop = pTop || 0;
    const winW = document.body.clientWidth;
    const winH = document.body.clientHeight;
    const nowStyle = children ?
    {
      display: visible ? 'block' : 'none',
        position : 'absolute',
        left: winW - x <= 500 ? (winW - 500) : (x - _pLeft),
        top: winH - y <= 293 ? (y - 293 - _pTop) : (y + targetHeight  - _pTop)
    } : {
        display: visible ? 'block' : 'none',
        position : 'fixed',
        left: winW - x <= 500 ? (winW - 500) : x,
        top: winH - y <= 293 ? (y - 293) : (y + targetHeight)
      };


    return <div className='wea-popover-cpt-code-parent' id={`wea_popover_cpt_${random}`}>
      {children ? children : ''}
      <div className='wea-popover-cpt-code-wrapper' style={nowStyle}>
        <span className="wea-popover-cpt-code-close icon-coms-Clear"  onClick={()=>this.setState({visible:false})}/>
          <Row>
            <Col span={24} >
               <iframe id="qrcode" name="qrcode" style={{border:"none"}}/>
            </Col>
          </Row>
      </div>
    </div>
  }
}

export default PopoverCptCode;