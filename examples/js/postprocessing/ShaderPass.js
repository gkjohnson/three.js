/**
 * Generated from 'examples/jsm/postprocessing/ShaderPass.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('..\..\..\js\postprocessing\EffectComposer.js')) :
typeof define === 'function' && define.amd ? define(['exports', 'three', '..\..\..\js\postprocessing\EffectComposer.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE));
}(this, function (exports, THREE, Pass_js) { 'use strict';

/**
 * @author alteredq / http://alteredqualia.com/
 */

var ShaderPass = function ( shader, textureID ) {

	Pass_js.Pass.call( this );

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	if ( shader instanceof THREE.ShaderMaterial ) {

		this.uniforms = shader.uniforms;

		this.material = shader;

	} else if ( shader ) {

		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

		this.material = new THREE.ShaderMaterial( {

			defines: Object.assign( {}, shader.defines ),
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

	}

	this.fsQuad = new Pass_js.Pass.FullScreenQuad( this.material );

};

ShaderPass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

	constructor: ShaderPass,

	render: function ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		this.fsQuad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			this.fsQuad.render( renderer );

		}

	}

} );

exports.ShaderPass = ShaderPass;

}));
