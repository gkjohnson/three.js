/**
 * Generated from 'examples/jsm/postprocessing/TexturePass.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('..\..\..\js\postprocessing\EffectComposer.js'), require('..\..\shaders\CopyShader.js')) :
typeof define === 'function' && define.amd ? define(['exports', 'three', '..\..\..\js\postprocessing\EffectComposer.js', '..\..\shaders\CopyShader.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, function (exports, THREE, Pass_js, CopyShader_js) { 'use strict';

/**
 * @author alteredq / http://alteredqualia.com/
 */

var TexturePass = function ( map, opacity ) {

	Pass_js.Pass.call( this );

	if ( CopyShader_js.CopyShader === undefined )
		console.error( "TexturePass relies on CopyShader" );

	var shader = CopyShader_js.CopyShader;

	this.map = map;
	this.opacity = ( opacity !== undefined ) ? opacity : 1.0;

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader,
		depthTest: false,
		depthWrite: false

	} );

	this.needsSwap = false;

	this.fsQuad = new Pass_js.Pass.FullScreenQuad( null );

};

TexturePass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

	constructor: TexturePass,

	render: function ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.fsQuad.material = this.material;

		this.uniforms[ "opacity" ].value = this.opacity;
		this.uniforms[ "tDiffuse" ].value = this.map;
		this.material.transparent = ( this.opacity < 1.0 );

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
		if ( this.clear ) renderer.clear();
		this.fsQuad.render( renderer );

		renderer.autoClear = oldAutoClear;

	}

} );

exports.TexturePass = TexturePass;

}));
