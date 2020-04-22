import React,{Component,useState,useEffect} from 'react';

// useEffect 副作用 使用的时机
// Mount之后 Update之后 Unmount之前
// 第一次render后调用 相当于ComponentDidMount
// 第二次执行 相当于componentDidUpdate 执行前会调用clean Callback 清除上一次的作用

class EffectComponent extends Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
  onResize = () => {
    this.setState({
      size:
      {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    })
  }
  componentDidMount() {
    document.title = this.state.count;
    window.addEventListener("resize",this.onResize,false);
  }
  componentDidUpdate() {
    document.title = this.state.count
  }
  componentWillUnmount() {
    window.removeEventListener("resize",this.onResize,false)
  }
  render() {
    const {count,size} = this.state;
    return (
      <div>
        <button type="button" onClick={() => this.setState({count: count + 1})}>Press</button>
        <p>size:{size.width}*{size.height}</p>
      </div>
    )
  }
}

function EffectHoook() {
  const [count,setCount] = useState(0);
  const [size,setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  };

  useEffect(() => {
    document.title = count;
  });

  // 第二个参数是个可选的数组，如果数组中的每一项都不变，那么useEffect不会执行
  // 如果不写数组，就表明每次运行后都执行
  // 如果是空数组，就表明第一次执行 后面就不执行了
  useEffect(() => {
    window.addEventListener('resize',onResize,false);
    // 回调函数 一是在视图被销毁之前触发，而是组件被渲染
    return () => {
      window.removeEventListener('resize',onResize,false)
    }
  },[]);

  // 此时改变size 不会触发count
  useEffect(() => {
    console.log('count',count)
  },[count]);

  const onClick = () => {
    console.log('click')
  }
  // 频繁清理逻辑的effect
  // count的奇偶来获取不同的dom
  useEffect(() => {
    document.getElementById("size").addEventListener('click',onClick,false)
    return () => {
      document.getElementById("size").removeEventListener('click',onClick,false);
    }
  });

  return (
    <>
      <p>使用useEffect</p>
      <button onClick={() => setCount(count + 1)}>Press</button>
      <p>{count}</p>
      {
        count % 2
          ?
          <p id="size">size1:{size.width}*{size.height}</p>
          :
          <p id="size">size2:{size.width}*{size.height}</p>

      }
    </>
  )
}

function EffectHook() {
  return (<>
    <hr />
    <h1>4-3 使用useEffect</h1>
    <EffectComponent></EffectComponent>
    <EffectHoook></EffectHoook>
  </>)
}
export default EffectHook