/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
import { PointLight, DirectionalLight, RectAreaLight, SpotLight, AmbientLight, HemisphereLight, LightProbe, LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping, AgXToneMapping, NeutralToneMapping, warn, Texture, LinearFilter, ClampToEdgeWrapping } from './three.core.js';
export { AddEquation, AddOperation, AdditiveAnimationBlendMode, AdditiveBlending, AlphaFormat, AlwaysCompare, AlwaysDepth, AlwaysStencilFunc, AnimationAction, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrayCamera, ArrowHelper, AttachedBindMode, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, BackSide, BasicDepthPacking, BasicShadowMap, BatchedMesh, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxGeometry, BoxHelper, BufferAttribute, BufferGeometry, BufferGeometryLoader, ByteType, Cache, Camera, CameraHelper, CanvasTexture, CapsuleGeometry, CatmullRomCurve3, CircleGeometry, Clock, Color, ColorKeyframeTrack, ColorManagement, CompressedArrayTexture, CompressedCubeTexture, CompressedTexture, CompressedTextureLoader, ConeGeometry, ConstantAlphaFactor, ConstantColorFactor, Controls, CubeCamera, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeTextureLoader, CubeUVReflectionMapping, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceBack, CullFaceFront, CullFaceFrontBack, CullFaceNone, Curve, CurvePath, CustomBlending, CustomToneMapping, CylinderGeometry, Cylindrical, Data3DTexture, DataArrayTexture, DataTexture, DataTextureLoader, DataUtils, DecrementStencilOp, DecrementWrapStencilOp, DefaultLoadingManager, DepthFormat, DepthStencilFormat, DepthTexture, DetachedBindMode, DirectionalLightHelper, DiscreteInterpolant, DodecahedronGeometry, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicCopyUsage, DynamicDrawUsage, DynamicReadUsage, EdgesGeometry, EllipseCurve, EqualCompare, EqualDepth, EqualStencilFunc, EquirectangularReflectionMapping, EquirectangularRefractionMapping, Euler, EventDispatcher, ExternalTexture, ExtrudeGeometry, FileLoader, Float16BufferAttribute, Float32BufferAttribute, FloatType, Fog, FogExp2, FramebufferTexture, FrontSide, Frustum, FrustumArray, GLBufferAttribute, GLSL1, GLSL3, GreaterCompare, GreaterDepth, GreaterEqualCompare, GreaterEqualDepth, GreaterEqualStencilFunc, GreaterStencilFunc, GridHelper, Group, HalfFloatType, HemisphereLightHelper, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16BufferAttribute, Int32BufferAttribute, Int8BufferAttribute, IntType, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InterpolationSamplingMode, InterpolationSamplingType, InvertStencilOp, KeepStencilOp, KeyframeTrack, LOD, LatheGeometry, Layers, LessCompare, LessDepth, LessEqualCompare, LessEqualDepth, LessEqualStencilFunc, LessStencilFunc, Light, Line, Line3, LineBasicMaterial, LineCurve, LineCurve3, LineDashedMaterial, LineLoop, LineSegments, LinearInterpolant, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearSRGBColorSpace, LinearTransfer, Loader, LoaderUtils, LoadingManager, LoopOnce, LoopPingPong, LoopRepeat, MOUSE, Material, MaterialLoader, MathUtils, Matrix2, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeverCompare, NeverDepth, NeverStencilFunc, NoBlending, NoColorSpace, NoToneMapping, NormalAnimationBlendMode, NormalBlending, NotEqualCompare, NotEqualDepth, NotEqualStencilFunc, NumberKeyframeTrack, Object3D, ObjectLoader, ObjectSpaceNormalMap, OctahedronGeometry, OneFactor, OneMinusConstantAlphaFactor, OneMinusConstantColorFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, Path, PerspectiveCamera, Plane, PlaneGeometry, PlaneHelper, PointLightHelper, Points, PointsMaterial, PolarGridHelper, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, Quaternion, QuaternionKeyframeTrack, QuaternionLinearInterpolant, RED_GREEN_RGTC2_Format, RED_RGTC1_Format, REVISION, RGBADepthPacking, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBDepthPacking, RGBFormat, RGBIntegerFormat, RGB_BPTC_SIGNED_Format, RGB_BPTC_UNSIGNED_Format, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGDepthPacking, RGFormat, RGIntegerFormat, RawShaderMaterial, Ray, Raycaster, RedFormat, RedIntegerFormat, RenderTarget, RenderTarget3D, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, RingGeometry, SIGNED_RED_GREEN_RGTC2_Format, SIGNED_RED_RGTC1_Format, SRGBColorSpace, SRGBTransfer, Scene, ShaderMaterial, ShadowMaterial, Shape, ShapeGeometry, ShapePath, ShapeUtils, ShortType, Skeleton, SkeletonHelper, SkinnedMesh, Source, Sphere, SphereGeometry, Spherical, SphericalHarmonics3, SplineCurve, SpotLightHelper, Sprite, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, SubtractEquation, SubtractiveBlending, TOUCH, TangentSpaceNormalMap, TetrahedronGeometry, TextureLoader, TextureUtils, Timer, TimestampQuery, TorusGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeGeometry, UVMapping, Uint16BufferAttribute, Uint32BufferAttribute, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Uniform, UniformsGroup, UnsignedByteType, UnsignedInt101111Type, UnsignedInt248Type, UnsignedInt5999Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, VectorKeyframeTrack, VideoFrameTexture, VideoTexture, WebGL3DRenderTarget, WebGLArrayRenderTarget, WebGLCoordinateSystem, WebGLCubeRenderTarget, WebGLRenderTarget, WebGPUCoordinateSystem, WebXRController, WireframeGeometry, WrapAroundEnding, ZeroCurvatureEnding, ZeroFactor, ZeroSlopeEnding, ZeroStencilOp, createCanvasElement, error, getConsoleFunction, log, setConsoleFunction, warnOnce } from './three.core.js';
import { NodeLibrary, MeshPhongNodeMaterial, MeshStandardNodeMaterial, MeshPhysicalNodeMaterial, MeshToonNodeMaterial, MeshBasicNodeMaterial, MeshLambertNodeMaterial, MeshNormalNodeMaterial, MeshMatcapNodeMaterial, LineBasicNodeMaterial, LineDashedNodeMaterial, PointsNodeMaterial, SpriteNodeMaterial, ShadowNodeMaterial, PointLightNode, DirectionalLightNode, RectAreaLightNode, SpotLightNode, AmbientLightNode, HemisphereLightNode, LightProbeNode, IESSpotLightNode, IESSpotLight, ProjectorLightNode, ProjectorLight, linearToneMapping, reinhardToneMapping, cineonToneMapping, acesFilmicToneMapping, agxToneMapping, neutralToneMapping, Renderer, WebGLBackend, WebGPUBackend } from './ClippingGroup-CdFNpee5.js';
export { AONode, AnalyticLightNode, ArrayElementNode, ArrayNode, AssignNode, AttributeNode, BasicEnvironmentNode, BatchNode, BitcastNode, BufferAttributeNode, BufferNode, BumpMapNode, BundleGroup, BypassNode, CacheNode, ClippingGroup, CodeNode, ColorSpaceNode, ComputeNode, ConstNode, ContextNode, ConvertNode, CubeTextureNode, DebugNode, EnvironmentNode, EventNode, ExpressionNode, FrontFacingNode, FunctionCallNode, FunctionNode, FunctionOverloadingNode, GLSLNodeParser, IndexNode, IndirectStorageBufferAttribute, InstanceNode, InstancedMeshNode, IrradianceNode, JoinNode, Lighting, LightingContextNode, LightingModel, LightingNode, LightsNode, Line2NodeMaterial, LoopNode, MRTNode, MaterialNode, MaterialReferenceNode, MaxMipLevelNode, MemberNode, MeshSSSNodeMaterial, ModelNode, MorphNode, Node, NodeAccess, NodeAttribute, NodeBuilder, NodeCache, NodeCode, NodeFrame, NodeFunctionInput, NodeLoader, NodeMaterial, NodeMaterialLoader, NodeMaterialObserver, NodeObjectLoader, NodeShaderStage, NodeType, NodeUniform, NodeUpdateType, NodeUtils, NodeVar, NodeVarying, NormalMapNode, Object3DNode, OutputStructNode, PMREMGenerator, PMREMNode, ParameterNode, PassNode, PhongLightingModel, PhysicalLightingModel, PointUVNode, PostProcessing, PosterizeNode, PropertyNode, QuadMesh, RTTNode, RangeNode, ReferenceNode, ReflectorNode, RemapNode, RenderOutputNode, RendererReferenceNode, RendererUtils, RotateNode, SceneNode, ScreenNode, ScriptableNode, ScriptableValueNode, SetNode, ShadowBaseNode, ShadowNode, SkinningNode, SplitNode, SpriteSheetUVNode, StackNode, StorageArrayElementNode, StorageBufferAttribute, StorageBufferNode, StorageInstancedBufferAttribute, StorageTexture, StorageTextureNode, StructNode, StructTypeNode, SubBuildNode, TSL, TempNode, Texture3DNode, TextureNode, TextureSizeNode, ToneMappingNode, ToonOutlinePassNode, UniformArrayNode, UniformGroupNode, UniformNode, UserDataNode, VarNode, VaryingNode, VertexColorNode, ViewportDepthNode, ViewportDepthTextureNode, ViewportSharedTextureNode, ViewportTextureNode, VolumeNodeMaterial, defaultBuildStages, defaultShaderStages, shaderStages, vectorComponents } from './ClippingGroup-CdFNpee5.js';

