//解析查询字符串
export function queryParse(str) {
    if (!str) return {};
    let strParams = decodeURIComponent(str).split('?')[1];
    let paramsObj = {};
    strParams.split('&').forEach((item) => {
        let arrParams = item.split('=');
        paramsObj[arrParams[0]] = arrParams[1];
    });
    return paramsObj;
}

//拼接查询字符串
export function splicingQuery(path, paramsObj = {}) {
    let paramsArr = Object.keys(paramsObj);
    if (paramsArr.length === 0) return path;
    let splicingPath = '';
    for (let i = 0; i < paramsArr.length; i++) {
        splicingPath +=
            paramsArr[i] +
            '=' +
            (paramsObj[paramsArr[i]] ?? '') +
            (i !== paramsArr.length - 1 ? '&' : '');
    }
    return path + '?' + encodeURIComponent(splicingPath);
}

/**
 * 防抖函数
 * @param  {function} method      回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   是否立即执行
 * @return {function}             返回客户调用函数
 */
export function debounce(method, wait = 300, immediate = false) {
    let timer, context, args;
    const later = () =>
        setTimeout(() => {
            timer = null;
            if (!immediate) {
                method.apply(context, args);
                context = args = null;
            }
        }, wait);
    return function (...params) {
        if (!timer) {
            timer = later();
            if (immediate) {
                method.apply(this, params);
            } else {
                context = this;
                args = params;
            }
        } else {
            clearTimeout(timer);
            timer = later();
        }
    };
}

/**
 * 节流函数
 * @param method
 * @param delay 延迟执行，只执行最后一次
 * @param duration 间隔时间
 * @param context
 */
export function throttle(method, delay, duration = 0, context = '') {
    let timer;
    let begin = new Date().getTime();
    return function (...args) {
        const current = new Date().getTime();
        clearTimeout(timer);
        if (duration) {
            if (current - begin > duration) {
                method.apply(context || this, args);
                begin = current;
                return;
            }
        }
        timer = setTimeout(function () {
            method.apply(context || this, args);
        }, delay);
    };
}

/**
 * 获得当前年月日时分秒
 * @returns
 */
export function getCurrentTime() {
    var date = new Date();
    var seperator1 = '-';
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    if (hour >= 0 && hour <= 9) {
        hour = '0' + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = '0' + minute;
    }
    if (second >= 0 && second <= 9) {
        second = '0' + second;
    }
    var currentdate =
        '' +
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second;
    return currentdate;
}
