/**
 * Generated from 'examples/jsm/postprocessing/SavePass.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('..\..\..\js\postprocessing\EffectComposer.js'), require('..\..\shaders\CopyShader.js')) :
typeof define === 'function' && define.amd ? define(['exports', 'three', '..\..\..\js\postprocessing\EffectComposer.js', '..\..\shaders\CopyShader.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, function (exports, THREE, Pass_js, CopyShader_js) { 'use strict';

/**
 * @author alteredq / http://alteredqualia.com/
 */

var SavePass = function ( renderTarget ) {

	Pass_js.Pass.call( this );

	if ( CopyShader_js.CopyShader === undefined )
		console.error( "SavePass relies on CopyShader" );

	var shader = CopyShader_js.CopyShader;

	this.textureID = "tDiffuse";

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderTarget = renderTarget;

	if ( this.renderTarget === undefined ) {

		this.renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false } );
		this.renderTarget.texture.name = "SavePass.rt";

	}

	this.needsSwap = false;

	this.fsQuad = new Pass_js.Pass.FullScreenQuad( this.material );

};

SavePass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

	constructor: SavePass,

	render: function ( renderer, writeBuffer, readBuffer ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		renderer.setRenderTarget( this.renderTarget );
		if ( this.clear ) renderer.clear();
		this.fsQuad.render( renderer );

	}

} );

exports.SavePass = SavePass;

}));