/**
 * This version of a node library represents the standard version
 * used in {@link WebGPURenderer}. It maps lights, tone mapping
 * techniques and materials to node-based implementations.
 *
 * @private
 * @augments NodeLibrary
 */
class StandardNodeLibrary extends NodeLibrary {

	/**
	 * Constructs a new standard node library.
	 */
	constructor() {

		super();

		this.addMaterial( MeshPhongNodeMaterial, 'MeshPhongMaterial' );
		this.addMaterial( MeshStandardNodeMaterial, 'MeshStandardMaterial' );
		this.addMaterial( MeshPhysicalNodeMaterial, 'MeshPhysicalMaterial' );
		this.addMaterial( MeshToonNodeMaterial, 'MeshToonMaterial' );
		this.addMaterial( MeshBasicNodeMaterial, 'MeshBasicMaterial' );
		this.addMaterial( MeshLambertNodeMaterial, 'MeshLambertMaterial' );
		this.addMaterial( MeshNormalNodeMaterial, 'MeshNormalMaterial' );
		this.addMaterial( MeshMatcapNodeMaterial, 'MeshMatcapMaterial' );
		this.addMaterial( LineBasicNodeMaterial, 'LineBasicMaterial' );
		this.addMaterial( LineDashedNodeMaterial, 'LineDashedMaterial' );
		this.addMaterial( PointsNodeMaterial, 'PointsMaterial' );
		this.addMaterial( SpriteNodeMaterial, 'SpriteMaterial' );
		this.addMaterial( ShadowNodeMaterial, 'ShadowMaterial' );

		this.addLight( PointLightNode, PointLight );
		this.addLight( DirectionalLightNode, DirectionalLight );
		this.addLight( RectAreaLightNode, RectAreaLight );
		this.addLight( SpotLightNode, SpotLight );
		this.addLight( AmbientLightNode, AmbientLight );
		this.addLight( HemisphereLightNode, HemisphereLight );
		this.addLight( LightProbeNode, LightProbe );
		this.addLight( IESSpotLightNode, IESSpotLight );
		this.addLight( ProjectorLightNode, ProjectorLight );

		this.addToneMapping( linearToneMapping, LinearToneMapping );
		this.addToneMapping( reinhardToneMapping, ReinhardToneMapping );
		this.addToneMapping( cineonToneMapping, CineonToneMapping );
		this.addToneMapping( acesFilmicToneMapping, ACESFilmicToneMapping );
		this.addToneMapping( agxToneMapping, AgXToneMapping );
		this.addToneMapping( neutralToneMapping, NeutralToneMapping );

	}

}

