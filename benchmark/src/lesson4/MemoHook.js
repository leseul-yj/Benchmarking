import React,{useState,useMemo,useCallback,memo} from 'react'

function NormalFn(props) {
  return (<p>没有使用memo优化子组件：{props.count}</p>)
}
// memo 用来优化组件的渲染
// 当组件的值没有发生变化 就不会触发渲染 不用象componentDidUpdate中去判断

const UseMemoFn = memo(function UseMemoFn(props) {
  return (<p onClick={props.hanleClick}>使用了useMemo优化的子组件：{props.count}</p>)
});
const UseCallbackFn = memo(function callbackFn(props) {
  return (<p onClick={props.handleUseCallback}>使用useCallback方法</p>)
})
export default function MemoHook() {
  const [count,setCount] = useState(0);
  const [clickCount,setClickCount] = useState(10);
  // useEffect和useMemo目的是一样的 调用时机不一样
  // useEffect是在渲染之后才执行 
  // useMemo有返回值 返回值可以参与渲染 因此useMemo在渲染期间完成
  // 传入空数组 只会运行一次
  const double = useMemo(() => {
    return count * 2
  },[]);
  const double1 = useMemo(() => {
    return count * 2
  },[count]);
  // 使用判断 count=3的时候执行
  const double2 = useMemo(() => {
    return count * 2
  },[count === 3]);
  // 没有第二个参数 useMemo只要count改变就执行
  const double3 = useMemo(() => {
    return count * 2
  });
  // 可以给子组件绑定函数 第二个数组是空 只会绑定一次
  const hanleClick = useMemo(() => {
    return () => {
      console.log('click事件绑定')
    }
  },[])
  // useCallback 可以比useMemo少写一层函数
  // useMemo(()=>fn)
  // useCallback(fn)
  const handleUseCallback = useCallback(() => {
    console.log("handleCallbacks")
  },[])
  // useCallback 可以实现useState中的setState效果
  const setClickCountFn = useCallback(() => {
    setClickCount((clickCount) => clickCount + 1)
  },[])
  return (
    <div>
      <h1>4-5 useMemo</h1>
      <button type="button" onClick={() => {
        setCount(count + 1)
      }}>press</button>
      <p>useMemo数组是空: {double}</p>
      <p>useMemo数组传入count: {double1}</p>
      <p>useMemo数组中count===3: {double2}</p>
      <p>useMemo 没有第二个参数: {double3}</p>

      <NormalFn count={double2}></NormalFn>
      <UseMemoFn count={double2} onClick={hanleClick()}></UseMemoFn>
      <UseCallbackFn onClick={handleUseCallback}></UseCallbackFn>
    </div>
  )
}