/**
 * Generated from 'examples/jsm/lines/LineGeometry.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('..\LineSegmentsGeometry.js')) :
typeof define === 'function' && define.amd ? define(['exports', '..\LineSegmentsGeometry.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, function (exports, LineSegmentsGeometry_js) { 'use strict';

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */

var LineGeometry = function () {

	LineSegmentsGeometry_js.LineSegmentsGeometry.call( this );

	this.type = 'LineGeometry';

};

LineGeometry.prototype = Object.assign( Object.create( LineSegmentsGeometry_js.LineSegmentsGeometry.prototype ), {

	constructor: LineGeometry,

	isLineGeometry: true,

	setPositions: function ( array ) {

		// converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format

		var length = array.length - 3;
		var points = new Float32Array( 2 * length );

		for ( var i = 0; i < length; i += 3 ) {

			points[ 2 * i ] = array[ i ];
			points[ 2 * i + 1 ] = array[ i + 1 ];
			points[ 2 * i + 2 ] = array[ i + 2 ];

			points[ 2 * i + 3 ] = array[ i + 3 ];
			points[ 2 * i + 4 ] = array[ i + 4 ];
			points[ 2 * i + 5 ] = array[ i + 5 ];

		}

		LineSegmentsGeometry_js.LineSegmentsGeometry.prototype.setPositions.call( this, points );

		return this;

	},

	setColors: function ( array ) {

		// converts [ r1, g1, b1,  r2, g2, b2, ... ] to pairs format

		var length = array.length - 3;
		var colors = new Float32Array( 2 * length );

		for ( var i = 0; i < length; i += 3 ) {

			colors[ 2 * i ] = array[ i ];
			colors[ 2 * i + 1 ] = array[ i + 1 ];
			colors[ 2 * i + 2 ] = array[ i + 2 ];

			colors[ 2 * i + 3 ] = array[ i + 3 ];
			colors[ 2 * i + 4 ] = array[ i + 4 ];
			colors[ 2 * i + 5 ] = array[ i + 5 ];

		}

		LineSegmentsGeometry_js.LineSegmentsGeometry.prototype.setColors.call( this, colors );

		return this;

	},

	fromLine: function ( line ) {

		var geometry = line.geometry;

		if ( geometry.isGeometry ) {

			this.setPositions( geometry.vertices );

		} else if ( geometry.isBufferGeometry ) {

			this.setPositions( geometry.position.array ); // assumes non-indexed

		}

		// set colors, maybe

		return this;

	},

	copy: function ( /* source */ ) {

		// todo

		return this;

	}

} );

exports.LineGeometry = LineGeometry;

}));
