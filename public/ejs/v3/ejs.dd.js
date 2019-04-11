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
}(this, (function () { 'use strict';

function callDDByArgs(args, api) {
    var options = args[0];
    var resolve = args[1];
    var reject = args[2];

    options.onSuccess = function (result) {
        var newResult = result;

        if (options.dataFilter) {
            newResult = options.dataFilter(result);
        }

        options.success && options.success(newResult);
        resolve && resolve(newResult);
    };
    options.onFail = function (error) {
        options.error && options.error(error);
        reject && reject(error);
    };

    api(options);
}

function uiMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('ui', [{
        namespace: 'toast',
        os: ['dd'],
        defaultParams: {
            message: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

            // 有参数形式不一样，需要重新定义
            args[0] = innerUtil.extend(args[0], {
                // icon样式，有success和error，默认为空 0.0.2
                icon: '',
                // 提示信息
                text: args[0].message,
                // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                duration: 2,
                // 延迟显示，单位秒，默认0
                delay: 0
            });

            callDDByArgs(args, dd.device.notification.toast);
        }
    }, {
        namespace: 'alert',
        os: ['dd'],
        defaultParams: {
            title: '',
            message: '',
            buttonName: '确定'
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message', 'title', 'buttonName');

            // 参数形式一样，无需重新定义
            callDDByArgs(args, dd.device.notification.alert);
        }
    }, {
        namespace: 'confirm',
        os: ['dd'],
        defaultParams: {
            title: '',
            message: '',
            buttonLabels: ['取消', '确定']
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;

            args[0].dataFilter = function (result) {
                return {
                    which: result.buttonIndex
                };
            };

            // 参数形式一样，无需重新定义
            callDDByArgs(args, dd.device.notification.confirm);
        }
    }, {
        namespace: 'prompt',
        os: ['dd'],
        defaultParams: {
            title: '',
            text: '',
            hint: '',
            lines: 1,
            maxLength: 10000,
            buttonLabels: ['取消', '确定']
        },
        runCode: function runCode() {
            for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                rest[_key4] = arguments[_key4];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                message: args[0].text,
                defaultText: args[0].hint
            });

            args[0].dataFilter = function (result) {
                return {
                    which: result.buttonIndex,
                    content: result.value
                };
            };

            // 参数形式一样，无需重新定义
            callDDByArgs(args, dd.device.notification.prompt);
        }
    }, {
        namespace: 'showWaiting',
        os: ['dd'],
        defaultParams: {
            message: ''
        },
        runCode: function runCode() {
            for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                rest[_key5] = arguments[_key5];
            }

            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'message');

            args[0] = innerUtil.extend(args[0], {
                // 提示信息
                text: args[0].message,
                showIcon: true
            });

            callDDByArgs(args, dd.device.notification.showPreloader);
        }
    }, {
        namespace: 'closeWaiting',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len6 = arguments.length, rest = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                rest[_key6] = arguments[_key6];
            }

            callDDByArgs(rest, dd.device.notification.hidePreloader);
        }
    }, {
        namespace: 'actionSheet',
        os: ['dd'],
        defaultParams: {
            title: '',
            items: []
        },
        runCode: function runCode() {
            for (var _len7 = arguments.length, rest = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                rest[_key7] = arguments[_key7];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                cancelButton: '取消',
                otherButtons: args[0].items
            });

            var originalItems = args[0].items;

            args[0].dataFilter = function (result) {
                return {
                    which: result.buttonIndex,
                    content: originalItems[result.buttonIndex]
                };
            };

            callDDByArgs(args, dd.device.notification.actionSheet);
        }
    }, {
        namespace: 'pickDate',
        os: ['dd'],
        defaultParams: {
            // 部分设备上设置标题后遮挡控件可不设置标题
            title: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd。
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len8 = arguments.length, rest = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                rest[_key8] = arguments[_key8];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                format: 'yyyy-MM-dd',
                value: args[0].datetime
            });

            args[0].dataFilter = function (result) {
                return {
                    date: result.value
                };
            };

            callDDByArgs(args, dd.biz.util.datepicker);
        }
    }, {
        namespace: 'pickTime',
        os: ['dd'],
        defaultParams: {
            // 部分设备上设置标题后遮挡控件可不设置标题
            title: '',
            // 默认为空为使用当前时间
            // 格式为 HH:mm
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len9 = arguments.length, rest = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                rest[_key9] = arguments[_key9];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                format: 'HH:mm',
                value: args[0].datetime
            });

            args[0].dataFilter = function (result) {
                return {
                    time: result.value
                };
            };

            callDDByArgs(args, dd.biz.util.timepicker);
        }
    }, {
        namespace: 'pickDateTime',
        os: ['dd'],
        defaultParams: {
            title1: '',
            title2: '',
            // 默认为空为使用当前时间
            // 格式为 yyyy-MM-dd HH:mm
            datetime: ''
        },
        runCode: function runCode() {
            for (var _len10 = arguments.length, rest = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                rest[_key10] = arguments[_key10];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                format: 'yyyy-MM-dd HH:mm',
                value: args[0].datetime
            });

            args[0].dataFilter = function (result) {
                return {
                    datetime: result.value
                };
            };

            callDDByArgs(args, dd.biz.util.datetimepicker);
        }
    }]);
}

