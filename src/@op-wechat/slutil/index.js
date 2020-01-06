/**
 * 工具类引入接口,不实现具体方法
 */
var array = require('./array');
var date = require('./date');
var format = require('./format');
var num = require('./num');
var obj = require('./obj');
var promisify = require('./promisify');
var string = require('./string');
var validate = require('./validate');
var wxTool = require('./wx-tool');
var tool = require('./tool');
var http = require('./http');
var urlTool = require('./url-tool');


module.exports = { 
  array,
  date, 
  format, 
  num, 
  obj, 
  promisify, 
  string, 
  validate, 
  ...wxTool,
  ...tool,
  ...http,
  ...urlTool,
};