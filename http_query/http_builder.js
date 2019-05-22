const {getHttp, postHttp} = require('./http_wrap');

const METHODS = ['GET', 'POST'];

class HttpBuilder {
  constructor(){
    this._method = 'GET';
    this._useHttps = false;
    this._path = '/';
    this._options = {}; 
    this._headers = {};
    this._args = {};
  }

  method(m) {
    this._method = m;
  }

  useHttps() {
    this._useHttps = true;
  }

  path(p) {
    this._path = p;
  }

  hostName(hn) {
    this._options.hostname = hn;
  }

  host(h) {
    this._options.host = h;
  }

  port(p) {
    this._options.port = p;
  }

  option(k, v) {
    this._options[k] = v;
  }

  options(ops){
    for(let k in ops) {
      this._options[k] = ops[k];
    }
  }

  header(k, v){
    this._headers[k] = v;
  }

  headers(hds){
    for(let k in hds) {
      this._headers[k] = hds[k];
    }
  }

  cookie(k, v){
    this._headers["Cookie"] = this.headers["Cookie"] || '';
    this._headers["Cookie"] += `${k}=${v}; `;
  }

  arg(k, v) {
    this._args[k] = v;
  }

  args(ags){
    for(let k in ags) {
      this._args[k] = ags[k];
    }
  }

  check() {
    if(METHODS.indexOf(this._method) === -1){
      throw('metho not support!!!');
    }
    if(!!this._options.hostname && (this._options.host || this._options.port)){
      throw('duplicate hostname and host or port!!!');
    }
    if(!this._options.hostname && !(this._options.host && this._options.port)){
      throw('not enough params to address!!!')
    }
  }

  build() {
    this.check();
    let op = this._method === 'GET' ? getHttp : postHttp;
    return op(this._options, this._path, this._args, this._headers, this._useHttps);
  }
  
}

module.exports = HttpBuilder;