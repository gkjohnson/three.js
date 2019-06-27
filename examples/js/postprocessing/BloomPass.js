/**
 * Generated from 'examples/jsm/postprocessing/BloomPass.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('..\..\..\js\postprocessing\EffectComposer.js'), require('..\..\shaders\CopyShader.js'), require('..\..\shaders\ConvolutionShader.js')) :
typeof define === 'function' && define.amd ? define(['exports', 'three', '..\..\..\js\postprocessing\EffectComposer.js', '..\..\shaders\CopyShader.js', '..\..\shaders\ConvolutionShader.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE, global.THREE));
}(this, function (exports, THREE, Pass_js, CopyShader_js, ConvolutionShader_js) { 'use strict';

/**
 * @author alteredq / http://alteredqualia.com/
 */

var BloomPass = function ( strength, kernelSize, sigma, resolution ) {

	Pass_js.Pass.call( this );

	strength = ( strength !== undefined ) ? strength : 1;
	kernelSize = ( kernelSize !== undefined ) ? kernelSize : 25;
	sigma = ( sigma !== undefined ) ? sigma : 4.0;
	resolution = ( resolution !== undefined ) ? resolution : 256;

	// render targets

	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };

	this.renderTargetX = new THREE.WebGLRenderTarget( resolution, resolution, pars );
	this.renderTargetX.texture.name = "BloomPass.x";
	this.renderTargetY = new THREE.WebGLRenderTarget( resolution, resolution, pars );
	this.renderTargetY.texture.name = "BloomPass.y";

	// copy material

	if ( CopyShader_js.CopyShader === undefined )
		console.error( "BloomPass relies on CopyShader" );

	var copyShader = CopyShader_js.CopyShader;

	this.copyUniforms = THREE.UniformsUtils.clone( copyShader.uniforms );

	this.copyUniforms[ "opacity" ].value = strength;

	this.materialCopy = new THREE.ShaderMaterial( {

		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.AdditiveBlending,
		transparent: true

	} );

	// convolution material

	if ( ConvolutionShader_js.ConvolutionShader === undefined )
		console.error( "BloomPass relies on ConvolutionShader" );

	var convolutionShader = ConvolutionShader_js.ConvolutionShader;

	this.convolutionUniforms = THREE.UniformsUtils.clone( convolutionShader.uniforms );

	this.convolutionUniforms[ "uImageIncrement" ].value = BloomPass.blurX;
	this.convolutionUniforms[ "cKernel" ].value = ConvolutionShader_js.ConvolutionShader.buildKernel( sigma );

	this.materialConvolution = new THREE.ShaderMaterial( {

		uniforms: this.convolutionUniforms,
		vertexShader: convolutionShader.vertexShader,
		fragmentShader: convolutionShader.fragmentShader,
		defines: {
			"KERNEL_SIZE_FLOAT": kernelSize.toFixed( 1 ),
			"KERNEL_SIZE_INT": kernelSize.toFixed( 0 )
		}

	} );

	this.needsSwap = false;

	this.fsQuad = new Pass_js.Pass.FullScreenQuad( null );

};

BloomPass.prototype = Object.assign( Object.create( Pass_js.Pass.prototype ), {

	constructor: BloomPass,

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		if ( maskActive ) renderer.context.disable( renderer.context.STENCIL_TEST );

		// Render quad with blured scene into texture (convolution pass 1)

		this.fsQuad.material = this.materialConvolution;

		this.convolutionUniforms[ "tDiffuse" ].value = readBuffer.texture;
		this.convolutionUniforms[ "uImageIncrement" ].value = BloomPass.blurX;

		renderer.setRenderTarget( this.renderTargetX );
		renderer.clear();
		this.fsQuad.render( renderer );


		// Render quad with blured scene into texture (convolution pass 2)

		this.convolutionUniforms[ "tDiffuse" ].value = this.renderTargetX.texture;
		this.convolutionUniforms[ "uImageIncrement" ].value = BloomPass.blurY;

		renderer.setRenderTarget( this.renderTargetY );
		renderer.clear();
		this.fsQuad.render( renderer );

		// Render original scene with superimposed blur to texture

		this.fsQuad.material = this.materialCopy;

		this.copyUniforms[ "tDiffuse" ].value = this.renderTargetY.texture;

		if ( maskActive ) renderer.context.enable( renderer.context.STENCIL_TEST );

		renderer.setRenderTarget( readBuffer );
		if ( this.clear ) renderer.clear();
		this.fsQuad.render( renderer );

	}

} );

BloomPass.blurX = new THREE.Vector2( 0.001953125, 0.0 );
BloomPass.blurY = new THREE.Vector2( 0.0, 0.001953125 );

exports.BloomPass = BloomPass;

}));
