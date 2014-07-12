var util = require('util');

// Patterns from AngularJS
// https://github.com/angular/angular.js/blob/6476aed7626fa7b4adefa99c5cb4a86ed371835c/src/auto/injector.js#L41
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function funcDeps(func) {
    if (Object.prototype.toString.call(func) === '[object Array]') {
        return {
            deps: func.slice(0, func.length-1),
            func: func[func.length-1]
        };
    } else if (typeof func === 'function') {
        var deps;
        // If function contains a $deps property, use that
        if (Object.prototype.toString.call(func.$deps) === '[object Array]') {
            deps = func.$deps;
        } else {
            deps = [];
            fnText = func.toString().replace(STRIP_COMMENTS, '');
            argDecl = fnText.match(FN_ARGS);
            argDecl[1].split(FN_ARG_SPLIT).forEach(function(arg){
                arg.replace(FN_ARG, function(all, underscore, name){
                    deps.push(name);
                });
            });
        }
        return {
            deps: deps,
            func: func
        }
    } else {
        throw new Error(util.format('func-deps: Unexpected input %s', util.inspect(func)));
    }
}

module.exports = funcDeps;
