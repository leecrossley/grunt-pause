var pause = require("./grunt-pause.js");
module.exports = function (grunt) {
    pause.init(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: ["*.js"]
        }
    });
    grunt.task.registerTask("run", "runs a task that lasts the designated number of ms", function (ms) {
        var done = this.async();
        setTimeout(function() {
            grunt.log.writeln( ms + "ms task ran");
            done();
        }, parseInt(ms, 10));
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("default", ["jshint", "run:100", "run:500", "run:1000"]);
};