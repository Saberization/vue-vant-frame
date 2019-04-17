/**
 * 缩放算法
 * 最临邻近插值
 */

function scale (data, width, height, newData, newWidth, newHeight) {
  // 计算压缩后的缩放比
  const scaleW = newWidth / width;
  const scaleH = newHeight / height;
  const dstData = newData;

  const filter = function filter (dstCol, dstRow) {
    const srcCol = Math.min(width - 1, dstCol / scaleW);
    const srcRow = Math.min(height - 1, dstRow / scaleH);
    const intCol = Math.floor(srcCol);
    const intRow = Math.floor(srcRow);

    // 真实的index，因为数组是一维的
    let dstI = dstRow * newWidth + dstCol;
    let srcI = intRow * width + intCol;

    // rgba，所以要乘以4
    dstI *= 4;
    srcI *= 4;

    for (let j = 0; j <= 3; j += 1) {
      dstData[dstI + j] = data[srcI + j];
    }
  };

  // 区块
  for (let col = 0; col < newWidth; col += 1) {
    for (let row = 0; row < newHeight; row += 1) {
      filter(col, row);
    }
  }
}

function nearestNeighborInterpolation (imgData, newImgData) {
  scale(imgData.data, imgData.width, imgData.height, newImgData.data, newImgData.width, newImgData.height);

  return newImgData;
}

/**
 * 缩放算法
 * 双线性差值，会损坏原图（带低通滤波器效果）
 */

/**
 * 获取某行某列的像素对于的rgba值
 * @param {Object} data 图像数据
 * @param {Number} srcWidth 宽度
 * @param {Number} srcHeight 高度
 * @param {Number} row 目标像素的行
 * @param {Number} col 目标像素的列
 * @returns {String} rgba 颜色值
 */
function getRGBAValue (data, srcWidth, srcHeight, row, col) {
  let newRow = row;
  let newCol = col;

  if (newRow >= srcHeight) {
    newRow = srcHeight - 1;
  } else if (newRow < 0) {
    newRow = 0;
  }

  if (newCol >= srcWidth) {
    newCol = srcWidth - 1;
  } else if (newCol < 0) {
    newCol = 0;
  }

  let newIndex = newRow * srcWidth + newCol;

  newIndex *= 4;

  return [data[newIndex + 0], data[newIndex + 1], data[newIndex + 2], data[newIndex + 3]];
}

function scale$1 (data, width, height, newData, newWidth, newHeight) {
  // 计算压缩后的缩放比
  const scaleW = newWidth / width;
  const scaleH = newHeight / height;
  const dstData = newData;

  const filter = function filter (dstCol, dstRow) {
    // 源图像中的坐标（可能是一个浮点）
    const srcCol = Math.min(width - 1, dstCol / scaleW);
    const srcRow = Math.min(height - 1, dstRow / scaleH);
    const intCol = Math.floor(srcCol);
    const intRow = Math.floor(srcRow);
    // 计算u和v
    const u = srcCol - intCol;
    const v = srcRow - intRow;
    // 1-u与1-v
    const u1 = 1 - u;
    const v1 = 1 - v;

    // 真实的index，因为数组是一维的
    let dstI = dstRow * newWidth + dstCol;

    // rgba，所以要乘以4
    dstI *= 4;

    const rgba00 = getRGBAValue(data, width, height, intRow + 0, intCol + 0);
    const rgba01 = getRGBAValue(data, width, height, intRow + 0, intCol + 1);
    const rgba10 = getRGBAValue(data, width, height, intRow + 1, intCol + 0);
    const rgba11 = getRGBAValue(data, width, height, intRow + 1, intCol + 1);

    for (let j = 0; j <= 3; j += 1) {
      const partV = v * (u1 * rgba10[j] + u * rgba11[j]);
      const partV1 = v1 * (u1 * rgba00[j] + u * rgba01[j]);

      dstData[dstI + j] = partV + partV1;
    }
  };

  for (let col = 0; col < newWidth; col += 1) {
    for (let row = 0; row < newHeight; row += 1) {
      filter(col, row);
    }
  }
}

function bilinearInterpolation (imgData, newImgData) {
  scale$1(imgData.data, imgData.width, imgData.height, newImgData.data, newImgData.width, newImgData.height);

  return newImgData;
}

/**
 * 缩放算法
 * 双立方（三次）卷积插值，图像更真实
 * 计算周围16个点
 * 取一阶导数值为二阶差分值的情况，满足插值函数一阶导函数连续
 * 函数逼近程度和三次样条插值效果一样，非常的高
 *
 * 公式：（矩阵乘法）
 * 推导公式
 * http://blog.csdn.net/qq_24451605/article/details/49474113
 * https://en.wikipedia.org/wiki/Bicubic_interpolation
 * */
