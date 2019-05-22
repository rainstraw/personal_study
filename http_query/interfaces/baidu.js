const HttpBuilder = require('../http_builder');
const utils = require('../utils');

//百度搜索
//http://www.baidu.com/s?wd=舟山市第二人民医院&pn=0&rn=50&tn=json
const baiduSearch = async function(word) {
  const builder = new HttpBuilder();
  builder.hostName('www.baidu.com');
  builder.path('/s');
  builder.args({
    wd: encodeURIComponent(word),
    pn: 0,
    rn: 10,
    tn: 'json'
  });
  let data = null;
  try {
    data = await builder.build();
    data = JSON.parse(data);
  }
  catch(e) {
    console.log('catch an error', e);
  }
  return data;
}

//百度地图转经纬度
//http://api.map.baidu.com/geocoder/v2/?address=北京市海淀区上地十街10号&output=json&ak=您的ak //坐标转换
const ak = 'yourak';
const sk = 'yoursk';
const baiduMap2Geo = async function(pName) {
  const builder = new HttpBuilder();
  builder.method('GET');
  builder.hostName('api.map.baidu.com');

  let path = `/geocoder/v2/?address=${encodeURIComponent(pName)}&output=json&ak=${ak}`;
  let rawStar = path + sk;
  path += '&sn=' + utils.createMd5(encodeURIComponent(rawStar));
  builder.path(path);
  let data = null;
  try {
    data = await builder.build();
  }
  catch(e) {
    console.log('catch an error', e);
  }
  return data;
}

//百度地图查询
//http://api.map.baidu.com/place/v2/search?query=ATM机&tag=银行&region=北京&output=json&ak=您的ak //GET请
const baiduMapSearch = async function(pName) {
  const builder = new HttpBuilder();
  builder.method('GET');
  builder.hostName('api.map.baidu.com');

  let path = `/place/v2/search?query=${encodeURIComponent(pName)}&region=${encodeURIComponent('北京')}&ak=${ak}`;
  let rawStar = path + sk;
  path += '&sn=' + utils.createMd5(encodeURIComponent(rawStar));
  builder.path(path);
  let data = null;
  try {
    data = await builder.build();
  }
  catch(e) {
    console.log('catch an error', e);
  }
  return data;
}

module.exports = {
  baiduSearch,
  baiduMap2Geo,
  baiduMapSearch
}