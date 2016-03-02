Merge
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Merge and extend objects.


## Installation

``` bash
$ npm install utils-merge2
```


## Usage

``` javascript
var merge = require( 'utils-merge2' );
```

#### merge( target, source1[, source2[,...,sourceN]] )

Merges and extends a target `object`.

``` javascript
var target = {
    'a': 'beep'
};
var source = {
    'a': 'boop',
    'b': 'bap'
};

var out = merge( target, source );
/* returns
    {
        'a': 'boop',
        'b': 'bap'
    }
*/
```

The `function` supports merging multiple source `objects`.

``` javascript
var target = {
    'a': 'beep'
};
var source1 = {
    'b': 'boop'
};
var source2 = {
    'c': 'cat'
};

var out = merge( target, source1, source2 );
/* returns
    {
        'a': 'beep',
        'b': 'boop',
        'c': 'cat'
    }
*/
```


#### merge.factory( options )

Returns a custom merge `function` for merging and extending `objects`.

``` javascript
var factory = require( 'utils-merge2' ).factory;

var opts = {
    'level': 100,
    'copy': true,
    'override': true,
    'extend': true    
};

var merge = factory( opts );
```

The `function` accepts the following `options`:

* __level__: limits the merge depth. The default merge strategy is a deep (recursive) merge. Default: `level = +infinity`.
* __copy__: `boolean` indicating whether to [deep copy][utils-copy] merged values. Deep copying prevents shared references and source `object` mutation. Default: `true`.
* __override__: defines the merge strategy. If `true`, source `object` values will __always__ override target `object` values. If `false`, source values __never__ override target values (useful for adding, but not overwriting, properties). To define a custom merge strategy, provide a `function`. Default: `true`.
* __extend__: `boolean` indicating whether new properties can be added to the target `object`. If `false`, only __shared__ properties are merged. Default: `true`.

The default merge is a deep (recursive) merge.

``` javascript
var target = {
    'a': {
        'b': {
            'c': 5
        },
        'd': 'beep'
    }
};
var source = {
    'a': {
        'b': {
            'c': 10
        }
    }
};

var out = merge( target, source );
/* returns
    {
        'a': {
            'b': {
                'c': 10
            },
            'd': 'beep'
        }
    }
*/
```

To limit the merge depth, set the `level` option.

``` javascript
var merge = factory({
    'level': 2
});

var target = {
    '1': {
        'a': 'beep',
        '2': {
            '3': null,
            'b': [ 5, 6, 7 ]
        }
    }
};

var source = {
    '1': {
        'b': 'boop',
        '2': {
            '3': [ 1, 2, 3 ]
        }
    }
};

var out = merge( target, source );
/* returns
    {
        '1': {
            'a': 'beep',
            'b': 'boop',
            '2': {
                '3': [ 1, 2, 3 ]
            }
        }
    }
*/
```

By default, merged values are [deep copied][utils-copy].

``` javascript
var target = {
    'a': null
};
var source = {
    'a': {
        'b': [ 1, 2, 3 ]
    }
};

var out = merge( target, source );

console.log( out.a.b === source.a.b );
// returns false
```

To allow shared references, set the `copy` option to `false`.

``` javascript
var merge = factory({
    'copy': false
});

var target = {};

var source = {
    'a': [ 1, 2, 3 ]
};

var out = merge( target, source );

var bool = ( out.a === source.a );
// returns true
```

To prevent existing properties from being overridden, set the `override` option to `false`.

``` javascript
var merge = factory({
    'override': false
});

var target = {
    'a': 'beep',
    'b': 'boop'
};

var source = {
    'a': null,
    'c': 'bop'
};

var out = merge( target, source );
/* returns
    {
        'a': 'beep',
        'b': 'boop',
        'c': 'bop'
    }
*/
```

Alternatively, to define a custom merge strategy, set the `override` option to a `function`.

``` javascript
function strategy( a, b, key ) {
    // a => target value
    // b => source value
    // key => object key
    if ( key === 'a' ) {
        return b;
    }
    if ( key === 'b' ) {
        return a;
    }
    return 'bebop';
}

var merge = factory({
    'override': strategy
});

var target = {
    'a': 'beep',
    'b': 'boop',
    'c': 1234
};

var source = {
    'a': null,
    'b': {},
    'c': 'bop'
};

var out = merge( target, source );
/* returns
    {
        'a': null,
        'b': 'boop',
        'c': 'bebop'
    }
*/
```

