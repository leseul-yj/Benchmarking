import React,{Component,useContext,createContext} from 'react'

const countContext = createContext();

class ChildComponent extends Component {
  static contextType = countContext;
  render() {
    const count = this.context
    return (
      <div>
        <p>contextType：{count}</p>
      </div>
    )
  }
}
// 无状态组件中不会限制使用useContext的数量 类组件中只能用一个contextType
// 也不要在无状态组件中大量使用useContext 会让组件失去独立
function UseContextHook() {
  const count = useContext(countContext);
  return (
    <div>
      <p>使用useContext： {count}</p>
    </div>
  )
}
export default function ContextHook() {
  //const contextHook = useContext();
  const [count,setCount] = React.useState(0);

  return (
    <div>
      <h1>4-4 useContext</h1>
      <button type="button" onClick={
        () => setCount(count + 1)
      }>press</button>
      <countContext.Provider value={count}>
        <ChildComponent></ChildComponent>
        <UseContextHook></UseContextHook>
      </countContext.Provider>

    </div>
  )

}
