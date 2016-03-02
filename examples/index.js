'use strict';

var merge = require( './../lib' );

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