/*
const debugHandler = {

	get: function ( target, name ) {

		// Add |update
		if ( /^(create|destroy)/.test( name ) ) log( 'WebGPUBackend.' + name );

		return target[ name ];

	}

};
*/

/**
 * This renderer is the new alternative of `WebGLRenderer`. `WebGPURenderer` has the ability
 * to target different backends. By default, the renderer tries to use a WebGPU backend if the
 * browser supports WebGPU. If not, `WebGPURenderer` falls backs to a WebGL 2 backend.
 *
 * @augments Renderer
 */
class WebGPURenderer extends Renderer {

	/**
	 * WebGPURenderer options.
	 *
	 * @typedef {Object} WebGPURenderer~Options
	 * @property {boolean} [logarithmicDepthBuffer=false] - Whether logarithmic depth buffer is enabled or not.
	 * @property {boolean} [alpha=true] - Whether the default framebuffer (which represents the final contents of the canvas) should be transparent or opaque.
	 * @property {boolean} [depth=true] - Whether the default framebuffer should have a depth buffer or not.
	 * @property {boolean} [stencil=false] - Whether the default framebuffer should have a stencil buffer or not.
	 * @property {boolean} [antialias=false] - Whether MSAA as the default anti-aliasing should be enabled or not.
	 * @property {number} [samples=0] - When `antialias` is `true`, `4` samples are used by default. Set this parameter to any other integer value than 0 to overwrite the default.
	 * @property {boolean} [forceWebGL=false] - If set to `true`, the renderer uses a WebGL 2 backend no matter if WebGPU is supported or not.
	 * @property {boolean} [multiview=false] - If set to `true`, the renderer will use multiview during WebXR rendering if supported.
	 * @property {number} [outputType=undefined] - Texture type for output to canvas. By default, device's preferred format is used; other formats may incur overhead.
	 * @property {number} [colorBufferType=HalfFloatType] - Defines the type of color buffers. The default `HalfFloatType` is recommend for best
	 * quality. To save memory and bandwidth, `UnsignedByteType` might be used. This will reduce rendering quality though.
	 */

