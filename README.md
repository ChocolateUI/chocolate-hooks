<div align="center">
    <img alt="chocolate-hooks" style={{ width: 180, height: 180 }} src="https://blog-1253646934.cos.ap-beijing.myqcloud.com/choco-hooks.png" />
    <div >
      <img alt="chocolate-hooks" style={{ marginLeft: 10 }} src="https://img.shields.io/npm/dm/chocolate-hooks.svg" />
      <img alt="npm" style={{ marginLeft: 10 }} src="https://img.shields.io/npm/v/chocolate-hooks.svg?style=flat" />
      <img alt="chocolate-hooks" style={{ marginLeft: 10 }} src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
      <img alt="netlify" style={{ marginLeft: 10 }} src="https://img.shields.io/badge/netlify-Success-blue" />
    </div>
    <br />
    <p> <span role="img" aria-label="chocolateHooks" >🍫</span> Chocolate-Hooks </p>
    <p> 一个 React Hooks 库，提升开发效率</p>
</div>

#### 🐳 预览

<a href="https://chocolateui.github.io/chocolate-hooks/" target="_blank">chocolate-hooks</a>

#### ⚡ 安装

> 使用 npm

```javascript
npm install chocolate-hooks --save
```

> 使用 yarn

```javascript
yarn add chocolate-hooks
```

#### ☄️ 如何使用

```javascript
import React from 'react'
import { useCountDown } from 'chocolate-hooks'

export const Example = () => {
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
```

#### 🔨 部署 Deploy

- 集成 `GitHub Action` 自动化部署，同时支持 `CodeQL` 代码分析
