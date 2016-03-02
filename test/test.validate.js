'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof validate, 'function', 'export is a function' );
	t.end();
});

tape( 'if provided an `options` argument which is not an `object`, the function returns a type error', function test( t ) {
	var values;
	var err;
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
		err = validate( {}, values[i] );
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `level` option which is not a positive integer, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		-5,
		5.1234,
		0,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];
	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'level': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `copy` option which is not a boolean primitive, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		new Boolean( true ),
		[],
		{},
		function(){}
	];
	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'copy': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided an `extend` option which is not a boolean primitive, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		new Boolean( true ),
		[],
		{},
		function(){}
	];
	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'extend': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided an `override` option which is not a boolean primitive or a function, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		new Boolean( true ),
		[],
		{}
	];
	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'override': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var opts;
	var obj;
	var err;

	opts = {
		'level': 2,
		'copy': false,
		'extend': false,
		'override': false
	};
	obj = {};
	err = validate( obj, opts );

	t.equal( err, null, 'returns null' );
	t.equal( obj.level, 2, 'sets level option' );
	t.equal( obj.copy, false, 'sets copy option' );
	t.equal( obj.extend, false, 'sets extend option' );
	t.equal( obj.override, false, 'sets override option' );

	t.end();
});

tape( 'the function ignores unsupported/unrecognized options', function test( t ) {
	var opts;
	var obj;
	var err;

	opts = {
		'beep': 'boop',
		'a': 'b',
		'c': [1,2,3]
	};
	obj = {};
	err = validate( obj, opts );

	t.equal( err, null, 'returns null' );
	t.deepEqual( obj, {}, 'does not set any options' );

	t.end();
});
