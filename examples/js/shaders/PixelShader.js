/**
 * Generated from 'examples/jsm/shaders/PixelShader.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}));
}(this, function (exports) { 'use strict';

/**
 * @author wongbryan / http://wongbryan.github.io
 *
 * Pixelation shader
 */



var PixelShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"resolution": { value: null },
		"pixelSize": { value: 1. },

	},

	vertexShader: [

		"varying highp vec2 vUv;",

		"void main() {",

		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float pixelSize;",
		"uniform vec2 resolution;",

		"varying highp vec2 vUv;",

		"void main(){",

		"vec2 dxy = pixelSize / resolution;",
		"vec2 coord = dxy * floor( vUv / dxy );",
		"gl_FragColor = texture2D(tDiffuse, coord);",

		"}"

	].join( "\n" )
};

exports.PixelShader = PixelShader;

}));