	/**
	 * Constructs a new WebGPU renderer.
	 *
	 * @param {WebGPURenderer~Options} [parameters] - The configuration parameter.
	 */
	constructor( parameters = {} ) {

		let BackendClass;

		if ( parameters.forceWebGL ) {

			BackendClass = WebGLBackend;

		} else {

			BackendClass = WebGPUBackend;

			parameters.getFallback = () => {

				warn( 'WebGPURenderer: WebGPU is not available, running under WebGL2 backend.' );

				return new WebGLBackend( parameters );

			};

		}

		const backend = new BackendClass( parameters );

		//super( new Proxy( backend, debugHandler ) );
		super( backend, parameters );

		/**
		 * The generic default value is overwritten with the
		 * standard node library for type mapping.
		 *
		 * @type {StandardNodeLibrary}
		 */
		this.library = new StandardNodeLibrary();

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isWebGPURenderer = true;

		if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

			__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) );

		}

	}

}

/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments Texture
 */
class Storage3DTexture extends Texture {

	/**
	 * Constructs a new storage texture.
	 *
	 * @param {number} [width=1] - The storage texture's width.
	 * @param {number} [height=1] - The storage texture's height.
	 * @param {number} [depth=1] - The storage texture's depth.
	 */
	constructor( width = 1, height = 1, depth = 1 ) {

		super();

		//inherited from texture. Must be false for 3DTexture
		this.isArrayTexture = false;

		/**
		 * The image object which just represents the texture's dimension.
		 *
		 * @type {{width: number, height: number, depth: number}}
		 */
		this.image = { width, height, depth };

		/**
		 * The default `magFilter` for storage textures is `THREE.LinearFilter`.
		 *
		 * @type {number}
		 */
		this.magFilter = LinearFilter;

		/**
		 * The default `minFilter` for storage textures is `THREE.LinearFilter`.
		 *
		 * @type {number}
		 */
		this.minFilter = LinearFilter;

		/**
		 * This defines how the texture is wrapped in the depth direction and corresponds to
		 * *W* in UVW mapping.
		 *
		 * @type {number}
		 */
		this.wrapR = ClampToEdgeWrapping;

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isStorageTexture = true;

		/**
		 * Indicates whether this texture is a 3D texture.
		 *
		 * @type {boolean}
		 *
		 */
		this.is3DTexture = true;

	}

