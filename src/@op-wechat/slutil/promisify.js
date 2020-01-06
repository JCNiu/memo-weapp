/**
 * promisify 
 * @param {*} fn 
 * @param {*} resolveAndRejectMap  resolve,reject对应方法映射;例如 { "resolve": success, "reject": fail }
 */
let promisify = (fn, resolveAndRejectMap) => {
  resolveAndRejectMap = resolveAndRejectMap || {};
  let resolveAs = resolveAndRejectMap.resolve;
  let rejectAs = resolveAndRejectMap.reject;
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      let methodOp = {};
      methodOp[resolveAs] = resolve;
      methodOp[rejectAs] = reject;
      fn(Object.assign({}, options, methodOp), ...params);
    });
  }
}

/**
 * http promise
 * @param {*} requestFn 
 */
let promisifyHttp = (requestFn) => {
  return promisify(requestFn, {
    "resolve": "success",
    "reject": "fail"
  });
}

let SlPromise = {
  create: function() {
    return new Promise();
  }
}

module.exports = {
  SlPromise,
  promisify,
  promisifyHttp
};