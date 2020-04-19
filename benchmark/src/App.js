import React,{Component,createContext,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import LazySuspense from './lazySuspense'
//相当于全局变量 可以有多个context 而且可以相互嵌套
// context会影响组件的独立性 不再纯粹
const BatteryContext = createContext();
const spinContext = createContext(false);

class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => (
            <spinContext.Consumer>
              {
                spinner => <h1>Battery:{battery} loading:{String(spinner)}</h1>
              }
            </spinContext.Consumer>
          )
        }
      </BatteryContext.Consumer>)
  }
}
// 使用contextType contextType不能用在无状态组件中
// 并且只有一个context才能用
class Leaf2 extends Component {
  static contextType = BatteryContext;

  render() {
    const battery = this.context;
    return (
      <h1>battery2：{battery}</h1>
    )
  }
}
class Middle extends Component {
  render() {
    return (
      <>
        <Leaf2></Leaf2>
        <Leaf></Leaf>
      </>
    )
  }
}
function App() {
  let [battery,SetBattery] = useState(60);
  let [spinner,setSpinner] = useState(false);
  return (
    <BatteryContext.Provider value={battery}>
      <spinContext.Provider value={spinner}>
        <button type="button" onClick={() => SetBattery(battery - 1)}>press</button>
        <button type="button" onClick={() => setSpinner(!spinner)}>online</button>
        <Middle></Middle>
        <h1>lazy和Suspense</h1>
        <LazySuspense></LazySuspense>
      </spinContext.Provider>
    </BatteryContext.Provider>
  );
}

export default App;
