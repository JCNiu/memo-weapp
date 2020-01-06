/**
 * url 工具类
 */
let publicApi = {
    
    /**
     * url拼接参数
     * @param {*} param 
     */
    urlMergeParam: function (url, param) {
        if (param == null) return url;
        var paramStr = publicApi.objToUrlParam(param);

  

        if (!paramStr) return url;
        //url没有参数使用?否则使用&
        var prefix = (url.indexOf("?") === -1) ? "?" : "&";
        // console.log("=>url + prefix + paramStr",url + prefix + paramStr);
        return url + prefix + paramStr;
    },

    /**
     * 对象转换url参数
     * @param {*} param 
     */
    objToUrlParam: function (_param, _key) {
        let _objToUrlParam = (param, key) => {
            var encode;
            var _paramStr = "";
            if (param == null) return '';
            var t = typeof (param);
            if (t == 'string' || t == 'number' || t == 'boolean') {
                _paramStr += '&' + key + '=' + (encode ? encodeURIComponent(param) : param);
            } else {
                for (var i in param) {
                    var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                    _paramStr += _objToUrlParam(param[i], k, encode);
                }
            }
            return _paramStr ;
        }
        var paramStr = _objToUrlParam(_param, _key);
        if(paramStr && paramStr.length > 0) return paramStr.substring(1) ;
        return '';
    },
    
    /**
     * 获取url参数
     * - 返回对象
     */
    getUrlParam: function (url) {
        var _param = {};
        if (!url) {
            url = window.location.href;
        }
        var param = url.split("?");
        param = param.length == 1 ? param[0] : param[1];
        param = param.split("&");
        var paraKeyVal;
        for (var index in param) {
            if (!param[index]) {
                continue;
            }
            paraKeyVal = param[index].split("=");
            if (paraKeyVal.length != 2) {
                continue;
            }
            _param[paraKeyVal[0]] = paraKeyVal[1];
        }
        return _param;
    }
}

module.exports = publicApi;