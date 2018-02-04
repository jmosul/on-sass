const each = require('foreach'),
  sass = require('node-sass'),
  sassGenerator = require('./SassGenerator');

class SassCompiler {
  /**
   * @param {string} id
   * @param {Object} projectConfig
   */
  constructor(id, projectConfig) {
    this.id = id;
    this.config = projectConfig;
  }

  /**
   * @param {object} config
   */
  set config(config) {
    this.name = config.name;
    this.customVars = config.custom_defaults || {};
    this.fixedVars = config.fixed_vars || {};

    this.sassOptionsDefaults = {
      includePaths: config.files.map(file => __dirname + `/../node_modules/${this.id}/${file}`),
      outputStyle: 'compressed'
    };
  }

  /**
   * @param {string} name
   * @param {string|number} value
   */
  setVariable(name, value) {


    if(this.customVars[name] !== undefined) {
      this.customVars[name] = value;
    }
  }

  /**
   * @return {{includePaths: string[], outputStyle: string}}
   */
  get sassOptions() {
    let data =
      sassGenerator.sassVariables(this.sassVariables)
      + sassGenerator.sassImport(this.scssFile)
    ;

    return Object.assign({}, this.sassOptionsDefaults, { data });
  }

  get scssFile() {
    return this.sassOptionsDefaults.includePaths[0];
  }

  /**
   * @return {object}
   */
  get sassVariables() {
    let variables = {};

    each(this.customVars, (value, name) => {
      variables[name] = this._parseValue(value);
    });

    each(this.fixedVars, (value, name) => {
      variables[name] = this._parseValue(value);
    });

    return variables;
  }

  _parseValue(value) {
    if(typeof value === 'string'){
      let hasHex = value.search(/\b[0-9A-F]{6}\b/gi);

      if(hasHex > -1){
        value = [value.slice(0, hasHex), '#', value.slice(hasHex)].join('');
        value = value.replace('##', '#');
      }
    }

    return value;
  }

  buildSass(callback, errorCallback) {
    sass.render(this.sassOptions,
      (error, result) => error ? errorCallback(error) : callback(result.css.toString())
    );
  }
}

module.exports = SassCompiler;