let a00 = '';
let a01 = '';
let a02 = '';
let a03 = '';
let a10 = '';
let a11 = '';
let a12 = '';
let a13 = '';
let a20 = '';
let a21 = '';
let a22 = '';
let a23 = '';
let a30 = '';
let a31 = '';
let a32 = '';
let a33 = '';

const getRGBAValue$1 = function getRGBAValue (data, srcWidth, srcHeight, row, col, colorIndex) {
  let newRow = row;
  let newCol = col;

  if (newRow >= srcHeight) {
    newRow = srcHeight - 1;
  } else if (newRow < 0) {
    newRow = 0;
  }

  if (newCol >= srcWidth) {
    newCol = srcWidth - 1;
  } else if (newCol < 0) {
    newCol = 0;
  }

  let newIndex = newRow * srcWidth + newCol;

  newIndex *= 4;

  return data[newIndex + colorIndex];
};

const getPixelValue = function getPixelValue (pixelValue) {
  let newPixelValue = pixelValue;

  newPixelValue = Math.min(255, newPixelValue);
  newPixelValue = Math.max(0, newPixelValue);

  return newPixelValue;
};

const updateCoefficients = function updateCoefficients (tmpPixels) {
  const p = tmpPixels;

  a00 = p[1][1];
  a01 = -0.5 * p[1][0] + 0.5 * p[1][2];
  a02 = p[1][0] - 2.5 * p[1][1] + 2 * p[1][2] - 0.5 * p[1][3];
  a03 = -0.5 * p[1][0] + 1.5 * p[1][1] - 1.5 * p[1][2] + 0.5 * p[1][3];

  a10 = -0.5 * p[0][1] + 0.5 * p[2][1];
  a11 = 0.25 * p[0][0] - 0.25 * p[0][2] - 0.25 * p[2][0] + 0.25 * p[2][2];
  a12 = -0.5 * p[0][0] + 1.25 * p[0][1] - p[0][2] + 0.25 * p[0][3] + 0.5 * p[2][0] - 1.25 * p[2][1] + p[2][2] - 0.25 * p[2][3];
  a13 = 0.25 * p[0][0] - 0.75 * p[0][1] + 0.75 * p[0][2] - 0.25 * p[0][3] - 0.25 * p[2][0] + 0.75 * p[2][1] - 0.75 * p[2][2] + 0.25 * p[2][3];

  a20 = p[0][1] - 2.5 * p[1][1] + 2 * p[2][1] - 0.5 * p[3][1];
  a21 = -0.5 * p[0][0] + 0.5 * p[0][2] + 1.25 * p[1][0] - 1.25 * p[1][2] - p[2][0] + p[2][2] + 0.25 * p[3][0] - 0.25 * p[3][2];
  a22 = p[0][0] - 2.5 * p[0][1] + 2 * p[0][2] - 0.5 * p[0][3] - 2.5 * p[1][0] + 6.25 * p[1][1] - 5 * p[1][2] + 1.25 * p[1][3] + 2 * p[2][0] - 5 * p[2][1] + 4 * p[2][2] - p[2][3] - 0.5 * p[3][0] + 1.25 * p[3][1] - p[3][2] + 0.25 * p[3][3];
  a23 = -0.5 * p[0][0] + 1.5 * p[0][1] - 1.5 * p[0][2] + 0.5 * p[0][3] + 1.25 * p[1][0] - 3.75 * p[1][1] + 3.75 * p[1][2] - 1.25 * p[1][3] - p[2][0] + 3 * p[2][1] - 3 * p[2][2] + p[2][3] + 0.25 * p[3][0] - 0.75 * p[3][1] + 0.75 * p[3][2] - 0.25 * p[3][3];

  a30 = -0.5 * p[0][1] + 1.5 * p[1][1] - 1.5 * p[2][1] + 0.5 * p[3][1];
  a31 = 0.25 * p[0][0] - 0.25 * p[0][2] - 0.75 * p[1][0] + 0.75 * p[1][2] + 0.75 * p[2][0] - 0.75 * p[2][2] - 0.25 * p[3][0] + 0.25 * p[3][2];
  a32 = -0.5 * p[0][0] + 1.25 * p[0][1] - p[0][2] + 0.25 * p[0][3] + 1.5 * p[1][0] - 3.75 * p[1][1] + 3 * p[1][2] - 0.75 * p[1][3] - 1.5 * p[2][0] + 3.75 * p[2][1] - 3 * p[2][2] + 0.75 * p[2][3] + 0.5 * p[3][0] - 1.25 * p[3][1] + p[3][2] - 0.25 * p[3][3];
  a33 = 0.25 * p[0][0] - 0.75 * p[0][1] + 0.75 * p[0][2] - 0.25 * p[0][3] - 0.75 * p[1][0] + 2.25 * p[1][1] - 2.25 * p[1][2] + 0.75 * p[1][3] + 0.75 * p[2][0] - 2.25 * p[2][1] + 2.25 * p[2][2] - 0.75 * p[2][3] - 0.25 * p[3][0] + 0.75 * p[3][1] - 0.75 * p[3][2] + 0.25 * p[3][3];
};

