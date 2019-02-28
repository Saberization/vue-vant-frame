'use strict';
module.exports = {
  build: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    modules: false,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: false,
    // 是否开启 css sourceMap 设置为 true 之后可能会影响构建的性能。
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项。
    // 支持：css-loader、postcss-loader、sass-loader、less-loader、stylus-loader
    loaderOptions: {}
  },

  dev: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    modules: false,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: true,
    // 是否开启 css sourceMap 设置为 true 之后可能会影响构建的性能。
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项。
    // 支持：css-loader、postcss-loader、sass-loader、less-loader、stylus-loader
    loaderOptions: {}
  }
};