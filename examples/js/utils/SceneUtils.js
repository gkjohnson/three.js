/**
 * Generated from 'examples/jsm/utils/SceneUtils.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, function (exports, THREE) { 'use strict';

/**
 * @author alteredq / http://alteredqualia.com/
 */

var SceneUtils = {

	createMultiMaterialObject: function ( geometry, materials ) {

		var group = new THREE.Group();

		for ( var i = 0, l = materials.length; i < l; i ++ ) {

			group.add( new THREE.Mesh( geometry, materials[ i ] ) );

		}

		return group;

	},

	detach: function ( child, parent, scene ) {

		console.warn( 'THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.' );

		scene.attach( child );

	},

	attach: function ( child, scene, parent ) {

		console.warn( 'THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.' );

		parent.attach( child );

	}

};

exports.SceneUtils = SceneUtils;

}));
