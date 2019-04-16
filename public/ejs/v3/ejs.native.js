/*!
 * ejsv3 v3.2.6
 * (c) 2017-2019
 * Released under the BSD-3-Clause License.
 *
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(window, (function () { 'use strict';

function uiMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [{
        namespace: 'toast',
        os: ['ejs'],
        defaultParams: {
            message: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'showDebugDialog',
        os: ['ejs'],
        defaultParams: {
            debugInfo: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject(rest, 'debugInfo');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'alert',
        os: ['ejs'],
        defaultParams: {
            title: '',
            message: '',
            buttonName: '确定',
            // 默认可取消
            cancelable: 1
        },
        // 用confirm来模拟alert
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');

            args[0].buttonLabels = [args[0].buttonName];
            ejs.ui.confirm.apply(this, args);
        }
    }, {
        namespace: 'confirm',
        os: ['ejs'],
        defaultParams: {
            title: '',
            message: '',
            buttonLabels: ['取消', '确定'],
            // 默认可取消
            cancelable: 1
        }
    }, {
        namespace: 'prompt',
        os: ['ejs'],
        defaultParams: {
            title: '',
            hint: '',
            text: '',
            lines: 1,
            maxLength: 10000,
            buttonLabels: ['取消', '确定'],
            // 默认可取消
            cancelable: 1
        }
    }, {
        namespace: 'select',
        os: ['ejs'],
        defaultParams: {
            title: '',
            items: [],
            choiceState: [],
            // 由以前的true和false替换为了1和0
            isMultiSelect: 0,
            // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
            type: 0,
            columns: 3,
            // 可取消
            cancelable: 1
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = rest;
            var options = args[0];
            var originalItems = options.items;

            options.dataFilter = function (res) {
                var newRes = res;
                var index = -1;
                var content = '';

                if (newRes.result) {
                    var choiceState = newRes.result.choiceState;

                    if (newRes.result.which !== undefined) {
                        index = newRes.result.which || 0;
                        content = originalItems[index];
                        // 需要将中文解码
                        newRes.result.content = decodeURIComponent(content);
                    } else if (choiceState !== undefined) {
                        newRes.result.choiceContent = [];
                        for (var i = 0, len = choiceState.length; i < len; i += 1) {
                            if (+choiceState[i] === 1) {
                                newRes.result.choiceContent.push(originalItems[i]);
                            }
                        }
                    }
                }

                return newRes;
            };

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'actionSheet',
        os: ['ejs'],
        defaultParams: {
            items: [],
            // 默认可取消
            cancelable: 1
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            var args = rest;
            var options = args[0];
            var originalItems = options.items;

            options.dataFilter = function (res) {
                var newRes = res;
                var index = -1;
                var content = '';

                if (newRes.result) {
                    index = newRes.result.which || 0;
                    content = originalItems[index];
                    // 需要将中文解码
                    newRes.result.content = decodeURIComponent(content);
                }

                return newRes;
            };

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'popWindow',
        os: ['ejs'],
        defaultParams: {
            titleItems: [],
            iconItems: undefined,
            iconFilterColor: ''
        },
        /**
         * 有横向菜单和垂直菜单2种
         * 可配合setNBRightImage、setNBRightText使用(iOS 不可配合使用)
         */
        runCode: function runCode() {
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            var args = rest;
            var options = args[0];
            var originalItems = options.titleItems;

            // 处理相对路径问题
            if (options.iconItems) {
                for (var i = 0, len = options.iconItems.length; i < len; i += 1) {
                    options.iconItems[i] = innerUtil.getFullPath(options.iconItems[i]);
                }
            }

            options.dataFilter = function (res) {
                var newRes = res;
                var index = -1;
                var content = '';

                if (newRes.result) {
                    index = newRes.result.which || 0;
                    content = originalItems[index];
                    // 需要将中文解码
                    newRes.result.content = decodeURIComponent(content);
                }

                return newRes;
            };

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'pickDate',
        os: ['ejs'],
        defaultParams: {
            // 部分设备上设置标题后遮挡控件可不设置标题
            title: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd。
            datetime: ''
        }
    }, {
        namespace: 'pickTime',
        os: ['ejs'],
        defaultParams: {
            // 部分设备上设置标题后遮挡控件可不设置标题
            title: '',
            // 默认为空为使用当前时间
            // 格式为 HH:mm
            datetime: ''
        }
    }, {
        namespace: 'pickDateTime',
        os: ['ejs'],
        defaultParams: {
            title1: '',
            title2: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd HH:mm
            datetime: ''
        }
    }, {
        namespace: 'showWaiting',
        os: ['ejs'],
        defaultParams: {
            message: '加载中...'
        },
        runCode: function runCode() {
            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'closeWaiting',
        os: ['ejs']
    }, {
        namespace: 'pullToRefresh.disable',
        os: ['ejs'],
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'pullToRefreshDisable';

            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                rest[_key8] = arguments[_key8];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'pullToRefresh.stop',
        os: ['ejs'],
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'pullToRefreshStop';

            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'pullToRefresh.enable',
        os: ['ejs'],
        defaultParams: {
            color: '000000'
        },
        /**
         * 启用下拉刷新后，只要有下拉刷新就会回调，属于长期回调范围
         */
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'pullToRefreshEnable';
            this.api.isLongCb = true;

            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }]);
}

function authMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('auth', [{
        namespace: 'getToken',
        os: ['ejs']
    }, {
        namespace: 'refreshToken',
        os: ['ejs']
    }, {
        namespace: 'getUserInfo',
        os: ['ejs']
    }, {
        namespace: 'getAuthCode',
        os: ['ejs'],
        support: '3.2.4'
    }]);
}

function runtimeMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [{
        namespace: 'launchApp',
        os: ['ejs'],
        defaultParams: {
            // android应用的包名
            packageName: '',
            // android应用页面类名
            className: '',
            // android应用页面配置的ActionName
            actionName: '',
            // 页面配置的Scheme名字，适用于Android与iOS
            scheme: '',
            // 传递的参数。需要目标应用解析获取参数。字符串形式
            data: ''
        }
    }, {
        namespace: 'isApplicationExist',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            // android应用的包名
            packageName: '',
            // ios下的scheme
            scheme: ''
        }
    }, {
        namespace: 'getAppKey',
        os: ['ejs']
    }, {
        namespace: 'getAppVersion',
        os: ['ejs']
    }, {
        namespace: 'getEjsVersion',
        os: ['ejs']
    }, {
        namespace: 'checkUpdate',
        os: ['ejs']
    }, {
        namespace: 'clearCache',
        os: ['ejs']
    }, {
        namespace: 'getGeolocation',
        os: ['ejs'],
        defaultParams: {
            isShowDetail: 0,
            // 1采用的火星坐标系，0采用地球坐标系
            coordinate: 1
        }
    }, {
        namespace: 'clipboard',
        os: ['ejs'],
        defaultParams: {
            text: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'openUrl',
        os: ['ejs'],
        defaultParams: {
            url: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject(rest, 'url');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'log',
        os: ['ejs'],
        defaultParams: {
            text: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        // 调试面板，如果native开启了调试，会在面板中打印
        namespace: 'logPanel',
        os: ['ejs'],
        support: '3.1.4',
        defaultParams: {
            text: ''
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'openSetting',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'getPlatformUrl',
        os: ['ejs'],
        support: '3.1.9'
    }, {
        namespace: 'getPluginVersion',
        os: ['ejs'],
        support: '3.2.1',
        defaultParams: {
            pluginName: '',
            packageName: ''
        }
    }]);
}

function deviceMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('device', [{
        namespace: 'setOrientation',
        os: ['ejs'],
        defaultParams: {
            // 1表示竖屏，0表示横屏，-1表示跟随系统
            orientation: 1
        }
    }, {
        namespace: 'setZoomControl',
        os: ['ejs'],
        defaultParams: {
            // 1表示显示，0表示隐藏
            isShow: 1
        }
    }, {
        namespace: 'setBounce',
        os: ['ejs'],
        defaultParams: {
            // 1表示开启，0表示关闭
            isEnable: 1
        }
    }, {
        namespace: 'getDeviceId',
        os: ['ejs']
    }, {
        namespace: 'getMacAddress',
        os: ['ejs']
    }, {
        namespace: 'getScreenInfo',
        os: ['ejs']
    }, {
        namespace: 'getVendorInfo',
        os: ['ejs']
    }, {
        namespace: 'isTablet',
        os: ['ejs']
    }, {
        namespace: 'getNetWorkInfo',
        os: ['ejs']
    }, {
        namespace: 'callPhone',
        os: ['ejs'],
        defaultParams: {
            phoneNum: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'sendMsg',
        os: ['ejs'],
        defaultParams: {
            phoneNum: '',
            message: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'phoneNum', 'message');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'closeInputKeyboard',
        os: ['ejs']
    }, {
        namespace: 'vibrate',
        os: ['ejs'],
        defaultParams: {
            duration: 500
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'duration');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'sendTo',
        os: ['ejs'],
        defaultParams: {
            title: '',
            url: '',
            imgBase64: '',
            imgURL: '',
            sdPath: ''
        }
    }, {
        namespace: 'setZoomControl',
        os: ['ejs'],
        defaultParams: {
            isShow: 1
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'isShow');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'setBounce',
        os: ['ejs'],
        defaultParams: {
            isEnable: 1
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'isEnable');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'shake.disable',
        os: ['ejs'],
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'shakeDisable';

            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'shake.enable',
        os: ['ejs'],
        /**
         * 启用摇一摇后，只要有摇一摇就会回调，属于长期回调范围
         */
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'shakeEnable';
            this.api.isLongCb = true;

            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'checkPermissions',
        os: ['ejs'],
        support: '3.1.5',
        defaultParams: {
            // 0-6分别对应：location，storage，phone，camera，sms，contacts，microphone
            permissionsType: 0
        }
    }, {
        namespace: 'requestPermissions',
        os: ['ejs'],
        support: '3.1.5',
        defaultParams: {
            // 0-6分别对应：location，storage，phone，camera，sms，contacts，microphone
            permissionsType: 0
        }
    }]);
}

function eventMixin(hybrid) {
    var hybridJs = hybrid;

    /**
     * 前端的EVENT名称和原生容器的有一些差别
     */
    var EVENT_MAPPING = {
        resume: 'OnPageResume',
        pause: 'OnPagePause',
        netChange: 'OnNetChanged',
        search: 'OnSearch'
    };

    hybridJs.extendModule('event', [{
        namespace: 'registerEvent',
        os: ['ejs'],
        defaultParams: {
            key: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;
            var options = args[0];

            options.key = EVENT_MAPPING[options.key] || options.key;
            args[0] = options;

            // 长期回调为true，里面会自动生成长期回调id
            this.api.isLongCb = true;
            // 标识是event，event的时候需要额外增加一个port参数，对应相应的长期回调id
            this.api.isEvent = true;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'unRegisterEvent',
        os: ['ejs'],
        defaultParams: {
            key: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];

            options.key = EVENT_MAPPING[options.key];
            args[0] = options;

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'isRegisterEvent',
        os: ['ejs'],
        defaultParams: {
            key: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;
            var options = args[0];

            options.key = EVENT_MAPPING[options.key];
            args[0] = options;

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'config',
        os: ['ejs'],
        defaultParams: {
            // 一个数组，不要传null，否则可能在iOS中会有问题
            jsApiList: []
        }
    }]);
}

function storageMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('storage', [{
        namespace: 'getItem',
        os: ['ejs'],
        defaultParams: {
            // 对应的key
            key: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容数组形式
            var args = rest;
            var options = args[0];

            if (!innerUtil.isObject(options.key)) {
                options.key = [options.key];
            }

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'setItem',
        os: ['ejs']
        // 格式为 key: value形式，支持多个key value
    }, {
        namespace: 'removeItem',
        os: ['ejs'],
        defaultParams: {
            // 对应的key
            key: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容数组形式
            var args = rest;
            var options = args[0];

            if (!innerUtil.isObject(options.key)) {
                options.key = [options.key];
            }

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'collection.getCollections',
        os: ['ejs'],
        defaultParams: {
            pageIndex: 1,
            pageSize: 20
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'getCollections';

            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.saveCollections',
        os: ['ejs'],
        defaultParams: {
            // 信息guid，必选
            msgGuid: '',
            // 信息标题，必选
            title: '',
            // 信息类型,根据业务需求自行定义，必选
            type: '',
            // 以下为可选内容
            dateTime: '',
            publisher: '',
            // 链接地址
            forward: '',
            remark: '',
            flag: ''
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'saveCollections';

            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.isCollection',
        os: ['ejs'],
        defaultParams: {
            // 信息guid，必选
            msgGuid: ''
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'isCollection';

            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.delCollection',
        os: ['ejs'],
        defaultParams: {
            // 信息guid，必选
            msgGuid: ''
        },
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'delCollection';

            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'collection.delAllCollections',
        os: ['ejs'],
        runCode: function runCode() {
            // 修改为原生中的namespace
            this.api.namespace = 'delAllCollections';

            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        // 获取应用管理平台配置的业务接口地址
        namespace: 'getBusinessRestUrl',
        os: ['ejs']
    }]);
}

function cardMixin(hybrid) {
    var hybridJS = hybrid;
    var innerUtil = hybridJS.innerUtil;

    hybridJS.extendModule('card', [{
        namespace: 'setTitle',
        os: ['ejs'],
        defaultParams: {
            text: '',
            imageUrl: ''
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'hide',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'hideTitleBar',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'addActionBtns',
        os: ['ejs'],
        defaultParams: {
            buttonTexts: ['menu1', 'menu2', 'menu3']
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;

            args[0].buttonTexts = innerUtil.eclipseButtonsNumber(args[0].buttonTexts, 3);

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'hideActionBar',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'showTip',
        os: ['ejs'],
        defaultParams: {
            tip: ''
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'tip');

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'hideTip',
        os: ['ejs'],
        support: '3.1.6'
    }, {
        namespace: 'setTitleBtn',
        os: ['ejs'],
        defaultParams: {
            text: ''
        },
        support: '3.1.6',
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');

            this.api.isLongCb = true;

            hybridJS.callInner.apply(this, args);
        }
    }, {
        namespace: 'setContentHeight',
        os: ['ejs'],
        support: '3.2.6',
        defaultParams: {
            unit: ''
        }
    }]);
}

function pageMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('page', [{
        namespace: 'open',
        os: ['ejs'],
        defaultParams: {
            pageUrl: '',
            pageStyle: 1,
            // 横竖屏,默认为1表示竖屏
            orientation: 1,
            // 额外数据
            data: {}
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'pageUrl', 'data');
            var options = args[0];

            // 将额外数据拼接到url中
            options.pageUrl = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
            // 去除无用参数的干扰
            options.data = undefined;

            options.dataFilter = function (res) {
                var newRes = res;

                if (!innerUtil.isObject(newRes.result.resultData)) {
                    try {
                        newRes.result.resultData = JSON.parse(newRes.result.resultData);
                    } catch (e) {}
                }

                return newRes;
            };

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'openLocal',
        os: ['ejs'],
        defaultParams: {
            className: '',
            // 为1则是打开已存在的页面，会杀掉所有该页面上的页面
            isOpenExist: 0,
            // 额外数据，注意额外数据只能一层键值对形式，不能再包裹子json
            data: {}
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];
            var pageStyle = options.data.pageStyle;

            // 兼容 pageStyle, 确保传递给原生的均是 Number 类型
            if (pageStyle) {
                options.data.pageStyle = typeof pageStyle === 'string' ? parseInt(pageStyle, 10) : pageStyle;
            }

            options.dataFilter = function (res) {
                var newRes = res;

                if (!innerUtil.isObject(newRes.result.resultData)) {
                    try {
                        newRes.result.resultData = JSON.parse(newRes.result.resultData);
                    } catch (e) {}
                }

                return newRes;
            };

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'close',
        os: ['ejs'],
        defaultParams: {
            // 需要关闭的页面层级，默认只会关闭一层
            popPageNumber: 1,
            // 需要传递的参数，是一个字符串
            resultData: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'resultData');

            if (innerUtil.isObject(args[0].resultData)) {
                args[0].resultData = JSON.stringify(args[0].resultData);
            }

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'reload',
        os: ['ejs']
    }, {
        namespace: 'showError',
        os: ['ejs'],
        defaultParams: {
            // 0: 网络异常  1: 服务器异常 2: 访问超时 3: 页面加载失败
            type: 0
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'type');

            hybridJs.callInner.apply(this, args);
        }
    }]);
}

function navigatorMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    /**
     * 按钮最多允许6个英文字符，或3个中文
     */
    var MAX_BTN_TEXT_COUNT = 6;

    hybridJs.extendModule('navigator', [{
        namespace: 'setTitle',
        os: ['ejs'],
        defaultParams: {
            title: '',
            // 子标题
            subTitle: '',
            // 是否可点击，可点击时会有点击效果并且点击后会触发回调，不可点击时永远不会触发回调
            // 可点击时，title会有下拉箭头
            // promise调用时和其他长期回调一样立马then
            direction: 'bottom',
            // 是否可点击，如果为1，代表可点击，会在标题右侧出现一个下拉图标，并且能被点击监听
            clickable: 0
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');

            this.api.isLongCb = true;

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'setMultiTitle',
        os: ['ejs'],
        defaultParams: {
            titles: ''
        },
        runCode: function runCode() {
            this.api.isLongCb = true;

            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'show',
        os: ['ejs']
    }, {
        namespace: 'hide',
        os: ['ejs']
    }, {
        namespace: 'showSearchBar',
        os: ['ejs'],
        runCode: function runCode() {
            this.api.isLongCb = true;

            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'hideSearchBar',
        os: ['ejs']
    }, {
        namespace: 'hideBackButton',
        os: ['ejs']
    }, {
        namespace: 'hookSysBack',
        os: ['ejs'],
        runCode: function runCode() {
            this.api.isLongCb = true;

            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'hookBackBtn',
        os: ['ejs'],
        runCode: function runCode() {
            this.api.isLongCb = true;

            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'setRightBtn',
        os: ['ejs'],
        defaultParams: {
            text: '',
            imageUrl: '',
            isShow: 1,
            // 对应哪一个按钮，一般是0, 1可选择
            which: 0
        },
        runCode: function runCode() {
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            var args = rest;
            var options = args[0];

            options.imageUrl = options.imageUrl && innerUtil.getFullPath(options.imageUrl);
            options.text = innerUtil.eclipseText(options.text, MAX_BTN_TEXT_COUNT);

            args[0] = options;
            this.api.isLongCb = true;

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'setRightMenu',
        os: ['ejs'],
        defaultParams: {
            text: '',
            imageUrl: '',
            // 过滤色默认为空
            iconFilterColor: '',
            // 点击后出现的菜单列表，这个API会覆盖rightBtn
            titleItems: [],
            iconItems: []
        },
        /**
         * 这个API比较特殊，暂时由前端模拟
         */
        runCode: function runCode() {
            var _this = this;

            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            var newArgs = [].slice.call(rest);
            var newOptions = innerUtil.extend({}, newArgs[0]);

            newOptions.success = function () {
                // 点击的时候，弹出菜单
                ejs.ui.popWindow.apply(_this, rest);
            };

            newArgs[0] = newOptions;
            ejs.navigator.setRightBtn.apply(this, newArgs);
        }
    }, {
        namespace: 'setLeftBtn',
        os: ['ejs'],
        defaultParams: {
            text: '',
            imageUrl: '',
            isShow: 1,
            // 是否显示下拉箭头,如果带箭头，它会占两个位置，同时覆盖左侧按钮和左侧返回按钮
            isShowArrow: 0
        },
        runCode: function runCode() {
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                rest[_key8] = arguments[_key8];
            }

            var args = rest;
            var options = args[0];

            options.imageUrl = options.imageUrl && innerUtil.getFullPath(options.imageUrl);
            options.text = innerUtil.eclipseText(options.text, MAX_BTN_TEXT_COUNT);

            args[0] = options;
            this.api.isLongCb = true;

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'showStatusBar',
        os: ['ejs']
    }, {
        namespace: 'hideStatusBar',
        os: ['ejs']
    }, {
        namespace: 'setSearchWord',
        os: ['ejs'],
        support: '3.1.9',
        defaultParams: {
            keyword: ''
        },
        runCode: function runCode() {
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'keyword');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'getSearchWord',
        os: ['ejs'],
        support: '3.1.9'
    }, {
        namespace: 'setSearchBar',
        os: ['ejs'],
        defaultParams: {
            isShow: 1,
            keyword: '',
            placeholder: '请输入搜索关键字',
            isSearchable: 0
        },
        support: '3.2.2',
        runCode: function runCode() {
            this.api.isLongCb = true;

            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
            }

            hybridJs.callInner.apply(this, rest);
        }
    }]);
}

function utilMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('util', [{
        namespace: 'scan',
        os: ['ejs']
    }, {
        namespace: 'downloadFile',
        os: ['ejs'],
        defaultParams: {
            // 下载地址
            url: '',
            // 文件名。必填。
            fileName: '',
            // 下载分类。默认为(其他分类)。推荐传对应的模块名称。例如邮件(MAIL)。如果没有"附件管理"模块，可忽略该参数。
            type: '',
            //  如果本地已有该文件是否重新下载。默认为0(直接打开文件)，为1时重新下载文件并且重命名。
            reDownloaded: 0,
            // 是否下载后打开，为1为默认打开,不传则根据配置文件而定
            // 仅在后台静默下载时有用
            // openAfterComplete: 1,
            // 是否在后台下载，如果是，则静默后台下载，否则会专门跳到一个下载页面
            isBackground: 1
        }
    }, {
        namespace: 'playVideo',
        os: ['ejs'],
        defaultParams: {
            // 视频地址
            videoUrl: ''
        }
    }, {
        namespace: 'selectImage',
        os: ['ejs'],
        defaultParams: {
            // 图片数量
            photoCount: 9,
            // 是否允许拍照，1：允许；0：不允许
            showCamera: 0,
            // 是否显示gif图片，1：显示；0：不显示
            showGif: 0,
            // 是否允许预览，1：允许，0：不允许
            previewEnabled: 1,
            // 已选图片，json数组格式，item为元素本地地址
            selectedPhotos: []
        }
    }, {
        namespace: 'selectFile',
        os: ['ejs'],
        defaultParams: {
            // 文件数量
            count: 9
        }
    }, {
        namespace: 'prevImage',
        os: ['ejs'],
        defaultParams: {
            // 默认显示图片序号
            index: 0,
            // 是否显示删除按钮，1：显示，0：不显示，默认不显示。如果显示按钮则自动注册回调事件。
            showDeleteButton: 0,
            // 图片地址，json数组格式，item为元素本地地址
            selectedPhotos: []
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'text');
            var selectedPhotos = args[0].selectedPhotos;

            for (var i = 0, len = selectedPhotos.length; i < len; i += 1) {
                args[0].selectedPhotos[i] = innerUtil.getFullPath(selectedPhotos[i]);
            }

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'cameraImage',
        os: ['ejs'],
        defaultParams: {
            // 宽度
            width: 720,
            // 压缩质量
            quality: 70
        }
    }, {
        namespace: 'recordVideo',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            // 最大时长，单位为秒
            maxDuration: 120,
            className: ejs.os.android ? 'com.epoint.baseapp.component.media.ShootActivity' : 'EPTVideoRecordViewController'
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = rest;

            args[0].className = args[0].className;
            args[0].data = {
                maxDuration: args[0].maxDuration
            };

            ejs.page.openLocal.apply(this, args);
        }
    }, {
        namespace: 'getPreviewUrl',
        os: ['ejs']
    }, {
        namespace: 'openFile',
        os: ['ejs'],
        defaultParams: {
            path: ''
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'path');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'goSearch',
        os: ['ejs'],
        defaultParams: {
            searchType: '',
            conditions: ''
        }
    }, {
        namespace: 'createQRCode',
        os: ['ejs'],
        support: '3.1.8',
        defaultParams: {
            qrCodeStr: '',
            size: 200
        }
    }, {
        namespace: 'recognizeQRCode',
        os: ['ejs'],
        support: '3.1.8',
        defaultParams: {
            imgPath: '',
            imgBase64: ''
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = rest;
            var imgBase64 = args[0].imgBase64;

            args[0].imgBase64 = imgBase64 ? innerUtil.getBase64NotUrl(imgBase64) : '';

            hybridJs.callInner.apply(this, rest);
        }
    }, {
        namespace: 'invokePluginApi',
        os: ['ejs'],
        support: '3.2.0',
        defaultParams: {
            path: '',
            dataMap: ''
        }
    }, {
        namespace: 'encrypt',
        os: ['ejs'],
        support: '3.2.3',
        defaultParams: {
            text: ''
        }
    }]);
}

function streamMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('stream', [{
        namespace: 'fetch',
        os: ['ejs'],
        defaultParams: {
            url: '',
            method: 'POST',
            // json text
            type: 'json',
            body: '',
            // 有一些默认的头部信息
            headers: {
                // application/json
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;
            var options = args[0];

            options.dataFilter = function (res) {
                var result = res.result;

                if (options.type.toLowerCase() === 'json' && typeof result.data === 'string') {
                    try {
                        result.data = JSON.parse(result.data);
                    } catch (e) {}
                }

                return res;
            };

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        // 标准的框架附件上传方案，token由原始内部处理
        // 只能处理标准的框架接口
        namespace: 'uploadFile',
        os: ['ejs'],
        defaultParams: {
            // 标准上传只支持一个文件接一个的上传
            path: '',
            clientGuid: '',
            clientInfo: '',
            clientTag: '',
            documentType: '',
            attachFileName: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;
            var options = args[0];

            // 自动处理fileName，根据路径提取
            if (!options.documentType) {
                var pathMatch = options.path.match(/([.][^.]+)$/);

                options.documentType = pathMatch && pathMatch[1] || '';
            }

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }, {
        // 标准的文件上传，可以上传多个文件
        // 自己传headers和额外参数
        namespace: 'uploadMultipartFile',
        os: ['ejs'],
        defaultParams: {
            url: '',
            // 有一些默认的头部信息
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            file: {
                name: '',
                path: '',
                mediaType: '',
                fileName: ''
            },
            // 额外的表单数据
            dataForm: {}
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;
            var options = args[0];

            // 自动处理fileName，根据路径提取
            if (!options.file.fileName) {
                var pathMatch = options.file.path.match(/[/]([^/]+)$/);

                options.file.fileName = pathMatch && pathMatch[1] || '';
            }

            args[0] = options;
            hybridJs.callInner.apply(this, args);
        }
    }]);
}

function contactMixin(hybrid) {
    var hybridJs = hybrid;

    // contact是底层用的openLocal
    hybridJs.extendModule('contact', [{
        namespace: 'choose',
        os: ['ejs'],
        defaultParams: {
            // 已选人员的用户guid列表
            userguids: [],
            className: ejs.os.android ? 'com.epoint.baseapp.component.chooseperson.PersonChooseActivity' : 'WPLPersonnelSelectViewController'
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = rest;

            args[0].className = args[0].className;
            args[0].data = {
                userguids: args[0].userguids
            };

            ejs.page.openLocal.apply(this, args);
        }
    }]);
}

function audioMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('audio', [{
        namespace: 'startRecord',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            maxDuration: 120
        }
    }, {
        namespace: 'stopRecord',
        os: ['ejs'],
        support: '3.1.2'
    }, {
        namespace: 'cancelRecord',
        os: ['ejs'],
        support: '3.1.2'
    }, {
        namespace: 'startPlay',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            path: ''
        }
    }, {
        namespace: 'stopPlay',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            path: ''
        }
    }]);
}

function ioMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('io', [{
        namespace: 'downloadFile',
        os: ['ejs'],
        // 支持的最小版本，可以等于，Android，iOS通用
        support: '3.1.2',
        defaultParams: {
            // 下载地址
            url: '',
            // 文件名。必填。
            fileName: '',
            // 下载分类。默认为(其他分类)。推荐传对应的模块名称。例如邮件(MAIL)。如果没有"附件管理"模块，可忽略该参数。
            type: '',
            //  如果本地已有该文件是否重新下载。默认为0(直接打开文件)，为1时重新下载文件并且重命名。
            reDownloaded: 0,
            // 是否下载后打开，为1为默认打开,不传则根据配置文件而定
            // 仅在后台静默下载时有用
            // openAfterComplete: 1,
            // 是否在后台下载，如果是，则静默后台下载，否则会专门跳到一个下载页面
            isBackground: 1
        }
    }, {
        namespace: 'selectFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            // 文件数量
            count: 9
        }
    }, {
        namespace: 'openFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            path: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'path');

            hybridJs.callInner.apply(this, args);
        }
    }, {
        namespace: 'renameFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            path: '',
            // 如果仅仅是想重命名名字，传newName即可
            newName: '',
            // 如果想要重命名后缀，传后缀就可以了，没有后缀请不要传
            newSuffix: undefined
        }
    }, {
        namespace: 'copyFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            path: '',
            // 新的路径
            newPath: ''
        }
    }, {
        namespace: 'deleteFile',
        os: ['ejs'],
        support: '3.1.2',
        defaultParams: {
            path: ''
        }
    }, {
        namespace: 'getFileSize',
        os: ['ejs'],
        support: '3.1.7',
        defaultParams: {
            path: ''
        }
    }, {
        namespace: 'screenShot',
        os: ['ejs'],
        support: '3.2.5a',
        defaultParams: {
            captureType: 1
        }
    }]);
}

var hybridJs = window.ejs;

uiMixin(hybridJs);
authMixin(hybridJs);
runtimeMixin(hybridJs);
deviceMixin(hybridJs);
eventMixin(hybridJs);
storageMixin(hybridJs);
cardMixin(hybridJs);
pageMixin(hybridJs);
navigatorMixin(hybridJs);
utilMixin(hybridJs);
streamMixin(hybridJs);
contactMixin(hybridJs);
audioMixin(hybridJs);
ioMixin(hybridJs);

})));
