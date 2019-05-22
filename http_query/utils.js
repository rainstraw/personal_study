var crypto = require('crypto');

let utils = {};

utils.deepCopy = function(obj){
  let ret = {};
  for(let k in obj){
    let v = obj[k]
    if(typeof v === 'object'){
      ret[k] = utils.deepCopy(v);
    }
    else{
      ret[k] = v;
    }
  }
  return ret;
}

utils.parseURL = function(url) {
  let isHttps = false;
  let arr = url.split('://');
  url = arr[arr.length-1];
  if(arr.length > 1 && arr[0] === 'https') {
    isHttps = true;
  }
  let index = url.indexOf('/');
  let hostname = url.slice(0, index);
  path = url.slice(index);
  return {isHttps, hostname, path}
}

utils.createMd5 = function (text) {
  var hasher = crypto.createHash("md5");
  hasher.update(text);
  var hashmsg = hasher.digest('hex');
  return hashmsg;
};

module.exports = utils;