const getValue = function getValue (x, y) {
  const x2 = x * x;
  const x3 = x2 * x;
  const y2 = y * y;
  const y3 = y2 * y;

  return a00 + a01 * y + a02 * y2 + a03 * y3 + (a10 + a11 * y + a12 * y2 + a13 * y3) * x + (a20 + a21 * y + a22 * y2 + a23 * y3) * x2 + (a30 + a31 * y + a32 * y2 + a33 * y3) * x3;
};

function scale$2 (data, width, height, newData, newWidth, newHeight) {
  const dstData = newData;

  // 计算压缩后的缩放比
  const scaleW = newWidth / width;
  const scaleH = newHeight / height;

  const filter = function filter (dstCol, dstRow) {
    // 源图像中的坐标（可能是一个浮点）
    const srcCol = Math.min(width - 1, dstCol / scaleW);
    const srcRow = Math.min(height - 1, dstRow / scaleH);
    const intCol = Math.floor(srcCol);
    const intRow = Math.floor(srcRow);
    // 计算u和v
    const u = srcCol - intCol;
    const v = srcRow - intRow;

    // 真实的index，因为数组是一维的
    let dstI = dstRow * newWidth + dstCol;

    dstI *= 4;

    // 16个邻近像素的灰度（分别计算成rgba）
    const tmpPixels = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    // rgba
    for (let i = 0; i <= 3; i += 1) {
      // 16个临近点
      for (let m = -1; m <= 2; m += 1) {
        for (let n = -1; n <= 2; n += 1) {
          tmpPixels[m + 1][n + 1] = getRGBAValue$1(data, width, height, intRow + m, intCol + n, i);
        }
      }

      // 更新系数
      updateCoefficients(tmpPixels);
      // 利用uv来求值
      dstData[dstI + i] = getPixelValue(getValue(v, u));
    }
  };

  // 区块
  for (let col = 0; col < newWidth; col += 1) {
    for (let row = 0; row < newHeight; row += 1) {
      filter(col, row);
    }
  }
}

function bicubicInterpolation (imgData, newImgData) {
  scale$2(imgData.data, imgData.width, imgData.height, newImgData.data, newImgData.width, newImgData.height);

  return newImgData;
}

/**
 * 缩放算法
 * 双立方（三次）卷积插值，图像更真实
 * 计算周围16个点
 * 取一阶导数值为二阶差分值的情况，满足插值函数一阶导函数连续
 * 函数逼近程度和三次样条插值效果一样，非常的高
 *
 * 公式：（矩阵乘法）
 * 推导公式
 * http://blog.csdn.net/qq_24451605/article/details/49474113
 * https://en.wikipedia.org/wiki/Bicubic_interpolation
 * */

/**
 * 采样公式的常数A取值,调整锐化与模糊
 * -0.5 三次Hermite样条
 * -0.75 常用值之一
 * -1 逼近y = sin(x*PI)/(x*PI)
 * -2 常用值之一
 */
const A = -1;

function interpolationCalculate (x) {
  const absX = x >= 0 ? x : -x;
  const x2 = x * x;
  const x3 = absX * x2;

  if (absX <= 1) {
    return 1 - (A + 3) * x2 + (A + 2) * x3;
  } if (absX <= 2) {
    return -4 * A + 8 * A * absX - 5 * A * x2 + A * x3;
  }

  return 0;
}

function getPixelValue$1 (pixelValue) {
  let newPixelValue = pixelValue;

  newPixelValue = Math.min(255, newPixelValue);
  newPixelValue = Math.max(0, newPixelValue);

  return newPixelValue;
}

/**
 * 获取某行某列的像素对于的rgba值
 * @param {Object} data 图像数据
 * @param {Number} srcWidth 宽度
 * @param {Number} srcHeight 高度
 * @param {Number} row 目标像素的行
 * @param {Number} col 目标像素的列
 * @returns {String} rgba值
 */
