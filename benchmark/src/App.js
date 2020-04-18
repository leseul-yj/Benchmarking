import React,{Component,createContext,useState} from 'react';
import logo from './logo.svg';
import './App.css';
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
class Middle extends Component {
  render() {
    return <Leaf></Leaf>
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
      </spinContext.Provider>
    </BatteryContext.Provider>
  );
}

export default App;