function deviceMixin(hybrid) {
    var hybridJs = hybrid;

    hybridJs.extendModule('device', [{
        namespace: 'getDeviceId',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;

            args[0].dataFilter = function (result) {
                return {
                    deviceId: result.uuid
                };
            };

            callDDByArgs(args, dd.device.base.getUUID);
        }
    }, {
        namespace: 'vibrate',
        os: ['dd'],
        defaultParams: {
            duration: 500
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            callDDByArgs(rest, dd.device.notification.vibrate);
        }
    }, {
        namespace: 'getNetWorkInfo',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            var args = rest;
            var netTypeMap = {
                wifi: 1,
                '2g': 0,
                '3g': 0,
                '4g': 0,
                unknown: -1,
                none: -1
            };

            args[0].dataFilter = function (result) {
                return {
                    // 保留原来状态
                    result: result.result,
                    netWorkType: netTypeMap[result.result]
                };
            };

            callDDByArgs(args, dd.device.connection.getNetworkType);
        }
    }]);
}

function pageMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('page', [{
        namespace: 'open',
        os: ['dd'],
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

            var args = rest;
            var options = args[0];

            // 将额外数据拼接到url中
            options.url = innerUtil.getFullUrlByParams(options.pageUrl, options.data);
            // 去除无用参数的干扰
            options.data = undefined;
            args[0] = options;

            callDDByArgs(args, dd.biz.util.openLink);
        }
    }, {
        namespace: 'close',
        os: ['dd'],
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            callDDByArgs(rest, dd.biz.navigation.close);
        }
    }]);
}

function navigatorMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('navigator', [{
        namespace: 'setTitle',
        os: ['dd'],
        defaultParams: {
            title: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            // 兼容字符串形式
            var args = innerUtil.compatibleStringParamsToObject.call(this, rest, 'title');

            callDDByArgs(args, dd.biz.navigation.setTitle);
        }
    }, {
        namespace: 'setRightBtn',
        os: ['dd'],
        defaultParams: {
            text: '',
            imageUrl: '',
            isShow: 1
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                control: true,
                show: args[0].isShow
            });

            callDDByArgs(args, dd.biz.navigation.setRight);
        }
    }, {
        namespace: 'setRightMenu',
        os: ['dd'],
        defaultParams: {
            text: '',
            imageUrl: '',
            // 过滤色默认为空
            iconFilterColor: '',
            // 点击后出现的菜单列表，这个API会覆盖rightBtn
            titleItems: [],
            iconItems: [],
            // 钉钉中的参数
            backgroundColor: '#ADD8E6',
            textColor: '#ADD8E611'
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            // 兼容字符串形式
            var args = rest;
            var titleItems = args[0].titleItems;
            var iconItems = args[0].iconItems;
            var items = [];

            for (var i = 0, len = titleItems.length; i < len; i += 1) {
                items.push({
                    id: i + 1,
                    text: titleItems[i],
                    iconId: iconItems[i]
                });
            }

            args[0] = innerUtil.extend(args[0], {
                items: items
            });

            callDDByArgs(args, dd.biz.navigation.setMenu);
        }
    }]);
}

function runtimeMixin(hybrid) {
    var hybridJs = hybrid;
    var innerUtil = hybridJs.innerUtil;

    hybridJs.extendModule('runtime', [{
        namespace: 'launchApp',
        os: ['dd'],
        defaultParams: {
            // android应用的包名
            packageName: '',
            // android应用页面类名
            className: '',
            // 页面配置的Scheme名字，适用于Android与iOS
            scheme: ''
        },
        runCode: function runCode() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            var args = rest;

            args[0] = innerUtil.extend(args[0], {
                app: ejs.os.android ? args[0].packageName : args[0].scheme,
                activity: args[0].className
            });

            callDDByArgs(args, dd.device.launcher.launchApp);
        }
    }, {
        namespace: 'clipboard',
        os: ['dd'],
        defaultParams: {
            text: ''
        },
        runCode: function runCode() {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            callDDByArgs(rest, dd.biz.clipboardData.setData);
        }
    }, {
        namespace: 'getGeolocation',
        os: ['dd'],
        defaultParams: {
            isShowDetail: 0,
            targetAccuracy: 1000,
            coordinate: 1,
            useCache: true,
            withReGeocode: false
        },
        runCode: function runCode() {
            for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                rest[_key3] = arguments[_key3];
            }

            callDDByArgs(rest, dd.device.geolocation.get);
        }
    }]);
}

var hybridJs = window.ejs;

uiMixin(hybridJs);
deviceMixin(hybridJs);
pageMixin(hybridJs);
navigatorMixin(hybridJs);
runtimeMixin(hybridJs);

})));
