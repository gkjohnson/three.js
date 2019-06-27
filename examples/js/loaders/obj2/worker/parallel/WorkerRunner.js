/**
 * Generated from 'examples/jsm/loaders/obj2/worker/parallel/WorkerRunner.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('..\..\..\utils\ObjectManipulator.js')) :
typeof define === 'function' && define.amd ? define(['exports', '..\..\..\utils\ObjectManipulator.js'], factory) :
(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, function (exports, ObjectManipulator_js) { 'use strict';

/**
 * @author Kai Salmen / www.kaisalmen.de
 */

const DefaultWorkerPayloadHandler = function ( parser ) {
	this.parser = parser;
	this.logging = {
		enabled: false,
		debug: false
	};
};

DefaultWorkerPayloadHandler.prototype = {

	constructor: DefaultWorkerPayloadHandler,

	handlePayload: function ( payload ) {
		if ( payload.logging ) {
			this.logging.enabled = payload.logging.enabled === true;
			this.logging.debug = payload.logging.debug === true;
		}
		if ( payload.cmd === 'parse' ) {

			let scope = this;
			let callbacks = {
				callbackOnAssetAvailable: function ( payload ) {
					self.postMessage( payload );
				},
				callbackOnProgress: function ( text ) {
					if ( scope.logging.enabled && scope.logging.debug ) console.debug( 'WorkerRunner: progress: ' + text );
				}
			};

			let parser = this.parser;
			if ( typeof parser[ 'setLogging' ] === 'function' ) {

				parser.setLogging( this.logging.enabled, this.logging.debug );

			}
			ObjectManipulator_js.ObjectManipulator.applyProperties( parser, payload.params );
			ObjectManipulator_js.ObjectManipulator.applyProperties( parser, payload.materials );
			ObjectManipulator_js.ObjectManipulator.applyProperties( parser, callbacks );

			let arraybuffer;
			if ( payload.params && payload.params.index !== undefined && payload.params.index !== null) {

				arraybuffer = this.resourceDescriptors[ payload.params.index ].content;

			} else {

				arraybuffer = payload.data.input;

			}

			let parseFunctionName = 'parse';
			if ( typeof parser.getParseFunctionName === 'function' ) parseFunctionName = parser.getParseFunctionName();
			if ( payload.usesMeshDisassembler ) {

				// TODO: Allow to plug and use generic MeshDisassembler

			} else {

				parser[ parseFunctionName ] ( arraybuffer, payload.data.options );

			}
			if ( this.logging.enabled ) console.log( 'WorkerRunner: Run complete!' );

			self.postMessage( {
				cmd: 'completeOverall',
				msg: 'WorkerRunner completed run.'
			} );

		} else {

			console.error( 'WorkerRunner: Received unknown command: ' + payload.cmd );

		}

	}
};


/**
 * Default implementation of the WorkerRunner responsible for creation and configuration of the parser within the worker.
 * @constructor
 */
const WorkerRunner = function ( payloadHandler ) {
	this.resourceDescriptors = [];
	this.payloadHandler = payloadHandler;

	let scope = this;
	let scopedRunner = function( event ) {
		scope.processMessage( event.data );
	};
	self.addEventListener( 'message', scopedRunner, false );
};

WorkerRunner.prototype = {

	constructor: WorkerRunner,

	/**
	 * Configures the Parser implementation according the supplied configuration object.
	 *
	 * @param {Object} payload Raw mesh description (buffers, params, materials) used to build one to many meshes.
	 */
	processMessage: function ( payload ) {
		if ( payload.data.resourceDescriptors && this.resourceDescriptors.length === 0 ) {

			for ( let name in payload.data.resourceDescriptors ) {

				this.resourceDescriptors.push( payload.data.resourceDescriptors[ name ] );

			}

		}

		this.payloadHandler.handlePayload( payload );
	}

};

exports.DefaultWorkerPayloadHandler = DefaultWorkerPayloadHandler;
exports.WorkerRunner = WorkerRunner;

}));
