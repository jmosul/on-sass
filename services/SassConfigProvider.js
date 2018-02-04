class SassConfigProvider {

  constructor(){
    this.entities = {
      // add your config sources here
    };
  }

  get config() {
    return this.entity ? this.entities[this.entity] : {};
  }

  get entity(){
    return this.currentEntity || undefined;
  }

  set entity(entity){
    this.currentEntity = entity;
  }

  hasEntity(entity){
    return (this.entities[entity]);
  }
}

module.exports = new SassConfigProvider();