function getRGBAValue$2 (data, srcWidth, srcHeight, row, col) {
  let newRow = row;
  let newCol = col;

  if (newRow >= srcHeight) {
    newRow = srcHeight - 1;
  } else if (newRow < 0) {
    newRow = 0;
  }

  if (newCol >= srcWidth) {
    newCol = srcWidth - 1;
  } else if (newCol < 0) {
    newCol = 0;
  }

  let newIndex = newRow * srcWidth + newCol;

  newIndex *= 4;

  return [data[newIndex + 0], data[newIndex + 1], data[newIndex + 2], data[newIndex + 3]];
}

function scale$3 (data, width, height, newData, newWidth, newHeight) {
  const dstData = newData;

  // 计算压缩后的缩放比
  const scaleW = newWidth / width;
  const scaleH = newHeight / height;

  const filter = function filter (dstCol, dstRow) {
    // 源图像中的坐标（可能是一个浮点）
    const srcCol = Math.min(width - 1, dstCol / scaleW);
    const srcRow = Math.min(height - 1, dstRow / scaleH);
    const intCol = Math.floor(srcCol);
    const intRow = Math.floor(srcRow);
    // 计算u和v
    const u = srcCol - intCol;
    const v = srcRow - intRow;

    // 真实的index，因为数组是一维的
    let dstI = dstRow * newWidth + dstCol;

    dstI *= 4;

    // 存储灰度值的权重卷积和
    const rgbaData = [0, 0, 0, 0];

    // 根据数学推导，16个点的f1*f2加起来是趋近于1的（可能会有浮点误差）
    // 因此就不再单独先加权值，再除了
    // 16个邻近点
    for (let m = -1; m <= 2; m += 1) {
      for (let n = -1; n <= 2; n += 1) {
        const rgba = getRGBAValue$2(data, width, height, intRow + m, intCol + n);
        // 一定要正确区分 m,n和u,v对应的关系，否则会造成图像严重偏差（譬如出现噪点等）
        // F(row + m, col + n)S(m - v)S(n - u)
        const f1 = interpolationCalculate(m - v);
        const f2 = interpolationCalculate(n - u);
        const weight = f1 * f2;

        rgbaData[0] += rgba[0] * weight;
        rgbaData[1] += rgba[1] * weight;
        rgbaData[2] += rgba[2] * weight;
        rgbaData[3] += rgba[3] * weight;
      }
    }

    dstData[dstI + 0] = getPixelValue$1(rgbaData[0]);
    dstData[dstI + 1] = getPixelValue$1(rgbaData[1]);
    dstData[dstI + 2] = getPixelValue$1(rgbaData[2]);
    dstData[dstI + 3] = getPixelValue$1(rgbaData[3]);
  };

  // 区块
  for (let col = 0; col < newWidth; col += 1) {
    for (let row = 0; row < newHeight; row += 1) {
      filter(col, row);
    }
  }
}

function bicubicInterpolation$1 (imgData, newImgData) {
  scale$3(imgData.data, imgData.width, imgData.height, newImgData.data, newImgData.width, newImgData.height);

  return newImgData;
}

function extend (target) {
  const finalTarget = target;

  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  rest.forEach((source) => {
    source && Object.keys(source).forEach((key) => {
      finalTarget[key] = source[key];
    });
  });

  return finalTarget;
}

/**
 * 选择这段代码用到的太多了，因此抽取封装出来
 * @param {Object} element dom元素或者selector
 * @return {HTMLElement} 返回选择的Dom对象，无果没有符合要求的，则返回null
 */

/**
 * 获取DOM的可视区高度，兼容PC上的body高度获取
 * 因为在通过body获取时，在PC上会有CSS1Compat形式，所以需要兼容
 * @param {HTMLElement} dom 需要获取可视区高度的dom,对body对象有特殊的兼容方案
 * @return {Number} 返回最终的高度
 */

/**
 * 设置一个Util对象下的命名空间
 * @param {Object} parent 需要绑定到哪一个对象上
 * @param {String} namespace 需要绑定的命名空间名
 * @param {Object} target 需要绑定的目标对象
 * @return {Object} 返回最终的对象
 */

const defaultArgs = {
  width: 80,
  height: 80,
  mime: 'image/png',
  // 0: nearestNeighbor
  // 1: bilinearInterpolation
  // 2: bicubicInterpolation
  // 3: bicubicInterpolation2
  processType: 1
};

