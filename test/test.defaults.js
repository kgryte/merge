'use strict';

// MODULES //

var tape = require( 'tape' );
var defaults = require( './../lib/defaults.js' );


// TESTS //

tape( 'main export is an object', function test( t ) {
	t.equal( typeof defaults, 'object', 'export is an object' );
	t.end();
});
