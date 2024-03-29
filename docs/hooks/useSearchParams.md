# useSearchParams

对 `URLSearchParams` 的一系列封装, 来处理 URL 的查询字符串, 通过定义 `schema` 解决 URL 字符串 和 Search params 之间的格式互转, 同时内部会调用 `history.push` 进行 浏览记录的同步

## 使用场景

- 当列表分页时，需要将当前页码和页数同步到地址栏的 URL 上时
- 将当前查询条件同步到 URL 上，以便刷新页面保存搜索结果

## 代码演示

```jsx
/**
 * title: 基本使用
 * desc: 分页时同步页码到地址栏
 */
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useSearchParams, UseSearchParamsSchemaType } from '../../src/index'
import { Button, Table } from 'chocolate-ui'

const history = createBrowserHistory()

const dataSource = [
  {
    key: '1',
    name: '吴彦祖',
    age: 32,
    address: '朝阳区人民公园1号',
  },
  {
    key: '2',
    name: '吴彦祖',
    age: 42,
    address: '朝阳区人民公园1号',
  },
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]

const App = () => {
  const schema = {
    page: {
      type: UseSearchParamsSchemaType.NUMBER,
      default: 1,
    },
  }
  const { searchParams, set, remove, reset } = useSearchParams({
    schema,
  })
  const btnCss = { marginRight: 20 }

  return (
    <>
      <pre>{JSON.stringify(searchParams, undefined, 2)}</pre>
      <div style={{ marginBottom: 20 }}>
        <Button
          style={btnCss}
          btnType="primary"
          size="sm"
          onClick={() => remove(['page'])}
        >
          移除page属性
        </Button>
        <Button btnType="default" size="sm" onClick={() => reset()}>
          重置page属性
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} showHeader />
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
 * title: 多种数据结构
 * desc: 通过定义Schema转换参数的数据类型并同步到地址栏
 */

import React from 'react'
import { Router, useLocation } from 'react-router-dom'
import { Button } from 'chocolate-ui'
import { createBrowserHistory } from 'history'
import { useSearchParams, UseSearchParamsSchemaType } from '../../src/index'

const history = createBrowserHistory()

const App = () => {
  const schema = {
    name: UseSearchParamsSchemaType.STRING,
    like: UseSearchParamsSchemaType.BOOLEAN,
    success: UseSearchParamsSchemaType.BOOLEAN,
    age: {
      type: UseSearchParamsSchemaType.NUMBER,
      default: 10,
    },
    test: {
      type: UseSearchParamsSchemaType.STRING,
      default: 'defaultValue',
    },
    friends: UseSearchParamsSchemaType.ARRAY,
  }
  const { searchParams, set, remove, reset } = useSearchParams({
    schema,
  })

  const { search } = useLocation()
  const btnCss = { marginRight: 20, marginBottom: 20 }
  return (
    <div>
      <h5>基础示例:</h5>
      <Button
        style={btnCss}
        btnType="primary"
        size="sm"
        onClick={() => {
          set({
            name: 'test',
            like: false,
            success: true,
            age: 18,
            friends: ['a', 'b'],
          })
        }}
      >
        添加参数
      </Button>

      <div>原始 location search: </div>
      <code>{JSON.stringify(search, undefined, 2)}</code>

      <div>通过 schema 解析之后的 searchParams:</div>
      <code>{JSON.stringify(searchParams, undefined, 2)}</code>

      <div>移除某个属性</div>

      <div style={{ marginTop: 20 }}>
        <Button
          style={btnCss}
          btnType="danger"
          size="sm"
          onClick={() => {
            remove(['name'])
          }}
        >
          移除 name 属性
        </Button>
        <Button
          style={btnCss}
          btnType="danger"
          size="sm"
          onClick={() => {
            remove()
          }}
        >
          移除所有属性
        </Button>
        <Button
          style={btnCss}
          btnType="danger"
          size="sm"
          onClick={() => {
            reset()
          }}
        >
          重置
        </Button>
      </div>
    </div>
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
const { searchParams, set, remove, reset } = useSearchParams(options)
```

<br/>

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options.schema | 字段的映射关系 | `UseSearchParamsSchema` | `-` |
| options.pathname | push 的路径名, 默认当前路径名 | `string` | `location.pathname` |
| searchParams | 按照 schema 规则转换之后的查询参数 | `{ [key: string]: any }` | `-` |
| set | 设置参数，如果已存在,则会覆盖 | `(values: Partial<T>) => void` | `-` |
| remove | 移除参数，如果不传参数, 则移除所有 | `(keys?: Array<keyof T>) => void` | `-` |
| reset | 重置所有参数 | `() => void` | `-` |

<br/>

```js
export interface UseSearchParamsSchema {
  [key: string]: UseSearchParamsSchemaDetail | string
}

export interface UseSearchParamsSchemaDetail {
  type: string
  default: string | Array<any> | number | boolean
}
```

### UseSearchParamsSchemaType

- `STRING`
- `BOOLEAN`
- `NUMBER`
- `ARRAY`
