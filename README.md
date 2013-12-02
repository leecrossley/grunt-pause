# grunt-pause [![Dependency Status](https://david-dm.org/leecrossley/grunt-pause.png)](https://david-dm.org/leecrossley/grunt-pause) [![devDependency Status](https://david-dm.org/leecrossley/grunt-pause/dev-status.png)](https://david-dm.org/leecrossley/grunt-pause#info=devDependencies)

### **WIP**

**grunt-pause allows you to pause the grunt task runner between tasks**

## Getting started

### Install grunt-pause

```
npm install grunt-pause ## --save-dev
```

### Upgrade your Gruntfile.js

Add the grunt-pause reference to the very top of your Gruntfile.js:

```
var pause = require("grunt-pause");
```

Add the pause init call at the top of the module.exports function:

```
module.exports = function (grunt) {
    pause.init(grunt);
```