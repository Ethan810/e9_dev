
//无状态函数----组件
const Todo = (props) => (
    <div>
             <li onClick={props.onClick} >
                {props.text}
            </li>

    </div>
   
   )

export default Todo