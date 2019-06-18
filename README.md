# vue-cli-multi-frame

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
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