To prevent non-existent properties from being added to the target `object`, set the `extend` option to `false`.

``` javascript
var merge = factory({
    'extend': false
});

var target = {
    'a': 'beep',
    'b': 'boop'
};

var source = {
    'b': 'hello',
    'c': 'world'
};

var out = merge( target, source );
/* returns
    {
        'a': 'beep',
        'b': 'hello'
    }
*/
```


---
## Notes

* The target `object` is __mutated__.

    ``` javascript
    var target = {
        'a': 'beep'
    };
    var source = {
        'b': 'boop'
    };

    var out = merge( target, source );

    console.log( out === target );
    // returns true

    console.log( target.b );
    // returns 'boop'
    ```

    To return a new `object`, provide an empty `object` as the first argument.

    ``` javascript
    var target = {
        'a': 'beep'
    };
    var source = {
        'b': 'boop'
    };

    var out = merge( {}, target, source );

    console.log( out === target );
    // returns false
    ```

* __Only__ plain JavaScript `objects` are merged and extended. The following values/types are either [deep copied][utils-copy] or assigned:
    - `Boolean`
    - `String`
    - `Number`
    - `Date`
    - `RegExp`
    - `Array`
    - `Int8Array`
    - `Uint8Array`
    - `Uint8ClampedArray`
    - `Init16Array`
    - `Uint16Array`
    - `Int32Array`
    - `Uint32Array`
    - `Float32Array`
    - `Float64Array`
    - `Buffer` ([Node.js][node-buffer])
    - `Set`
    - `Map`
    - `Error`
    -    `URIError`
    - `ReferenceError`
    - `SyntaxError`
    - `RangeError`
* Support for deep merging class instances is inherently [__fragile__][utils-copy-notes].
* `Number`, `String`, or `Boolean` objects are merged as [primitives][utils-copy-notes].
* Functions are __not__ [deep copied][utils-copy-notes].



---
## Examples

``` javascript
var merge = require( 'utils-merge2' );

var target;
var source;
var out;

target = {
    'a': 'beep',
    'b': 'boop',
    'c': {
        'c1': 'woot',
        'c2': false,
        'c3': {
            'c3a': [ 1, 2 ],
            'c3b': null
        }
    },
    'd': [ 1, 2, 3 ]
};

source = {
    'b': Math.PI,
    'c': {
        'c1': 'bap',
        'c3': {
            'c3b': 5,
            'c3c': 'bop'
        },
        'c4': 1337,
        'c5': new Date()
    },
    'd': [ 4, 5, 6 ],
    'e': true
};

out = merge( {}, target, source );

console.dir( out );
/* returns
    {
        'a': 'beep',
        'b': 3.141592653589793,
        'c': { 
            'c1': 'bap',
            'c2': false,
            'c3': { 
                'c3a': [ 1, 2 ],
                'c3b': 5,
                'c3c': 'bop'
            },
            'c4': 1337,
            'c5': <Date>
        },
        'd': [ 4, 5, 6 ],
        'e': true
    }
*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015-2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-merge2.svg
[npm-url]: https://npmjs.org/package/utils-merge2

[build-image]: http://img.shields.io/travis/kgryte/utils-merge/master.svg
[build-url]: https://travis-ci.org/kgryte/utils-merge

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/utils-merge/master.svg
[coverage-url]: https://codecov.io/github/kgryte/utils-merge?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-merge.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-merge

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-merge.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-merge

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-merge.svg
[github-issues-url]: https://github.com/kgryte/utils-merge/issues

[browsers-image]: https://ci.testling.com/kgryte/utils-merge.png
[browsers-url]: https://ci.testling.com/kgryte/utils-merge

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[utils-copy]: https://github.com/kgryte/utils-copy
[utils-copy-notes]: https://github.com/kgryte/utils-copy#notes
[node-buffer]: http://nodejs.org/api/buffer.html
