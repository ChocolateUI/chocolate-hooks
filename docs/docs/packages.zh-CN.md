# 项目结构

项目基于 `yarn` 来构建基本的工作环境，每一个 hook 都在单独维护，使用 `use` 前缀。

包名要确保是 `chocolate-hooks` 这种格式的

```bash

src
├──hooks
│   ├── useCookie
│   ├── useCountDown
│   ├── usePrevious
│   └── useSetState

```

要注意每一个包的导出和命名规范，使用时如下示例:

```js
import { useCookie } from 'chocolate-hooks';
```

## 单元测试

推荐使用单元测试，可以把单元测试文件放在`src/__tests__`文件夹下，以`.test.js`来结尾命名。
