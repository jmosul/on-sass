# on-sass

Sass On Demand nodejs api

Import your other repos via `npm install` and generate your CSS from SCSS on demand injecting any custom SASS variables

Example, replace your primary and secondary colours via the url: 
```
http://style.my-domain.com/project-name?primary-color=red&secondary-color=blue
```

Instructions to follow


```
{
  "title": "My Project",
  "files":[
    // scss files to include
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
