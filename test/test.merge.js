'use strict';

// MODULES //

var tape = require( 'tape' );
var copy = require( 'utils-copy' );
var merge = require( './../lib/merge.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof merge, 'function', 'export is a function' );
	t.end();
});

tape( 'the function throws an error if provided insufficient arguments', function test( t ) {
	t.throws( foo, Error, 'throws error' );
	t.throws( bar, Error, 'throws error' );
	t.end();
	function foo() {
		merge();
	}
	function bar() {
		merge( {} );
	}
});

tape( 'if provided a `target` argument which is not an object, the function throws a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			merge( value, {} );
		};
	}
});

tape( 'if provided a `source` argument which is not an object, the function throws a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			merge( {}, value );
		};
	}
});

tape( 'the function can merge two objects', function test( t ) {
	var expected;
	var actual;
	var target;
	var src;

	target = {};
	src = {
		'a': 'beep',
		'b': 'boop'
	};

	actual = merge( target, src );
	expected = copy( src );

	t.notEqual( actual, src, 'does not return source object' );
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'the function returns the target object', function test( t ) {
	var expected;
	var actual;
	var target;
	var src;

	target = {};
	src = {
		'a': 'beep',
		'b': 'boop'
	};

	actual = merge( target, src );
	expected = copy( src );

	t.equal( actual, target, 'returns target object' );
	t.end();
});

tape( 'the function can merge multiple objects', function test( t ) {
	var expected;
	var actual;
	var target;
	var src1;
	var src2;

	target = {};
	src1 = {
		'a': 'beep',
		'b': 'boop'
	};
	src2 = {
		'c': [ 1, 2, 3 ]
	};

	actual = merge( target, src1, src2 );
	expected = {
		'a': 'beep',
		'b': 'boop',
		'c': [ 1, 2, 3 ]
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'the function can deep merge', function test( t ) {
	var expected;
	var actual;
	var target;
	var src;

	target = {
		'c': {
			'a': 'beep',
			'b': 'boop'
		}
	};
	src = {
		'c': {
			'b': 'woot',
			'c': [ 1, 2, 3 ]
		}
	};

	actual = merge( target, src );
	expected = {
		'c': {
			'a': 'beep',
			'b': 'woot',
			'c': [ 1, 2, 3 ]
		}
	};

	t.deepEqual( actual, expected, 'deep equal' );
	t.notEqual( actual.c.c, src.c.c, 'deep copied' );
	t.end();
});

tape( 'the function supports merging built-in objects and class instances', function test( t ) {
	var expected;
	var actual;
	var target;
	var src;

	function Foo( bar ) {
		this._bar = bar;
		return this;
	}

	target = {
		'time': new Date(),
		'regex': /beep/,
		'buffer': new Buffer( 'beep' ),
		'Boolean': new Boolean( true ),
		'String': new String( 'woot' ),
		'Number': new Number( 5 ),
		'Uint8Array': new Uint8Array( 10 ),
		'Foo': new Foo( 'beep' )
	};

	src = {
		'time': new Date( target.time - 60000 ),
		'regex': /boop/,
		'buffer': new Buffer( 'boop' ),
		'Boolean': new Boolean( false ),
		'String': new String( 'bop' ),
		'Number': new Number( 10 ),
		'Uint8Array': new Uint8Array( 5 ),
		'Foo': new Foo( 'boop' )
	};

	actual = merge( target, src );
	expected = copy( src );

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});
