/**
 * Generated from 'examples/jsm/objects/ReflectorRTT.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('..\Reflector.js')) :
typeof define === 'function' && define.amd ? define(['exports', '..\Reflector.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, function (exports, Reflector_js) { 'use strict';

/**
 * RTT version
 */

var ReflectorRTT = function ( geometry, options ) {

	Reflector_js.Reflector.call( this, geometry, options );

	this.geometry.setDrawRange( 0, 0 ); // avoid rendering geometry

};

ReflectorRTT.prototype = Object.create( Reflector_js.Reflector.prototype );

exports.ReflectorRTT = ReflectorRTT;

}));
