/**
 * Generated from 'examples/jsm/lines/WireframeGeometry2.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('..\LineSegmentsGeometry.js')) :
typeof define === 'function' && define.amd ? define(['exports', 'three', '..\LineSegmentsGeometry.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE));
}(this, function (exports, THREE, LineSegmentsGeometry_js) { 'use strict';

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */

var WireframeGeometry2 = function ( geometry ) {

	LineSegmentsGeometry_js.LineSegmentsGeometry.call( this );

	this.type = 'WireframeGeometry2';

	this.fromWireframeGeometry( new THREE.WireframeGeometry( geometry ) );

	// set colors, maybe

};

WireframeGeometry2.prototype = Object.assign( Object.create( LineSegmentsGeometry_js.LineSegmentsGeometry.prototype ), {

	constructor: WireframeGeometry2,

	isWireframeGeometry2: true,

	copy: function ( /* source */ ) {

		// todo

		return this;

	}

} );

exports.WireframeGeometry2 = WireframeGeometry2;

}));
