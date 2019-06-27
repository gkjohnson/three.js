/**
 * Generated from 'examples/jsm/loaders/obj2/utils/ObjectManipulator.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}));
}(this, function (exports) { 'use strict';

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */

const ObjectManipulator = {

	/**
	 * Applies values from parameter object via set functions or via direct assignment.
	 *
	 * @param {Object} objToAlter The objToAlter instance
	 * @param {Object} params The parameter object
	 */
	applyProperties: function ( objToAlter, params, forceCreation ) {
		// fast-fail
		if ( objToAlter === undefined || objToAlter === null || params === undefined || params === null ) return;

		var property, funcName, values;
		for ( property in params ) {
			funcName = 'set' + property.substring( 0, 1 ).toLocaleUpperCase() + property.substring( 1 );
			values = params[ property ];

			if ( typeof objToAlter[ funcName ] === 'function' ) {

				objToAlter[ funcName ]( values );

			} else if ( objToAlter.hasOwnProperty( property ) || forceCreation ) {

				objToAlter[ property ] = values;

			}
		}
	}
};

exports.ObjectManipulator = ObjectManipulator;

}));
