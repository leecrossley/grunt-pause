var inquirer = require("inquirer");

exports = module.exports = (function () {
    var pause = {}, grunt, hooker, task;

    var showPrompt = function (done) {
        inquirer.prompt([question], function (val) {
            if (!val.continue) {
                grunt.task.clearQueue();
            }
            done();
        });
    };

    var shouldPause = function (done) {
        return task !== grunt.task.current.nameArgs &&
            grunt.task._queue.length > 2 &&
            grunt.task.current.nameArgs !== "grunt-pause";
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
            if (!task) {
                task = grunt.task.current.nameArgs;
                return;
            }
            if (shouldPause()) {
                grunt.task.run("grunt-pause");
            }
        });

        process.on("exit", function () {
            hooker.unhook(grunt.log, "header");
        });
    };

    return pause;
})();