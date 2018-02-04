class NoCacheClient {

  get(key, callback){
    console.log(key);

    return callback(null, null);
  }

  set(key, css){
    return true;
  }
}

module.exports = NoCacheClient;