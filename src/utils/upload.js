import { ajax } from './request';
import Config from '@shared/config';

/**
 * 文件上传
 * @param {Object} options 上传文件配置项
 * @returns {Object} ajax Promise
 */
const upload = (options) => {
  const files = options.files;
  const formdata = new FormData();
  const data = typeof options.data === 'string' ? options.data : JSON.stringify(options.data);

  formdata.append(data, '');

  if (Array.isArray(files)) {
    files.forEach(e => {
      formdata.append(e.name, e.file);
    });
  }

  options.data = formdata;

  return ajax(options);
};

export default upload;
