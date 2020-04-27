import React,{PureComponent,useRef,useState,useMemo,useCallback} from 'react';

class RefClass extends PureComponent {
  speak() {
    console.log(`noe counter is: ${this.props.count}`)
  }
  render() {
    const {handleClick} = this.props;
    return (
      <h3 onClick={handleClick}> textInComponent </h3>
    );
  }
}
// 函数组件不能用调用useRef 只能传给类组件
function App(props) {
  return (
    <h3>函数时组件{props.count}</h3>
  )
}
function RefHook() {
  const [count,setCount] = useState(0);
  const counterRef = useRef();
  const doubleCount = useMemo(function() {
    return count * 2
  },[count]);
  const handleClick = useCallback(() => {
    debugger
    counterRef.current.speak();
    console.log("useRef" + counterRef.current)
  },[counterRef])
  return (
    <div>
      <h1>4-6 useRef</h1>
      <button onClick={() => {
        setCount(count + 1)
      }}>Press</button>
      <App count={doubleCount} onClick={handleClick}></App>
      <RefClass ref={counterRef} count={doubleCount} onClick={handleClick}></RefClass>
    </div>
  )
}

export default RefHook