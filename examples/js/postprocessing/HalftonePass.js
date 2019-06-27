/**
 * Generated from 'examples/jsm/postprocessing/HalftonePass.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('..\..\..\js\postprocessing\EffectComposer.js'), require('..\..\shaders\HalftoneShader.js')) :
typeof define === 'function' && define.amd ? define(['exports', 'three', '..\..\..\js\postprocessing\EffectComposer.js', '..\..\shaders\HalftoneShader.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, function (exports, THREE, Pass_js, HalftoneShader_js) { 'use strict';

/**
 * @author meatbags / xavierburrow.com, github/meatbags
 *
 * RGB Halftone pass for three.js effects composer. Requires HalftoneShader.
 *
 */

var HalftonePass = function ( width, height, params ) {

	Pass_js.Pass.call( this );

 	if ( HalftoneShader_js.HalftoneShader === undefined ) {

 		console.error( 'THREE.HalftonePass requires HalftoneShader' );

 	}

 	this.uniforms = THREE.UniformsUtils.clone( HalftoneShader_js.HalftoneShader.uniforms );
 	this.material = new THREE.ShaderMaterial( {
 		uniforms: this.uniforms,
 		fragmentShader: HalftoneShader_js.HalftoneShader.fragmentShader,
 		vertexShader: HalftoneShader_js.HalftoneShader.vertexShader
 	} );

	// set params
	this.uniforms.width.value = width;
	this.uniforms.height.value = height;

	for ( var key in params ) {

		if ( params.hasOwnProperty( key ) && this.uniforms.hasOwnProperty( key ) ) {

			this.uniforms[ key ].value = params[ key ];

		}

	}

	this.fsQuad = new Pass_js.Pass.FullScreenQuad( this.material );

};

HalftonePass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

	constructor: HalftonePass,

	render: function ( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

 		this.material.uniforms[ "tDiffuse" ].value = readBuffer.texture;

 		if ( this.renderToScreen ) {

 			renderer.setRenderTarget( null );
 			this.fsQuad.render( renderer );

		} else {

 			renderer.setRenderTarget( writeBuffer );
 			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}

 	},

 	setSize: function ( width, height ) {

 		this.uniforms.width.value = width;
 		this.uniforms.height.value = height;

 	}
} );

exports.HalftonePass = HalftonePass;

}));
