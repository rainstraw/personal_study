const http = require('http');
const https = require('https');
const utils = require('./utils');

const EMPTY = {};

const getHttp = function(options, path, args, headers, useHttps){
  let agent = useHttps ? https : http;
  let op = utils.deepCopy(options);
  for(let k in headers || EMPTY){
    op.headers[k] = headers[k];
  }
  op.method = 'GET';
  let argArr = [];
  for(let k in args || EMPTY){
    argArr.push(`${k}=${args[k]}`);
  }
  if(argArr.length > 0) {
    path = path + '?' + argArr.join('&');
  }
  op.path = path;
  console.log('op------------', op);
  return new Promise(function(resolve, reject){
    let chunks = [];
    let req = agent.request(op, (res)=>{
      res.on('error', function(err){
        reject(err);
      });
      res.on('data', function(chunk){
        chunks.push(chunk);
      });
      res.on('end', function(){
        let data = Buffer.concat(chunks);
        resolve(data.toString());
      });
    });
    req.end();
  });
}

const postHttp = function(options, path, args, headers, useHttps){
  let op = utils.deepCopy(options);
  let agent = useHttps ? https : http;
  for(let k in headers || EMPTY){
    op.headers[k] = headers[k];
  }
  let post_data = JSON.stringify(args);
  op.headers = op.headers || {};
  op.headers["Content-Type"] = 'application/json';
  op.headers["Content-Length"] = Buffer.byteLength(post_data);
  op.method = 'POST';
  op.path = path;
  return new Promise(function(resolve, reject){
    let chunks = [];
    console.log(op, post_data);
    let req = agent.request(op, (res)=>{
      res.on('error', function(err){
        console.log('res.onerror', op.headers);
        reject(err);
      });
      res.on('data', function(chunk){
        chunks.push(chunk);
      });
      res.on('end', function(){
        let data = Buffer.concat(chunks);
        try{
          data = JSON.parse(data);
        }
        catch(e){
          // console.log(data.toString('utf-8'))
          data = data.toString('utf-8');
        }
        resolve(data);
      });
    });
    req.write(post_data);
    req.end();
    req.on('error', function(e){
      console.log('req error------', e);
    });
  });
}

module.exports = {getHttp, postHttp};