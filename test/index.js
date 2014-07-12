var assert = require('assert');
var funcDeps = require('../');

describe('funcDeps', function() {
    describe('called with non-annotated functions', function() {
        it('handles parameterless', function() {
            function test() {}
            var testDeps = funcDeps(test);
            assert.deepEqual(testDeps.deps, []);
            assert.equal(testDeps.func, test);
        });
        it('handles named functions', function() {
            function test(a,b) {}
            var testDeps = funcDeps(test);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
        it('handles unnamed functions', function() {
            var test = function(a,b) {}
            var testDeps = funcDeps(test);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
    });
    describe('handles annotated functions', function() {
        it('that have different args', function() {
            function test(c, d) {}
            var testDeps = funcDeps(['a', 'b', test]);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
        it('that have no args', function() {
            function test() {}
            var testDeps = funcDeps(['a', 'b', test]);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
    });
});
