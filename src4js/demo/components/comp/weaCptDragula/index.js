
import dragula from 'react-dragula';
import isFunction from 'lodash/isFunction';
import findIndex from 'lodash/findIndex';

class WeaCptDragula extends React.Component {
  constructor(props) {
    super(props);
    this.drake = null;
  }
  componentDidMount() {
    this.initDragula();
  }
  
  componentWillUnmount() {
    this.drake && this.drake.destroy();
  }
  
  render() {
    return this.props.children;
  }
  
  initDragula = () => {
    let {container,canDrag, onDrop, getKeyFromDom, getKeyFromData} = this.props;
    if (typeof(container) == "string") {
      container = jQuery(container, ReactDOM.findDOMNode(this))[0];
    } else if (isFunction(container)) {
      container = container();
    }
    this.drake = dragula([container], {
      isContainer: function (el) {
        return false;
      },
      moves: (el, source, handle, sibling) => {
        return isFunction(canDrag) ? canDrag(handle, el, source, sibling) : canDrag;
      },
      mirrorContainer: container
    });
    this.drake.on("drop",(el, target, source, sibling) => {
        console.log(el, target, sibling)
      let {datas} = this.props;
      if (Array.isArray(datas) && isFunction(getKeyFromDom) && isFunction(getKeyFromData) && isFunction(onDrop)) {
        let dataKey = getKeyFromDom(el), downKey = sibling ? getKeyFromDom(sibling) : -1;
        console.log(dataKey,downKey)
        if (downKey == dataKey) {
          downKey = -1;
        }
        let dataIdx = findIndex(datas, (data) => getKeyFromData(data) == dataKey);
        console.log(dataIdx)
        let downIdx = downKey == -1 ? datas.length : findIndex(datas, (data) => getKeyFromData(data) == downKey);
          console.log(downIdx)
        downIdx = downIdx > dataIdx ? downIdx - 1 : downIdx;
        let data = datas.splice(dataIdx, 1)[0];
        datas.splice(downIdx, 0, data);
       
        /*
         // 遍历并返回新的数据
         let curData = null;
         datas = datas.map((data, index) => {
         if (this.getRowKey(data) == key) {
         dataIdx = index;
         curData = data;
         }
         if (downKey !== -1 && downKey == this.getRowKey(data)) {
         downIdx = dataIdx >= 0 ? index  - 1 : index;
         }
         if (dataIdx == -1 && downIdx == -1) {
         // 当前与放置的index都没找到，说明未到影响区
         return data;
         } else if (dataIdx >=0 && downIdx == -1) {
         // 找到当前的但没有找到放置位置，需要将下方数据上移一位
         return index == datas.length - 1 ? datas[dataIdx] : datas[index + 1];
         } else if (dataIdx == -1 && downIdx >=0) {
         // 找到放置位置但没有找到当前的，需要将上方数据下移一位
         return downIdx == index ? null : datas[index - 1];
         } else {
         // 都找到之后，如果相等，则做下特殊处理，如果不等，说明已过影响区
         return index == downIdx ? curData : index == dataIdx ? datas[index - 1] : data;
         }
         });
         // 处理放置位置的数据。
         datas[downIdx] = curData;*/
         onDrop(datas, dataIdx, downIdx);
      } else {
         isFunction(onDrop) && onDrop(el, sibling, target, source);
      }
    });
  }
  
}

WeaCptDragula.propTypes = {
  container: React.PropTypes.any,//可拖拽区域
  canDrag: React.PropTypes.any,//是否可拖拽，可以传方法，方法的传参为当前点击的节点。
  onDrop: React.PropTypes.func,//拖拽结束时触发的方法，第1个参数是拖拽的DOM节点，第二个参数是所放下的位置下方的DOM节点。
  datas: React.PropTypes.array,//数组
  getKeyFromData: React.PropTypes.func,//从数组中获得key的方法。
  getKeyFromDom: React.PropTypes.func,//从Dom中获得key的方法
};

export default WeaCptDragula;