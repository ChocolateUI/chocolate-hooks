# useCountDown

倒计时 `hooks`，支持毫秒级计时。

当 `diff` 小于 16.6ms ≈ 17ms 时直接使用 raf，由浏览器调度。

支持倒计时自定义 `CSS` 样式。

## 使用场景

需要倒计时的场景或者需要自定义 CSS 样式的场景，并且可以手动控制倒计时的触发与结束，主要用于验证码场景的倒计时。

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: useCountDown 会返回一个格式化之后的字符串，直接使用即可
 */
import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useCountDown } from '../../src/index'
import { Button } from 'chocolate-ui'

const history = createBrowserHistory()

const App = () => {
  const [date, setDate] = useState(undefined)
  const [dateString, _] = useCountDown({
    endTime: date,
    format: 'dd天hh小时mm分ss秒',
    diff: 1000,
    onEnd: () => console.log('end'),
  })

  useEffect(() => {
    setDate(Date.now() + 2 * 24 * 60 * 60 * 1000)
  }, [])

  return <>{dateString}</>
}

const Example = () => (
  <Router history={history}>
    <App />
  </Router>
)

export default Example
```

```jsx
/**
 * title: 基本使用
 * desc: useCountDown 会返回一个时刻对象，随意取用。
 */
import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useCountDown } from '../../src/index'
const history = createBrowserHistory()

const App = () => {
  const [date, setDate] = useState(undefined)
  const [progress, allOptions, _] = useCountDown({
    endTime: date,
    format: 'dd天hh小时mm分ss秒',
    diff: 1000,
    onEnd: () => console.log('end'),
  })
  const { days, hours, minutes, seconds, milliseconds } = allOptions || {}

  useEffect(() => {
    setDate(Date.now() + 2 * 24 * 60 * 60 * 1000)
  }, [])

  return (
    <>
      {days} 天 {hours} 小时 {minutes} 分钟 {seconds} 秒钟 {milliseconds} 毫秒
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

```jsx
/**
 * title: 基本使用
 * desc: 自定义样式
 */
import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useCountDown } from '../../src/index'
const history = createBrowserHistory()

const App = () => {
  const [date, setDate] = useState(undefined)
  const [progress, allOptions, _] = useCountDown({
    endTime: date,
    format: 'dd天hh小时mm分ss秒',
    diff: 1000,
    onEnd: () => console.log('end'),
  })
  const { days, hours, minutes, seconds, milliseconds } = allOptions || {}

  useEffect(() => {
    setDate(Date.now() + 2 * 24 * 60 * 60 * 1000)
  }, [])

  return (
    <>
      <span style={{ color: 'red', fontWeight: 500, fontSize: 28 }}>
        {days} 天
      </span>
      {hours} 小时 {minutes} 分钟 {seconds} 秒钟 {milliseconds} 毫秒
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

```jsx
/**
 * title: 基本使用
 * desc: 手动控制开始与结束
 */
import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useCountDown } from '../../src/index'
import { Button, Message } from 'chocolate-ui'
const history = createBrowserHistory()

const App = () => {
  const [date, setDate] = useState(undefined)
  const [disabledT, setDisabledT] = useState(false)
  const [progress, allOptions, setEndTime] = useCountDown({
    format: 'hh小时mm分ss秒',
    diff: 1000,
    onHand: true,
    onEnd: () => console.log('end'),
  })
  const { days, hours, minutes, seconds, milliseconds } = allOptions || {}

  return (
    <>
      {progress ? (
        <div>
          {days} 天{hours} 小时 {minutes} 分钟 {seconds} 秒钟 {milliseconds}{' '}
          毫秒
        </div>
      ) : (
        <div>点击开始按钮进行计时</div>
      )}

      <div style={{ marginTop: 20 }}>
        <Button
          btnType="primary"
          onClick={() => {
            setEndTime(Date.now() + 24 * 60 * 60 * 1000)
            setDisabledT(true)
            Message.info({ content: '开始计时' })
          }}
          disabled={disabledT}
          style={{ marginRight: 20 }}
        >
          开始
        </Button>
        <Button
          btnType="default"
          disabled={!disabledT}
          onClick={() => {
            setEndTime(undefined)
            setDisabledT(false)
            Message.info({ content: '结束计时' })
          }}
        >
          结束
        </Button>
      </div>
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
const [progress, allOptions, setEndTime] = useCountDown()
```

<br/>

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 倒计时的时间，单位 ms。`onHand = true` 时可以不传入 | `number` | `0` |
| endTime | 结束的时间点，与 total 二选一，且优先级更高，单位 ms。`onHand = true` 时可以不传入 | `number` | `0` |
| format | 要展示的时间格式 | `string` | `dd hh:mm:ss.ii` |
| diff | 递减频率 | `number` | `-` |
| onStart | 开始时回调 | `onStart?: () => void` | `-` |
| onStep | 每次更新时执行的回调 | `(step: number) => void` | `-` |
| onEnd | 结束时回调 | `() => void` | `-` |
| onHand | 手动控制开始, 为 `true` 时，需配合 `setEndTime:(date) => void` 使用。传入 `Date.now() + $time` 开始计时，传入 `undefined` 停止计时。使用场景：验证码倒计时 | `boolean` | `-` |
