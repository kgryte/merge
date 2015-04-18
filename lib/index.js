'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	typeName = require( 'type-name' );


// FUNCTIONS //

/**
* FUNCTION: indexOf( arr, val )
*	Returns the array index of a value. If the array does not contain the value, the function returns `-1`.
*
* @private
* @param {Array} arr - array
* @param {*} val - value for which to search
* @returns {Number} array index
*/
function indexOf( arr, val ) {
	var len = arr.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] === val ) {
			return i;
		}
	}
	return -1;
} // end FUNCTION indexOf()

/**
* FUNCTION: objectKeys( obj )
*	Returns an object's keys.
*
* @private
* @param {Array|Object} obj - object
* @returns {Array} array of keys
*/
function objectKeys( obj ) {
	var keys = [],
		key;
	for ( key in obj ) {
		if ( obj.hasOwnProperty( key ) ) {
			keys.push( key );
		}
	}
	return keys;
} // end METHOD objectKeys()

/**
* Create functions for copying typed arrays.
*/
var typedArrays = {
	'Int8Array': null,
	'Uint8Array': null,
	'Uint8ClampedArray': null,
	'Int16Array': null,
	'Uint16Array': null,
	'Int32Array': null,
	'Uint32Array': null,
	'Float32Array': null,
	'Float64Array': null
};

(function createTypedArrayFcns() {
	/* jshint evil:true */
	var keys = objectKeys( typedArrays ),
		len = keys.length,
		key,
		i;
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		typedArrays[ key ] = new Function( 'arr', 'return new '+key+'( arr );' );
	}
})();


// CREATE MERGE FUNCTION //

/**
* FUNCTION: createMergeFcn( [options] )
*	Returns a function having a defined merge strategy for merging input arguments.
*
* @param {Object} [options] - merge options
* @returns {Function} function which can be used to merge input arguments
*/
function createMergeFcn( options ) {
	var opts;
	if ( arguments.length ) {
		opts = options;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'merge()::invalid input argument. Must provide an object. Value: `' + opts + '`.' );
		}

	} else {
		opts = {};
	}
	return function merge( opts ){
		// do something...
	};
} // end FUNCTION createMergeFcn()


// EXPORTS //

module.exports = createMergeFcn;
