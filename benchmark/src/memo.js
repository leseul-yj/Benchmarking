import React,{Component,memo} from 'react'

// 父组件渲染 Foo的值没有任何改变 也会被渲染
// class Foo extends Component {
//   render() {
//     console.log(this.props.name)
//     return (<p>{this.props.name}</p>)
//   }
// }

// 解决方法-
// class Foo extends Component {
//   shouldComponentUpdate(nextProps,nextState) {
//     if(nextProps.name === this.props.name) {
//       return false;
//     }
//     return true;
//   }
//   render() {
//     console.log(this.props.name)
//     return (<p>{this.props.name}</p>)
//   }
// }

// 解决方法二 使用PureComponent 其提供了简单的对比算法，减少性能开销
// 这个方法有局限性 只使用于数据只有一层结构，如果是多层 也不会更新
// 此时可以在自组件中添加一个回调方法可以解决这个问题（因为每次传入的函数都是新的） 不是箭头函数
class Foo extends React.PureComponent {
  render() {
    console.log(this.props.name)
    return (<p>{this.props.name}</p>)
  }
}

// 解决方法三 Memo memo是解决无状态组件中的这些问题
const MemoFoo = memo(function Foo(props) {
  console.log(props.name);
  return (<p>{props.name}</p>)
});

export default class Memo extends Component {
  state = {
    count: {
      num: 5
    },
    name: "PureComponent",
    memo: "Memo测试"
  }
  hanleClick = () => {
    this.setState({
      count: this.state.count.num + 1
    })
  }
  render() {
    return (
      <div>
        <button onClick={() => this.hanleClick()}>Add</button>
        <Foo name={this.state.name} count={this.state.count.num} callback={() => {}}></Foo>
        <MemoFoo name={this.state.memo} count={this.state.count.num}></MemoFoo>

      </div>
    )
  }
}
