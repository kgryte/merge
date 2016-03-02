'use strict';

// MODULES //

var tape = require( 'tape' );
var merge = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof merge, 'function', 'export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory function for generating custom merge functions', function test( t ) {
	t.equal( typeof merge.factory, 'function', 'has `factory` method' );
	t.end();
});
