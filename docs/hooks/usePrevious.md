# usePrevious

读取变量上一次的值

## 使用场景

想要将变量本次值与上一次的值比较时使用

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 想要将变量本次值与上一次的值比较时使用
 */
import React, { useState } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Button } from 'chocolate-ui'
import { usePrevious } from '../../src/index'

const history = createBrowserHistory()

const App = () => {
  const [count, setCount] = useState(0)
  const prev = usePrevious(count)

  return (
    <>
      <p>上次：{prev}</p>
      <p>本次：{count}</p>
      <Button onClick={() => setCount(count + 1)} style={{ margin: '0 8px' }}>
        将 count + 1
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
const prev = usePrevious(state)
```
