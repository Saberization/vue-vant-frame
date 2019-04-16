module.exports = {
  "env": {
    // 环境定义了预定义的全局变量。更多在官网查看
    "browser": true,
    "node": true,
    "commonjs": true,
    "amd": true,
    "es6": true,
    "mocha": true
  },
  "rules": {
    /**
     * 首先基于eslint的推荐风格， 并覆盖一些规则
     */
    // 禁用 console，目前console变为警告级别
    "no-console": [1, {
      "allow": ["warn", "error"]
    }],
    "no-empty": [2, {
      // 允许空的catch
      "allowEmptyCatch": true
    }],

    /**
     * 然后根据代码规范的规则设置(一些重点规则)
     * http://app.epoint.com.cn/mfdoc/index/index.php#page=hybrid_code_rules
     */

    /**
     * 注释风格
     */
    // 如果使用注释，一定要符合jsdoc
    // 要求使用有效和一致的JSDoc 注释，只有在有返回值时才需要return
    "valid-jsdoc": [2, {
      "requireReturn": false
    }],
    // 强制在注释中 // 或 /* 使用一致的空格
    // 所以注释都必须是 // sss  格式
    "spaced-comment": [2, "always", {
      "markers": ["boot.js", "globals", "eslint", "eslint-disable", "*package", "!"]
    }],
    // 禁止在代码行后使用内联注释
    "no-inline-comments": 2,

    /**
     * 基础js语法规范
     */
    // 强制使用一致的缩进，4个空格
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    // 禁止所有的tab，必须用空格替换
    "no-tabs": 2,
    // 确保一定是分号结尾
    "semi": [2, "always"],
    // 使用 === 替代 == allow-null允许null和undefined==
    "eqeqeq": [2, "allow-null"],
    //  禁用行尾空格,允许空行使用空白符
    "no-trailing-spaces": [2, {
      "skipBlankLines": true
    }],
    // 不允许多个空行
    "no-multiple-empty-lines": [2, {
      "max": 2
    }],

    /**
     * 变量声明
     */
    // 双峰驼命名格式
    "camelcase": 2,
    // 禁止出现未使用过的变量
    "no-unused-vars": [2, {
      "vars": "all",
      "args": "none",
      // 忽略的全局匹配
      "varsIgnorePattern": "ENV_*"
    }],
    // 不允许标签与变量同名
    "no-label-var": 2,
    // 禁止覆盖受限制的标识符
    "no-shadow-restricted-names": 2,
    // 禁止将变量初始化为 undefined
    "no-undef-init": 2,
    // 不允许在变量定义之前使用它们
    "no-use-before-define": [2, {
      "functions": false,
      "classes": true
    }],
    // 要求在var 声明周围换行，一般用于多个变量声明时
    "one-var-declaration-per-line": [2, "always"],
    // 要求var 声明语句后有一行空行
    // return 前必须空一行
    "padding-line-between-statements": [2, {
      blankLine: "always",
      prev: ["const", "let", "var"],
      next: "*"
    }, {
      blankLine: "always",
      prev: "*",
      next: ["return"]
    }, {
      blankLine: "any",
      prev: ["const", "let", "var"],
      next: ["const", "let", "var"]
    }],

    /**
     * 一些非法的调用
     */
    // 禁用 alert、confirm 和 prompt
    "no-alert": 2,
    // 禁用 arguments.caller 或 arguments.callee
    "no-caller": 2,
    // 禁止在没有类型检查操作符的情况下与 null 进行比较
    "no-eq-null": 2,
    // 禁用 eval(),如果实在要用，可以间接调用
    "no-eval": [2, {
      "allowIndirect": true
    }],
    // 禁止扩展原生类型
    "no-extend-native": 2,
    // 禁止对原生对象赋值
    "no-native-reassign": 2,
    // 禁用 with 语句
    "no-with": 2,
    // 禁止在字符串中使用八进制转义序列
    "no-octal-escape": 2,
    // 禁用 __proto__ 属性
    "no-proto": 2,
    // 禁止自身比较
    "no-self-compare": 2,
    // 禁用逗号操作符
    "no-sequences": 2,
    // 禁止使用类似 eval() 的方法（隐式的eval）
    "no-implied-eval": 2,
    // 禁用 __iterator__ 属性
    "no-iterator": 2,
    // 禁止对 Function 对象使用 new 操作符
    "no-new-func": 2,
    // 强制在parseInt()使用基数参数
    "radix": 2,

    /**
     * 代码风格
     */
    // 要求 IIFE 使用括号括起来
    "wrap-iife": [2, "any"],
    // 强制所有控制语句使用一致的括号风格
    "curly": [2, "all"],
    // 使用一致的反勾号、双引号或单引号（要么都是单引，要么都是双引号）
    "quotes": [2, "single", {
      "avoidEscape": true
    }],
    // 要求操作符周围有空格
    "space-infix-ops": 2,
    // 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
    // 允许  new a.B()形式
    "new-cap": [2, {
      "newIsCap": true,
      "capIsNew": false
    }],
    //  要求 return 语句要么总是指定返回的值，要么不指定
    // "consistent-return": 2,
    // 禁止使用 javascript: url
    "no-script-url": 2,
    // 禁用 void 操作符
    "no-void": 2,
    // 强制在块之前使用一致的空格
    "space-before-blocks": [2, "always"],
    // 强制在圆括号内使用一致的空格
    "space-in-parens": [2, "never"],
    // 禁止 function 标识符和括号之间出现空格
    "no-spaced-func": 2,
    // 强制在关键字前后使用一致的空格 (前后要一致)
    "keyword-spacing": 2,
    // 强制 function 定义中最多允许的参数数量
    "max-params": [2, 7],
    // 要求调用无参构造函数时有圆括号
    "new-parens": 2,
    // 控制逗号前后的空格
    "comma-spacing": [2, {
      "before": false,
      "after": true
    }],
    // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    // http://eslint.org/docs/rules/comma-style
    "comma-style": [2, "last"],
    // 禁止或强制在单行代码块中使用空格
    "block-spacing": [2, "never"],
    // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    "array-bracket-spacing": [2, "never"],
    // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
    "computed-property-spacing": [2, "never"],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    "key-spacing": [2, {
      "beforeColon": false,
      "afterColon": true
    }],
    // 禁止使用多个空格
    "no-multi-spaces": 2,
    // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
    "no-multi-str": 2,
    // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    "default-case": 2,
  }
};
