/**
 * Generated from 'examples/jsm/postprocessing/ClearPass.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('..\..\..\js\postprocessing\EffectComposer.js')) :
typeof define === 'function' && define.amd ? define(['exports', '..\..\..\js\postprocessing\EffectComposer.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, function (exports, Pass_js) { 'use strict';

/**
 * @author mrdoob / http://mrdoob.com/
 */

var ClearPass = function ( clearColor, clearAlpha ) {

	Pass_js.Pass.call( this );

	this.needsSwap = false;

	this.clearColor = ( clearColor !== undefined ) ? clearColor : 0x000000;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

};

ClearPass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

	constructor: ClearPass,

	render: function ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		var oldClearColor, oldClearAlpha;

		if ( this.clearColor ) {

			oldClearColor = renderer.getClearColor().getHex();
			oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
		renderer.clear();

		if ( this.clearColor ) {

			renderer.setClearColor( oldClearColor, oldClearAlpha );

		}

	}

} );

exports.ClearPass = ClearPass;

}));
