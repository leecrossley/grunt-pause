var inquirer = require("inquirer");

exports = module.exports = (function () {
    var pause = {}, grunt, hooker, task, first = true;

    var showPrompt = function (done) {
        if (first) {
            first = false;
            return done();
        }
        inquirer.prompt([question], function (val) {
            if (!val.continue) {
                grunt.task.clearQueue();
            }
            done();
        });
    };

    var question = {
        type: "confirm",
        name: "continue",
        message: "Continue?"
    };

    pause.init = function (_grunt) {
        grunt = _grunt;
        hooker = grunt.util.hooker;

        grunt.task.registerTask("grunt-pause", "pause prompt", function () {
            var done = this.async();
            showPrompt(done);
        });

        hooker.hook(grunt.log, "header", function () {
            if (grunt.task.current.nameArgs === "grunt-pause") {
                return;
            }
            if (!task) {
                task = grunt.task.current.nameArgs;
            } else if (task !== grunt.task.current.nameArgs) {
                grunt.task.run("grunt-pause");
            }
        });

        process.on("exit", function () {
            hooker.unhook(grunt.log, "header");
        });
    };

    return pause;
})();