# useMouseHover

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 用来辨别元素是否处于 hover 状态，并提供一些回调方法
 */
import React, { useReducer, useCallback } from 'react'
import { useMouseHover } from '../../src/index'

export default () => {
  const [hoverTimes, enter] = useReducer((v) => v + 1, 0)
  const [isHover, hoverCallbacks] = useMouseHover({ onEnter: enter })
  return (
    <div {...hoverCallbacks}>
      Hovered
      <span style={{ color: 'red' }}> {hoverTimes}</span> 次<span style={{ color: 'red' }}>{isHover && '(hovered)'}</span>
    </div>
  )
}
```

### 延迟触发

```jsx
/**
 * title: 基本使用
 * desc: 当设置了延迟时间，isHover 会延迟触发
 */
import React, { useReducer, useCallback } from 'react'
import { useMouseHover } from '../../src/index'

export default () => {
  const [isHover, hoverCallbacks] = useMouseHover({ delay: 2000 })
  const [hoverTimes, increaseHoverTimes] = useReducer((v) => v + 1, 0)
  const enter = useCallback((e) => {
    increaseHoverTimes()
    hoverCallbacks.onMouseEnter(e)
  }, [])
  return (
    <div {...hoverCallbacks} onMouseEnter={enter}>
      Hovered
      <span style={{ color: 'red' }}> {hoverTimes} </span> 次
      <span style={{ color: 'red' }}> {isHover && '(hovered)'} </span>
    </div>
  )
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onEnter | 鼠标移入 | `(event: MouseEvent): void` | `-` |
| onLeave | 鼠标移出 | `(event: MouseEvent): void` | `-` |
| delay | 延迟触发 | `number` | `0` |