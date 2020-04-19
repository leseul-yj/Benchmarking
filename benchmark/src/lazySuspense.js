import React,{Component,Suspense} from 'react'

// import 导入的是静态组件
// lazy函数 可以异步导入组件 如果不用suspense包裹会报错
// suspense 里面又要fallback fallback要用jsx语法 可以传入组件

// const About = React.lazy(() => import('./About.js'));
// webpackChunkName这样可以在请求中看到组件的名字
const About = React.lazy(() => import(/* webpackChunkName: "about"*/'./About.js'));

// 使用ErrorBoundary处理报错  suspense无法处理请求错误 ErrorBoundary可以处理任何错误
export default class LazySuspense extends Component {

  state = {
    hasError: false
  }
  // static getDerivedStateFromError() {
  //   return {
  //     hasError: true
  //   }
  // }

  // 开发模式会现实错误页面 生产模式会现实错误组件
  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {
    if(this.state.hasError) {
      return (<div>error</div>)
    }
    return (
      <div>
        <Suspense fallback={<div>Loading</div>}>
          <About></About>
        </Suspense>
      </div>
    )
  }
}