	/**
	 * Sets the size of the storage 3d texture.
	 *
	 * @param {number} width - The new width of the storage texture.
	 * @param {number} height - The new height of the storage texture.
	 * @param {number} depth - The new depth of the storage texture.
	 */
	setSize( width, height, depth ) {

		if ( this.image.width !== width || this.image.height !== height || this.image.depth !== depth ) {

			this.image.width = width;
			this.image.height = height;
			this.image.depth = depth;

			this.dispose();

		}

	}

}

/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments Texture
 */
class StorageArrayTexture extends Texture {

	/**
	 * Constructs a new storage texture.
	 *
	 * @param {number} [width=1] - The storage texture's width.
	 * @param {number} [height=1] - The storage texture's height.
	 * @param {number} [depth=1] - The storage texture's depth.
	 */
	constructor( width = 1, height = 1, depth = 1 ) {

		super();

		//inherited from texture
		this.isArrayTexture = true;

		/**
		 * The image object which just represents the texture's dimension.
		 *
		 * @type {{width: number, height: number, depth: number}}
		 */
		this.image = { width, height, depth };

		/**
		 * The default `magFilter` for storage textures is `THREE.LinearFilter`.
		 *
		 * @type {number}
		 */
		this.magFilter = LinearFilter;

		/**
		 * The default `minFilter` for storage textures is `THREE.LinearFilter`.
		 *
		 * @type {number}
		 */
		this.minFilter = LinearFilter;

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isStorageTexture = true;

	}

	/**
	 * Sets the size of the storage array texture.
	 *
	 * @param {number} width - The new width of the storage texture.
	 * @param {number} height - The new height of the storage texture.
	 * @param {number} depth - The new depth of the storage texture.
	 */
	setSize( width, height, depth ) {

		if ( this.image.width !== width || this.image.height !== height || this.image.depth !== depth ) {

			this.image.width = width;
			this.image.height = height;
			this.image.depth = depth;

			this.dispose();

		}

	}

}

export { ACESFilmicToneMapping, AgXToneMapping, AmbientLight, AmbientLightNode, CineonToneMapping, ClampToEdgeWrapping, DirectionalLight, DirectionalLightNode, HemisphereLight, HemisphereLightNode, IESSpotLight, IESSpotLightNode, LightProbe, LightProbeNode, LineBasicNodeMaterial, LineDashedNodeMaterial, LinearFilter, LinearToneMapping, MeshBasicNodeMaterial, MeshLambertNodeMaterial, MeshMatcapNodeMaterial, MeshNormalNodeMaterial, MeshPhongNodeMaterial, MeshPhysicalNodeMaterial, MeshStandardNodeMaterial, MeshToonNodeMaterial, NeutralToneMapping, PointLight, PointLightNode, PointsNodeMaterial, ProjectorLight, ProjectorLightNode, RectAreaLight, RectAreaLightNode, ReinhardToneMapping, ShadowNodeMaterial, SpotLight, SpotLightNode, SpriteNodeMaterial, Storage3DTexture, StorageArrayTexture, Texture, WebGPURenderer, warn };
