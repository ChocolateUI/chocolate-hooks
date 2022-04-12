# useSetState

像 `class` 组件 中 `this.setState` 一样丝滑

## 使用场景

当 `useState` 使用过多时使用，防止变量漏更新，与 `this.setState` 基本一致

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 与 `this.setState` 基本一致
 */
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useSetState } from '../../src/index'
import { Button } from 'chocolate-ui'
const history = createBrowserHistory()

const App = () => {
  const [state, setState] = useSetState({
    name: '',
    age: 0,
  })
  return (
    <>
      <p>
        name: {state.name}
        <br />
        age: {state.age}
        <br />
        job: {state.job}
      </p>
      <Button onClick={() => setState({ name: 'xue' })}> set name </Button>

      <Button
        onClick={() => setState({ job: 'teacher' })}
        style={{ margin: '0 8px' }}
      >
        set job
      </Button>

      <Button
        onClick={() => setState((prev) => ({ age: prev.age + 1 }))}
        style={{ margin: '0 8px' }}
      >
        set age + 1
      </Button>
    </>
  )
}

const Example = () => (
  <Router history={history}>
    <App />
  </Router>
)

export default Example
```

## API

```js
const [state, setState] = useSetState()
```
