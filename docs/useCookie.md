# useCookie

对 `js-cookie` 的进一步封装。

## 使用场景

当你需要设置 cookie 的时候，都可以使用

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 任何想使用 cookie 的地方
 */
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useCookie } from '../src/index'
import { Button } from 'chocolate-ui'
// import Button from 'chocolate-ui/dist/components/Button';
import 'chocolate-ui/dist/components/Button/style';
const history = createBrowserHistory()

const App = () => {
  const [value, updateCookie, deleteCookie] = useCookie('chocolate')

  return (
    <>
      <Button onClick={
        () => {
          // or updateCookie('123456')
          updateCookie(123456, {expires: 5})
          setTimeout(()=>{
            console.log('value', value)
          }, 300)
        }
      }> getCookie </Button>

      <Button style={{ marginLeft: 20 }} onClick={
        () => {
          deleteCookie()
          console.log('value', value)
        }
      }> deleteCookie </Button>
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
const [value, updateCookie, deleteCookie] = useCookie(initial)
```

<br/>

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initial.cookieName | cookie 名称 | `string` | `-` |
| value | cookie 值 | `string or null` | `-` |
| updateCookie | 更新 cookie  | `(newValue: string, options?: Cookies.CookieAttributes) => void` | `-` |
| deleteCookie | 移除 cookie  | `() => void` | `-` |
