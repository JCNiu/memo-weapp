/**
 * 对象管理工具类
 */


let publicApi = {
  /**
   * 避免重复提交的uuid
   * @param len 
   * @returns 
   * @memberof ClassUtil
   */
  avoidDuplicateUuid: function(len) {
    return publicApi.uuid(64);
  },

  uuid: function(len) {
    if (publicApi.notExits(len) || len == 0) {
      len = 16;
    }
    let uuidStr = "";
    while (uuidStr.length < len) {
      uuidStr += Math.random().toString(36).slice(2);
    }
    return uuidStr.slice(0, len);
  },

  /**
   * 判断一个对象是否为数组
   * 
   * @param rows 
   * @returns 
   * @memberof ArrayUtil
   */
  isArray: function(array) {
    if (!array) {
      return false;
    }
    // console.log("===>array.constructor", array.constructor, array.constructor === Array, array.constructor.name);

    return array.constructor && array.constructor.name === "Array";
  },

  /**
   * 判断对象是否是字符串  
   * @param obj 
   */
  isStr: function(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  },

  /**
   * 是否延时执行函数
   * 1. execFun 需要执行的函数
   * 2. isDelayed :是否延时执行 ;true-延时执行,false或其他 - 立即执行
   * 3. delayTime? : 毫秒,延时时间;默认1000
   */
  execFunByDelayed: function(execFun, isDelayed, delayTime) {
    if (!publicApi.isFun(execFun)) {
      console.error("execFunByDelayed error; execFun isn't a function");
      return;
    }
    if (isDelayed === true) {
      //延时执行函数
      if (!publicApi.isInt(delayTime) || delayTime <= 0) {
        delayTime = 1000;
      }
      setTimeout(() => {
        execFun();
      }, delayTime);
    } else {
      execFun();
    }
  },

  /**
   * 复制对象(可以指定某几个属性) 
   * @param origin 源对象
   * @param fields 复制的属性 空的话,则复制所有属性
   * @returns newObject 返回新对象; 如果不存在,则返回null ;
   */
  clone: function(origin, fields) {
    if (!origin || typeof origin !== "object") {
      return null;
    }

    let newObject;
    if (Array.isArray(origin)) {
      //数组复制
      if (origin.length == 0) {
        return origin;
      }
      //
      newObject = [];
      origin.forEach(item => {
        newObject.push(publicApi.clone(item, fields));
      });
      return newObject;
    } else {
      // 时间对象 update on 2018-01-25
      if (origin instanceof Date) {
        newObject = new Date();
        newObject.setTime(origin.getTime());
        return newObject;
      }
      //对象复制; 
      if (!fields || fields.length == 0) {
        //全部属性复制
        // let originProto = Object.getPrototypeOf(origin);
        // return Object.assign({}, Object.create(originProto), origin);
        return JSON.parse(JSON.stringify(origin));
      }

      newObject = {};
      fields.forEach(field => {
        newObject[field] = origin[field];
      });
      return JSON.parse(JSON.stringify(newObject));;
    }
  },

  /**
   * 
   * 获取一个对象忽略属性大小写的值 ;
   * classUtil.keyIgnoreCase(value)
   * @param self - 对象
   * @param key - 属性
   * @returns 返回值
   * 
   */
  keyIgnoreCase: function(self, key) {
    if (typeof self[key] !== "undefined") {
      return;
    }
    for (var orignKey in self) {
      if (orignKey.toUpperCase() == key.toUpperCase()) {
        return self[orignKey];
      }
    }
    return
  },

  /**
   * json 对象转正为字符串
   * @param obj  
   */
  stringify: function(obj) {
    return JSON.stringify(obj);
  },

  /**
   * string 转换为 json对象
   * @param obj  
   */
  parse: function(jsonStr) {
    return JSON.parse(jsonStr);
  },

  /**
   * 判断值是否存在 
   * @param value 
   * @returns undefined,null 返回true; 其它false
   */
  notExits: function(value) {
    return (typeof value === "undefined" || value === null)
  },

  /**
   * 判断是否为函数
   * @param value 
   * @returns 数字型 返回true; 其它false
   */
  isFun: function(functionObj) {
    return (typeof functionObj === "function");
  },

  /**
   * 判断是否boolean 
   * @param value 
   * @returns 数字型 返回true; 其它false
   */
  isBoolean: function(value) {
    return (typeof value === "boolean");
  },

  /**
   * 判断是否为对象
   * 
   * @param object 
   * @returns 
   * @memberof ClassUtil
   */
  isObj: function(object) {
    if (!object) {
      return false;
    }
    return typeof object === "object" && object.toString() == "[object Object]";
  },

  /**
   * 转换为boolean 
   * - null,undefined ,空串, false == false
   * @param value 
   * @param zeroIsTrue -  true - 值为0 返回true; 其它-返回false
   */
  toBoolean: function(value, zeroIsTrue) {
    if (zeroIsTrue === true && value == 0) {
      return true;
    }
    if (value == 'false') return false;
    return new Boolean(value).valueOf();
  },

  /**
   * 空对象判断
   * 数组、无属性都是空对象
   * 
   * @param object 
   * @returns 
   * @memberof ClassUtil
   */
  isEmptyObject: function(object) {
    if (publicApi.isObj(object)) {
      for (let key in object) {
        return false;
      }
    }
    return true;
  },

  /**
   * 替换对象的属性;
   * 例如: originObject = {a: 123,b: 456} replaceKeys(originObject,{a: "x",b: "y"}) 后修改为 {x: 123,y: 456}
   * 
   * @param object 
   * @param attributeNames 
   * @memberof ClassUtil
   */
  replaceKeys: function(object, attributeNames) {
    if (!publicApi.isObj(object) || !publicApi.isObj(attributeNames)) {
      return
    }
    for (let key in object) {
      //相同的key不需要替换
      if (attributeNames[key] != key && attributeNames[key]) {
        object[attributeNames[key]] = object[key];
        delete object[key];
      }
    }
  },

  /**
   * 源对象是否包含目标对象;
   * 1. 仅仅支持一级属性判断
   * @param originObj 
   * @param targetObj 
   * @returns 
   * @memberof ClassUtil
   */
  indexOfObj: function(originObj, targetObj) {
    if (!publicApi.isObj(originObj) || !publicApi.isObj(targetObj)) {
      return false;
    }
    //判断属性是否包含
    if (Object.keys(originObj).join(",").indexOf(Object.keys(targetObj).join(",")) == -1) {
      return false;
    }
    for (let targetKey in targetObj) {
      if (targetObj[targetKey] != originObj[targetKey]) {
        return false;
      }
    }
    return true;
  },

  /**
   * 对象比较
   * 1. isIngoreEmpty - 是否忽略空串,null,undefined,空数组的字符串 ;true-忽略,其它不忽略(默认)仅仅支持一级属性
   * @param obj1 
   * @param obj2 
   * @returns 
   * @memberof ClassUtil
   */
  eqObj: function(obj1, obj2, isIngoreEmpty) {
    if (obj1 == obj2) {
      return true;
    }
    if (!publicApiisObj(obj1) || !publicApi.isObj(obj2)) {
      return false;
    }
    try {
      //过滤空串
      let filterEmptyAttr = (originObj) => {
        let newObj = {};
        for (let key in originObj) {
          // "" == 0 为true ; 空串, undefined,null,空数组过滤掉
          if (!publicApi.notExits(originObj[key]) && originObj[key].length != 0) {
            newObj[key] = originObj[key];
          }
        }
        return newObj;
      };
      if (isIngoreEmpty === true) {
        obj1 = filterEmptyAttr(obj1);
        obj2 = filterEmptyAttr(obj2);
      }
      return JSON.stringify(obj1) == JSON.stringify(obj2);
    } catch (error) {
      return false;
    }
  },

  /**
   * 获取对象的值,通过字符串属性 例如
   * 1. obj['a'].m['b'].persion['b'].n['c'].d.d1.d2.word
   * @param obj 
   * @param strProperty 
   */
  getObjectValueByStrProperty: function(obj, strProperty) {
    if (!publicApi.isObj(obj) || !publicApi.isStr(strProperty)) {
      return null;
    }
    //把.转换为[]
    let _strProperty = strProperty.replace(/\.([^\.\[]+)/g, (match, matchValue, matchIndex, allMatch) => {
      return `['${matchValue}']`;
    });

    //获取值
    let value = obj;
    _strProperty.replace(/\[([^\[\]]+)\]/g, (match, matchValue, matchIndex, allMatch) => {
      if (value) {
        value = value[matchValue.substring(1, matchValue.length - 1)];
      }
      return null;
    });

    return value;
  },

  /**
   * 执行动态函数
   * - objInstance  实例对象
   * - methodStr  执行方法字符串
   * - param 方法参数
   */
  execDynamicFun: function(objInstance, methodStr, ...param) {
    try {
      methodStr = "objInstance." + methodStr;
      var dynamicFn = new Function("objInstance", `return ${methodStr}  ;`);
      return dynamicFn(objInstance)(...param);
    } catch (e) {
      return "EXECDYNAMICFUN-ERROR";
    }
  },

  /**
   * 格式空属性(null/undefind) 
   * - 仅仅支持一级
   * @param obj  
   */
  formatNullField: function(obj) {

    let value;
    if (publicApi.isObj(obj) || publicApi.isArray(obj)) {
      for (var field in obj) {
        value = obj[field];
        if (publicApi.notExits(value)) {
          console.log("==>formatNullField", value, field);
          obj[field] = "";
          continue;
        }
        if (publicApi.isObj(value) || publicApi.isArray(value)) publicApi.formatNullField(value);
      }
    }
  },
}

module.exports = publicApi;