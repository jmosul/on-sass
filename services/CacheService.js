const md5 = require('md5');
const redis = require("redis");
const NoCacheClient = require('./NoCacheClient');

require('dotenv').config();

const cacheClient = process.env.REDIS_ENABLED ? redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX
}) : new NoCacheClient();

class CacheService {

  /**
   * @param client
   */
  constructor(client){
    this.client = client;
  }

  /**
   * @param request
   * @return {Promise}
   */
  getCssFromRequest(request){
    let key = this._getKeyFromRequest(request);

    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => error ? reject(error) : resolve(reply))
    });
  }

  /**
   * @param request
   * @param css
   * @return {*}
   */
  addCssRequest(request, css){
    let key = this._getKeyFromRequest(request);

    return this.client.set(key, css);
  }

  _getKeyFromRequest(request){
    return md5(request.originalUrl);
  }

}

module.exports = new CacheService(cacheClient);