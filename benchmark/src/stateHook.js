import React,{Component} from 'react'

class StateClass extends Component {
  state = {
    count: 0
  }
  render() {
    const {count} = this.state;
    return (
      <div>
        <h1>4-2 类组件写计数器</h1>
        <button type="button" onClick={() => this.setState({count: count + 1})}>Add</button>
        {this.state.count}
      </div>
    )
  }
}


// 使用 useState
// useState要按照稳定的顺序以及数量调用 
// 可以使用  npm i eslint-plugin-react-hooks -D
// useState 可以设定延迟函数 这个函数在初始化的时候只会执行一次
function UseStateHook(props) {
  const [count,setCount] = React.useState(0);
  const [name,setName] = React.useState(() => {
    console.log("inital render")
    return props.names
  });

  return (
    <div>
      <h1>4-2 useState应用</h1>
      <button type="button" onClick={() => setCount(count + 1)}>Add</button>
      {count} name：{name}
    </div>
  )
}

function StateHook() {
  return (<>
    <StateClass></StateClass>
    <UseStateHook names="Alisa"></UseStateHook>
  </>)
}
export default StateHook
