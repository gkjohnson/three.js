/**
 * Generated from 'examples/jsm/loaders/obj2/worker/parallel/jsm/OBJLoader2Worker.js'
 */

(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('..\..\OBJLoader2Parser.js'), require('..\..\WorkerRunner.js')) :
typeof define === 'function' && define.amd ? define(['..\..\OBJLoader2Parser.js', '..\..\WorkerRunner.js'], factory) :
(global = global || self, factory(global.THREE, global.THREE));
}(this, function (OBJLoader2Parser_js, WorkerRunner_js) { 'use strict';

/**
 * @author Kai Salmen / www.kaisalmen.de
 */

new WorkerRunner_js.WorkerRunner( new WorkerRunner_js.DefaultWorkerPayloadHandler( new OBJLoader2Parser_js.OBJLoader2Parser() ) );

}));
