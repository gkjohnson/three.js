export * from './Three.Core.js';

export { WebGLRenderer } from './renderers/WebGLRenderer.js';
export { ShaderLib } from './renderers/shaders/ShaderLib.js';
export { UniformsLib } from './renderers/shaders/UniformsLib.js';
export { UniformsUtils } from './renderers/shaders/UniformsUtils.js';
export { ShaderChunk } from './renderers/shaders/ShaderChunk.js';
export { PMREMGenerator } from './extras/PMREMGenerator.js';
export { WebGLUtils } from './renderers/webgl/WebGLUtils.js';

import { WebGLRenderer } from './renderers/WebGLRenderer.js';
import { default as GLSLNodeBuilder } from './renderers/webgl-fallback/nodes/GLSLNodeBuilder.js';
import { default as NodeMaterial } from './materials/nodes/NodeMaterial.js';
import { ShaderLib } from './renderers/shaders/ShaderLib.js';
import { UniformsLib } from './renderers/shaders/UniformsLib.js';
import { UniformsUtils } from './renderers/shaders/UniformsUtils.js';
import { NodeFrame } from './nodes/Nodes.js';
import { default as NodeLibrary } from './renderers/common/nodes/NodeLibrary.js';

const builders = new WeakMap();
const nodeFrame = /* @__PURE__ */ new NodeFrame();

WebGLRenderer.prototype.library = /* @__PURE__ */ new NodeLibrary();
WebGLRenderer.prototype.overrideNodes = {
	modelViewMatrix: null,
	modelNormalViewMatrix: null
};
WebGLRenderer.prototype.backend = {

	isWebGPUBackend: false

};

NodeMaterial.prototype.toShaderMaterial = function ( renderer, scene, camera, object ) {

	const material = this;

	const nodeBuilder = new GLSLNodeBuilder( object, renderer );
	nodeBuilder.scene = scene;
	nodeBuilder.material = material;
	nodeBuilder.camera = camera;

	const output = nodeBuilder.build();

	let type = material.type;

	// see https://github.com/mrdoob/three.js/issues/23707

	if ( material.isMeshPhysicalNodeMaterial ) type = 'MeshPhysicalNodeMaterial';
	else if ( material.isMeshStandardNodeMaterial ) type = 'MeshStandardNodeMaterial';
	else if ( material.isMeshPhongNodeMaterial ) type = 'MeshPhongNodeMaterial';
	else if ( material.isMeshBasicNodeMaterial ) type = 'MeshBasicNodeMaterial';
	else if ( material.isPointsNodeMaterial ) type = 'PointsNodeMaterial';
	else if ( material.isLineBasicNodeMaterial ) type = 'LineBasicNodeMaterial';

	// shader lib

	const nodeShaderLib = {
		LineBasicNodeMaterial: ShaderLib.basic,
		MeshBasicNodeMaterial: ShaderLib.basic,
		PointsNodeMaterial: ShaderLib.points,
		MeshStandardNodeMaterial: ShaderLib.standard,
		MeshPhysicalNodeMaterial: ShaderLib.physical,
		MeshPhongNodeMaterial: ShaderLib.phong
	};

	let uniforms = {};
	let vertexShader = '';
	let fragmentShader = '';

	if ( nodeShaderLib[ type ] !== undefined ) {

		const shaderLib = nodeShaderLib[ type ];

		uniforms = UniformsUtils.merge( [ shaderLib.uniforms, UniformsLib.lights ] );

	}

	vertexShader = output.vertexShader.replace( '#version 300 es', '' );
	fragmentShader = output.fragmentShader.replace( '#version 300 es', '' );

	builders.set( material, output );

	const shaderMaterial = new RawShaderMaterial( {

		glslVersion: '300 es',
		vertexShader,
		fragmentShader,
		uniforms,

	} );

	shaderMaterial.onBeforeRender = function ( renderer, scene, camera ) {

		const nodeBuilder = builders.get( material );

		if ( nodeBuilder !== undefined ) {

			nodeFrame.material = material;
			nodeFrame.camera = camera;
			nodeFrame.object = object;
			nodeFrame.renderer = renderer;

			const updateNodes = nodeBuilder.updateNodes;

			if ( updateNodes.length > 0 ) {

				// force refresh material uniforms
				renderer.state.useProgram( null );

				// this.uniformsNeedUpdate = true;

				for ( const node of updateNodes ) {

					nodeFrame.updateNode( node );

				}

			}

		}

	};

	return shaderMaterial;

};

export * from './materials/nodes/NodeMaterials.js';
export { default as WebGPURenderer } from './renderers/webgpu/WebGPURenderer.Nodes.js';
export { default as Lighting } from './renderers/common/Lighting.js';
export { default as BundleGroup } from './renderers/common/BundleGroup.js';
export { default as QuadMesh } from './renderers/common/QuadMesh.js';
export { default as PostProcessing } from './renderers/common/PostProcessing.js';
import * as RendererUtils from './renderers/common/RendererUtils.js';
export { RendererUtils };
export { default as StorageTexture } from './renderers/common/StorageTexture.js';
export { default as StorageBufferAttribute } from './renderers/common/StorageBufferAttribute.js';
export { default as StorageInstancedBufferAttribute } from './renderers/common/StorageInstancedBufferAttribute.js';
export { default as IndirectStorageBufferAttribute } from './renderers/common/IndirectStorageBufferAttribute.js';
export { default as IESSpotLight } from './lights/webgpu/IESSpotLight.js';
export { default as ProjectorLight } from './lights/webgpu/ProjectorLight.js';
export { default as NodeLoader } from './loaders/nodes/NodeLoader.js';
export { default as NodeObjectLoader } from './loaders/nodes/NodeObjectLoader.js';
export { default as NodeMaterialLoader } from './loaders/nodes/NodeMaterialLoader.js';
export { ClippingGroup } from './objects/ClippingGroup.js';
export * from './nodes/Nodes.js';
import * as TSL from './nodes/TSL.js';
import { RawShaderMaterial } from './Three.Core.js';
export { TSL };
