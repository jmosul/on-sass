class SassGenerator {
  /**
   * @param {object} variablesObj
   * @return {string}
   */
  sassVariables(variablesObj) {
    return Object.keys(variablesObj).map(name => this._sassVariable(name, variablesObj[name])).join('\n');
  }

  /**
   * @param {string} path
   * @return {string}
   */
  sassImport(path) {
    return "@import '" + path + "';";
  }

  /**
   * @param {string} name
   * @param {string} value
   * @return {string}
   * @private
   */
  _sassVariable(name, value) {
    return "$" + name + ": " + value + ";";
  }
}

module.exports = new SassGenerator();