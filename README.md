# on-sass

Sass On Demand nodejs api

Import your other repos via `npm install` and generate your CSS from SCSS on demand injecting any custom SASS variables

Example, replace your primary and secondary colours via the url: 
```
http://style.my-domain.com/project-name?primary-color=red&secondary-color=blue
```

## Instructions

1. Download/Fork your own copy of this repo

2. Include the SCSS files of your project, recommend bringing this in via `npm`

3. Create the following `on-sass.json` file.  I personally add this config file to root directory of the projects I bring in via npm.
```
{
  "title": "My Project",
  "files":[
    // scss files to include, this should be relative to the location of this config file
  ],
  "custom_defaults": {
    // variables which are available to change and their default value, i.e:
    "primary-color": green,
    "secondary-color": black,
  },
  "fixed_vars":{
    // list of other variables 
  }
}
```

4. Add path to `on-sass.json` into `services/SassConfigProvider.js`

```js
constructor(){
  this.entities = {
    // add your config sources here
    'my-project': require('../node_modules/my-project/on-sass.json')
  };
}
```

5. Start server (`npm start`)

And you're done, you can reach the CSS from the url:

`http://localhost:3000/my-project`

### Redis
On-Sass support Redis caching. This will cache resulting CSS under a key made from a hashed version of the request.
This means the same requests will return the same css without recompiling.

To use redis include a `.env` with your Redis details.  (This following is a copy of the `.env.example`)
```.env
REDIS_ENABLED=
REDIS_HOST=localhost
REDIS_PORT=6380
REDIS_PREFIX=onsass
```
