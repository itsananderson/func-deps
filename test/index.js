var assert = require('assert');
var funcDeps = require('../');

describe('funcDeps', function() {
    describe('called with non-annotated functions', function() {
        it('handles parameterless functions', function() {
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
        it('handles functions with comments in parameter list', function() {
            var test = function(a,/* test
                we should be able to do all kinds of crazy stuff in here
                /*
                * /
                , c, d
            **/b) {}
            var testDeps = funcDeps(test);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
        it('handles functions with whitespace in parameter list', function() {
            var test = function(    a , b,   c,
            d ) {}
            var testDeps = funcDeps(test);
            assert.deepEqual(testDeps.deps, ['a','b','c','d']);
            assert.equal(testDeps.func, test);
        });
    });
    describe('called with annotated functions', function() {
        it('handles functions with different args', function() {
            function test(c, d) {}
            var testDeps = funcDeps(['a', 'b', test]);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
        it('handles functions with no args', function() {
            function test() {}
            var testDeps = funcDeps(['a', 'b', test]);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
    });
    describe('called with inline annotated functions', function() {
        it('handles functions with different args', function() {
            function test(c, d) {}
            test.$inject = ['a','b'];
            var testDeps = funcDeps(test);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
        it('handles functions with no args', function() {
            function test() {}
            test.$inject = ['a','b'];
            var testDeps = funcDeps(test);
            assert.deepEqual(testDeps.deps, ['a','b']);
            assert.equal(testDeps.func, test);
        });
    });
});
