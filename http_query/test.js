const {baiduSearch, baiduMap2Geo, baiduMapSearch} = require('./interfaces/baidu');

const test = async function(){
  let data = await baiduMap2Geo('北京市海淀区上地十街10号');
  console.log(data, '---')
}

test();