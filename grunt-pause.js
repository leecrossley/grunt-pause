var inquirer = require("inquirer");

exports = module.exports = (function () {
    var pause = {}, grunt, hooker, task, first = true;

    var showPrompt = function (callback) {
        if (first) {
            first = false;
            return;
        }
        inquirer.prompt([question], function (val) {
            if (val.toLowerCase() === "n") {
                grunt.task.clearQueue();
            }
        });
    };

    var validate = function (input) {
        var done = this.async();
        setTimeout(function() {
            if (input.toLowerCase() === "y") {
                done();
                return;
            }
            done("Break");
        }, 10);
    };

    var question = {
        type: "confirm",
        name: "continue",
        message: "Continue?",
        validate: validate
    };

    pause.init = function (_grunt) {
        grunt = _grunt;
        hooker = grunt.util.hooker;

        hooker.hook(grunt.log, "header", function () {
            if (!task) {
                task = grunt.task.current.nameArgs;
            } else if (task !== grunt.task.current.nameArgs) {
                grunt.util.spawn(options, doneFunction);
                showPrompt();
            }
        });

        process.on("exit", function () {
            hooker.unhook(grunt.log, "header");
        });
    };

    return pause;
})();