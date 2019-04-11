/*
 * @Author: guotq
 * @Date: 2019-04-02 17:04:21
 * @Last Modified by: guotq
 * @Last Modified time: 2019-04-03 09:02:16
 * @Description: FileInput 选择文件上传
 */

const defaultSetting = {
  isMulti: false,
  type: '',
  accept: ''
};

class FileInput {
  constructor(options) {
    this.options = Object.assign(defaultSetting, options || {});
    this.errorCallback = () => {};
    this._createInput();
  }

  _createInput() {
    const { options } = this;
    let type;
    const el = document.createElement('input');
    const df = document.createDocumentFragment();
    let filter = '';
    const ejsEnv = false;

    el.type = 'file';

    if (options.isMulti) {
      el.multiple = true;
    }

    switch (options.type) {
    case 'Text':
      filter = ejsEnv ? 'text/*' : 'file/*';
      type = 'Text';
      break;

    case 'File':
      filter = ejsEnv ? 'file/*' : '*';
      type = 'DataUrl';
      break;

    case 'Image':
      filter = 'image/*';
      type = 'DataUrl';
      break;

    case 'Camera_File':
      filter = ejsEnv ? 'camera_file/*' : '*';
      type = 'DataUrl';
      break;

    case 'Image_File':
      filter = ejsEnv ? 'image_file/*' : '*';
      type = 'DataUrl';
      break;

    case 'Image_Camera':
      filter = ejsEnv ? 'image_camera/*' : 'image/*';
      type = 'DataUrl';
      break;

    case 'Camera':
      filter = ejsEnv ? 'camera/*' : 'image/*';
      type = 'DataUrl';
      break;

    case 'All':
      filter = ejsEnv ? '*/*' : '*';
      type = 'DataUrl';
      break;

    default:
      filter = '*';
      type = 'File';
    }

    el.accept = options.accept || filter;
    this.el = el;
    this.dataType = type;
    df.appendChild(el);
  }

  triggerClick() {
    this.el.click();
  }

  /**
   * 监听对应事件
   * @param {String} event 事件名
   * @param {Function} callback 回调函数
   */
  on(event = 'change', callback) {
    const { loadFormData } = this;
    const { dataType } = this;
    const that = this;

    if (event === 'error') {
      this.errorCallback = typeof callback === 'function' ? callback : this.errorCallback;
    }

    if (event === 'change') {
      this.el.onchange = function () {
        loadFormData(this.files, dataType)
          .then((result) => {
            if (callback && typeof callback === 'function') {
              callback(result);
            }
          })
          .catch((error) => {
            that.errorCallback(error);
          });
      };
    }
  }

  /**
   * 根据type解析FORMDATA
   * @param {Blob} files 文件对象
   * @param {String} dataType 返回文件类型
   */
  loadFormData(files, dataType) {
    let i = 0;
    const promiseQueue = [];

    while (i < files.length) {
      const file = files[i];
      const fileReader = new FileReader();

      if (dataType === 'DataUrl') {
        fileReader.readAsDataURL(file);
      } else if (dataType === 'Text') {
        fileReader.readAsText(file);
      } else {
        fileReader.readAsBinaryString(file);
      }

      const p = new Promise((resolve, reject) => {
        fileReader.onload = function (e) {
          let { result } = e.target;

          if (dataType === 'DataUrl') {
            if (result.indexOf('data:base64,') !== -1) {
              const filename = file.name.toLowerCase();
              let base64Type = 'image/jpeg';

              if (filename.lastIndexOf('jpg') !== -1) {
                base64Type = 'image/jpeg';
              } else if (filename.lastIndexOf('.png') !== -1) {
                base64Type = 'image/png';
              } else if (filename.lastIndexOf('gif') !== -1) {
                base64Type = 'image/gif';
              } else if (filename.lastIndexOf('icon') !== -1) {
                base64Type = 'image/x-icon';
              }

              result = result.replace('data:base64,', '');
              result = `data:${base64Type};base64,${result}`;
            }
          }

          resolve({
            value: result,
            file
          });
        };
        fileReader.onerror = function (event) {
          reject(event);
        };
      });
      promiseQueue.push(p);
      i++;
    }

    return Promise.all(promiseQueue);
  }
}

export default FileInput;
