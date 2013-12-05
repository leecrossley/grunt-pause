# grunt-pause [![Dependency Status](https://david-dm.org/leecrossley/grunt-pause.png)](https://david-dm.org/leecrossley/grunt-pause) [![devDependency Status](https://david-dm.org/leecrossley/grunt-pause/dev-status.png)](https://david-dm.org/leecrossley/grunt-pause#info=devDependencies)

**grunt-pause allows you to pause the grunt task runner between tasks. You can then choose whether or not to continue running the remaining tasks or clear the task queue.**

![grunt-pause console](https://raw.github.com/leecrossley/grunt-pause/master/grunt-pause.png)

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

## License

[MIT License](http://ilee.mit-license.org)
