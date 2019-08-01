# vue-cli-multi-frame

## 项目依赖安装
```
npm install
// or
yarn install
```

### 开发模式
```
npm run dev
// or
yarn run dev
```

### 生产模式
```
npm run build
// or
yarn run build
```

### 校验代码规范
```
npm run lint
// or
yarn run lint
```

# 如果 npm 安装的太慢，建议安装 nrm 进行安装

安装 nrm：

```
npm install -g nrm
```

安装完成后切换成淘宝节点：

```
nrm use taobao
```

# 常见安装错误解决方法

### npm install 出现 "Unexpected end of JSON input while parsing near" 错误解决方法

1. 删掉package.lock.json
2. 运行如下命令清除 cache

```
npm cache clean --force
```