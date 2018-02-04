const configProvider = require('../services/SassConfigProvider');
const SassCompiler = require('../services/SassCompiler');
const each = require('foreach');
const cacheService = require('../services/CacheService');

class OnSassController {

  constructor(request, response, next){
    this.request = request;
    this.response = response;
    this.next = next;
  }

  handleRequest(){
    this.response.set({
      'Content-Type': 'text/css',
    });

    cacheService.getCssFromRequest(this.request).then(
      cachedCss => cachedCss ? this.response.send(cachedCss) : this.handleCompileScss(),
      error => this.handleCompileScss()
    );
  }

  handleCompileScss(){
    const compiler = new SassCompiler(this.request.params.entity, configProvider.config);

    each(this.request.query, (value, name) => compiler.setVariable(name, value));

    compiler.buildSass(
      css => {
        cacheService.addCssRequest(this.request, css);

        return this.response.send(css);
      },
      // TODO: on error return dist version from package
      error => console.log(error)
    );
  }

  /**
   * @param {int} status
   * @param {string} message
   */
  handleError(status = 500, message){
    if(!message){
      switch(status){
        case 400:
          message = "Bad Request";
          break;

        case 404:
          message = "Not Found";
          break;

        case 500:
        default:
          message = 'General Error';
      }
    }

    let error = new Error(message);
    error.status = status;

    this.next(error);
  }
}

module.exports = OnSassController;