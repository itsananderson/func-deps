func-deps
=========

Determines a function's dependencies based on its signature or annotations

Similar to the AngularJS $injector

Installation
---

```
npm install func-deps
```

Usage
---

Call func-deps with a function, and it returns an object with two properties: `deps` and `func`.

```
var funcDeps = require('func-deps');

funcDeps(function(){});
// => returns { deps: [], func: function(){} }

funcDeps(function(a, b){});
// => returns { deps: ['a', 'b'], func: function(a, b){} }
```

You can also pass func-deps an array, where the first args are string dependencies, and the last arg is the function.

```
funcDeps(['a', 'b', function(c, d){}]);
// => returns { deps: ['a', 'b'], func: function(c, d){} }

funcDeps(['a', 'b', function(){}]);
// => returns { deps: ['a', 'b'], func: function(){} }
```

If no array annotation is provided, and the function has a `$deps` property that is an array, the `$deps` property is assumed to be the dependency list.

```
function test() {};
test.$deps = ['a', 'b'];
funcDeps(test);
// => returns { deps: ['a', 'b'], func: function test(){} }
```