const defaultArgsCompress = {
  // 压缩质量
  quality: 0.92,
  mime: 'image/jpeg',
  // 压缩时的放大系数，默认为1，如果增大，代表图像的尺寸会变大(最大不会超过原图)
  compressScaleRatio: 1,
  // ios的iPhone下主动放大一定系数以解决分辨率过小的模糊问题
  iphoneFixedRatio: 1.5,
  // 是否采用原图像素（不会改变大小）
  isUseOriginSize: false,
  // 增加最大宽度，增加后最大不会超过这个宽度
  maxWidth: 0,
  // 使用强制的宽度，如果使用，其它宽高比系数都会失效，默认整图使用这个宽度
  forceWidth: 0,
  // 同上，但是一般不建议设置，因为很可能会改变宽高比导致拉升，特殊场景下使用
  forceHeight: 0
};

function scaleMixin (ImageScale) {
  const api = ImageScale;

  /**
   * 对ImageData类型的数据进行缩放，将数据放入新的imageData中
   * @param {ImageData} imageData 目标ImageData
   * @param {ImageData} newImageData 新的ImageData
   * @param {Object} args 额外参数
   */
  api.scaleImageData = function scaleImageData (imageData, newImageData, args) {
    const finalArgs = extend({}, defaultArgs, args);
    const processTypes = [nearestNeighborInterpolation, bilinearInterpolation, bicubicInterpolation, bicubicInterpolation$1];
    const curDealFunc = processTypes[finalArgs.processType];

    curDealFunc(imageData, newImageData);
  };

  /**
   * 对Image类型的对象进行缩放，返回一个base64字符串
   * @param {Image} image 目标Image
   * @param {Object} args 额外参数
   * @return {String} 返回目标图片的b64字符串
   */
  api.scaleImage = function scaleImage (image, args) {
    const { width } = image;
    const { height } = image;
    const finalArgs = extend({}, defaultArgs, args);

    const canvasTransfer = document.createElement('canvas');
    const ctxTransfer = canvasTransfer.getContext('2d');

    canvasTransfer.width = width;
    canvasTransfer.height = height;

    ctxTransfer.drawImage(image, 0, 0, width, height);

    const imageData = ctxTransfer.getImageData(0, 0, width, height);
    const newImageData = ctxTransfer.createImageData(finalArgs.width, finalArgs.height);

    api.scaleImageData(imageData, newImageData, finalArgs);

    canvasTransfer.width = newImageData.width;
    canvasTransfer.height = newImageData.height;

    ctxTransfer.putImageData(newImageData, 0, 0, 0, 0, canvasTransfer.width, canvasTransfer.height);

    // console.log(imageData);
    // console.log(newImageData);
    // console.log('压缩时w:' + canvasTransfer.width + ',' + canvasTransfer.height);

    return canvasTransfer.toDataURL(finalArgs.mime, 0.9);
  };

  function getPixelRatio (context) {
    const backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

    const ratio = (window.devicePixelRatio || 1) / backingStore;

    return ratio;
  }

  /**
   * 压缩图片，返回一个base64字符串
   * 与scale的区别是这用的是canvas默认缩放，并且有很多参数可控
   * @param {Image} image 目标Image
   * @param {Object} args 额外参数
   * @return {String} 返回目标图片的b64字符串
   */
  api.compressImage = function compressImage (image, args) {
    const { width } = image;
    const { height } = image;
    const wPerH = width / height;
    const finalArgs = extend({}, defaultArgsCompress, args);

    const canvasTransfer = document.createElement('canvas');
    const ctxTransfer = canvasTransfer.getContext('2d');

    let ratio = getPixelRatio(ctxTransfer);

    ratio *= finalArgs.compressScaleRatio || 1;
    if (navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/)) {
      ratio *= finalArgs.iphoneFixedRatio || 1;
    }

    let finalWidth = window.innerWidth * ratio;

    if (finalArgs.isUseOriginSize || finalWidth > width) {
      // 最大不会超过原图的尺寸
      finalWidth = width;
    }

    const { maxWidth } = finalArgs;

    if (maxWidth && width > maxWidth && finalWidth > maxWidth) {
      // 考虑到之前已经进行不超过原图的判断了
      finalWidth = maxWidth;
    }
    const { forceWidth } = finalArgs;
    const { forceHeight } = finalArgs;

    if (forceWidth) {
      // 使用固定宽
      finalWidth = forceWidth;
    }

    let finalHeight = finalWidth / wPerH;

    if (forceHeight) {
      finalHeight = forceHeight;
    }

    canvasTransfer.width = finalWidth;
    canvasTransfer.height = finalHeight;
    ctxTransfer.drawImage(image, 0, 0, width, height, 0, 0, canvasTransfer.width, canvasTransfer.height);

    return canvasTransfer.toDataURL(finalArgs.mime, finalArgs.quality);
  };
}

const ImageScale = {};

scaleMixin(ImageScale);

export default ImageScale;
