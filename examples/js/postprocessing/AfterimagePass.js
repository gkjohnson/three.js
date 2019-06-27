/**
 * Generated from 'examples/jsm/postprocessing/AfterimagePass.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('..\..\..\js\postprocessing\EffectComposer.js'), require('..\..\shaders\AfterimageShader.js')) :
typeof define === 'function' && define.amd ? define(['exports', 'three', '..\..\..\js\postprocessing\EffectComposer.js', '..\..\shaders\AfterimageShader.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, function (exports, THREE, Pass_js, AfterimageShader_js) { 'use strict';

/**
 * @author HypnosNova / https://www.threejs.org.cn/gallery/
 */

var AfterimagePass = function ( damp ) {

	Pass_js.Pass.call( this );

	if ( AfterimageShader_js.AfterimageShader === undefined )
		console.error( "AfterimagePass relies on AfterimageShader" );

	this.shader = AfterimageShader_js.AfterimageShader;

	this.uniforms = THREE.UniformsUtils.clone( this.shader.uniforms );

	this.uniforms[ "damp" ].value = damp !== undefined ? damp : 0.96;

	this.textureComp = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {

		minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat

	} );

	this.textureOld = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {

		minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat

	} );

	this.shaderMaterial = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: this.shader.vertexShader,
		fragmentShader: this.shader.fragmentShader

	} );

	this.compFsQuad = new Pass_js.Pass.FullScreenQuad( this.shaderMaterial );

	var material = new THREE.MeshBasicMaterial();
	this.copyFsQuad = new Pass_js.Pass.FullScreenQuad( material );

};

AfterimagePass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

	constructor: AfterimagePass,

	render: function ( renderer, writeBuffer, readBuffer ) {

		this.uniforms[ "tOld" ].value = this.textureOld.texture;
		this.uniforms[ "tNew" ].value = readBuffer.texture;

		renderer.setRenderTarget( this.textureComp );
		this.compFsQuad.render( renderer );

		this.copyFsQuad.material.map = this.textureComp.texture;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.copyFsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );

			if ( this.clear ) renderer.clear();

			this.copyFsQuad.render( renderer );

		}

		// Swap buffers.
		var temp = this.textureOld;
		this.textureOld = this.textureComp;
		this.textureComp = temp;
		// Now textureOld contains the latest image, ready for the next frame.

	},

	setSize: function ( width, height ) {

		this.textureComp.setSize( width, height );
		this.textureOld.setSize( width, height );

	}

} );

exports.AfterimagePass = AfterimagePass;

}));
