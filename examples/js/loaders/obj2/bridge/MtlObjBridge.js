/**
 * Generated from 'examples/jsm/loaders/obj2/bridge/MtlObjBridge.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('..\..\..\MTLLoader.js')) :
typeof define === 'function' && define.amd ? define(['exports', '..\..\..\MTLLoader.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, function (exports, MTLLoader_js) { 'use strict';

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */


const MtlObjBridge = {

	/**
	 *
	 * @param processResult
	 * @param assetLoader
	 */
	link: function( processResult, assetLoader ) {
		if ( typeof assetLoader.addMaterials === 'function' ) {

			assetLoader.addMaterials( this.addMaterialsFromMtlLoader( processResult ) );

		}
	},

	/**
	 * Returns the array instance of {@link MTLLoader.MaterialCreator}.
	 *
	 * @param Instance of {@link MTLLoader.MaterialCreator}
	 */
	addMaterialsFromMtlLoader: function ( materialCreator ) {
		let newMaterials = {};
		if ( materialCreator instanceof MTLLoader_js.MTLLoader.MaterialCreator ) {

			materialCreator.preload();
			newMaterials = materialCreator.materials;

		}
		return newMaterials;
	}
};

exports.MtlObjBridge = MtlObjBridge;

}));
