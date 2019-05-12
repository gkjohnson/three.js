/**
 * @author mrdoob / http://mrdoob.com/
 * @author yomboprime / https://github.com/yomboprime/
 *
 *
 */

THREE.LDrawLoader = ( function () {

	var tempVec0 = new THREE.Vector3();
	var tempVec1 = new THREE.Vector3();
	function smoothNormals( triangles, lineSegments ) {

		function hashVertex( v ) {

			var x = ~ ~ ( v.x * 1e6 );
			var y = ~ ~ ( v.y * 1e6 );
			var z = ~ ~ ( v.z * 1e6 );
			return `${ x },${ y },${ z }`;

		}

		function hashEdge( v0, v1 ) {

			return `${ hashVertex( v0 ) }_${ hashVertex( v1 ) }`;

		}

		var hardEdges = new Set();
		var halfEdgeList = {};
		var fullHalfEdgeList = {};
		var normals = [];

		// Save the list of hard edges by hash
		for ( var i = 0, l = lineSegments.length; i < l; i ++ ) {

			var ls = lineSegments[ i ];
			var v0 = ls.v0;
			var v1 = ls.v1;
			hardEdges.add( hashEdge( v0, v1 ) );
			hardEdges.add( hashEdge( v1, v0 ) );

		}

		// track the half edges associated with each triangle
		for ( var i = 0, l = triangles.length; i < l; i ++ ) {

			var tri = triangles[ i ];
			for ( var i2 = 0, l2 = 3; i2 < l2; i2 ++ ) {

				var index = i2;
				var next = ( i2 + 1 ) % 3;
				var v0 = tri[ `v${ index }` ];
				var v1 = tri[ `v${ next }` ];
				var hash = hashEdge( v0, v1 );

				// don't add the triangle if the edge is supposed to be hard
				if ( hardEdges.has( hash ) ) continue;
				halfEdgeList[ hash ] = tri;
				fullHalfEdgeList[ hash ] = tri;

			}

		}

		// Iterate until we've tried to connect all triangles to share normals
		while ( true ) {

			// Stop if there are no more triangles left
			var halfEdges = Object.keys( halfEdgeList );
			if ( halfEdges.length === 0 ) break;

			// Exhaustively find all connected triangles
			var i = 0;
			var queue = [ fullHalfEdgeList[ halfEdges[ 0 ] ] ];
			while ( i < queue.length ) {

				// initialize all vertex normals in this triangle
				var tri = queue[ i ];
				i ++;

				var faceNormal = tri.faceNormal;
				if ( tri.n0 === null ) {

					tri.n0 = faceNormal.clone();
					normals.push( tri.n0 );

				}

				if ( tri.n1 === null ) {

					tri.n1 = faceNormal.clone();
					normals.push( tri.n1 );

				}

				if ( tri.n2 === null ) {

					tri.n2 = faceNormal.clone();
					normals.push( tri.n2 );

				}

				// Check if any edge is connected to another triangle edge
				for ( var i2 = 0, l2 = 3; i2 < l2; i2 ++ ) {

					var index = i2;
					var next = ( i2 + 1 ) % 3;
					var v0 = tri[ `v${ index }` ];
					var v1 = tri[ `v${ next }` ];

					// delete this triangle from the list so it won't be found again
					var hash = hashEdge( v0, v1 );
					delete halfEdgeList[ hash ];

					var reverseHash = hashEdge( v1, v0 );
					var otherTri = fullHalfEdgeList[ reverseHash ];
					if ( otherTri ) {

						// if this triangle has already been traversed then it won't be in
						// the halfEdgeList. If it has not then add it to the queue and delete
						// it so it won't be found again.
						if ( reverseHash in halfEdgeList ) {

							queue.push( otherTri );
							delete halfEdgeList[ reverseHash ];

						}

						// Find the matching edge in this triangle and copy the normal vector over
						for ( var i3 = 0, l3 = 3; i3 < l3; i3 ++ ) {

							var otherIndex = i3;
							var otherNext = ( i3 + 1 ) % 3;
							var otherV0 = otherTri[ `v${ otherIndex }` ];
							var otherV1 = otherTri[ `v${ otherNext }` ];

							var otherHash = hashEdge( otherV0, otherV1 );
							if ( otherHash === reverseHash ) {

								otherTri[ `n${ otherIndex }` ] = tri[ `n${ next }` ];
								otherTri[ `n${ otherNext }` ] = tri[ `n${ index }` ];

								tri[ `n${ next }` ].add( otherTri.faceNormal );
								tri[ `n${ index }` ].add( otherTri.faceNormal );
								break;

							}

						}

					}

				}

			}

		}

		// The normals of each face have been added up so now we average them by normalizing the vector.
		for ( var i = 0, l = normals.length; i < l; i ++ ) {

			normals[ i ].normalize();

		}

	}

	function isPrimitiveType( type ) {

		return /primitive/i.test( type ) || type === 'Subpart';

	}

	function LineParser( line, lineNumber ) {

		this.line = line;
		this.lineLength = line.length;
		this.currentCharIndex = 0;
		this.currentChar = ' ';
		this.lineNumber = lineNumber;

	}

	LineParser.prototype = {

		constructor: LineParser,

		seekNonSpace: function () {

			while ( this.currentCharIndex < this.lineLength ) {

				this.currentChar = this.line.charAt( this.currentCharIndex );

				if ( this.currentChar !== ' ' && this.currentChar !== '\t' ) {

					return;

				}

				this.currentCharIndex ++;

			}

		},

		getToken: function () {

			var pos0 = this.currentCharIndex ++;

			// Seek space
			while ( this.currentCharIndex < this.lineLength ) {

				this.currentChar = this.line.charAt( this.currentCharIndex );

				if ( this.currentChar === ' ' || this.currentChar === '\t' ) {

					break;

				}

				this.currentCharIndex ++;

			}

			var pos1 = this.currentCharIndex;

			this.seekNonSpace();

			return this.line.substring( pos0, pos1 );

		},

		getRemainingString: function () {

			return this.line.substring( this.currentCharIndex, this.lineLength );

		},

		isAtTheEnd: function () {

			return this.currentCharIndex >= this.lineLength;

		},

		setToEnd: function () {

			this.currentCharIndex = this.lineLength;

		},

		getLineNumberString: function () {

			return this.lineNumber >= 0 ? " at line " + this.lineNumber : "";

		}


	};

	function sortByMaterial( a, b ) {

		if ( a.colourCode === b.colourCode ) {

			return 0;

		}

		if ( a.colourCode < b.colourCode ) {

			return - 1;

		}

		return 1;

	}

	function createObject( elements, elementSize ) {

		// Creates a THREE.LineSegments (elementSize = 2) or a THREE.Mesh (elementSize = 3 )
		// With per face / segment material, implemented with mesh groups and materials array

		// Sort the triangles or line segments by colour code to make later the mesh groups
		elements.sort( sortByMaterial );

		var positions = [];
		var normals = [];
		var materials = [];

		var bufferGeometry = new THREE.BufferGeometry();
		var prevMaterial = null;
		var index0 = 0;
		var numGroupVerts = 0;

		for ( var iElem = 0, nElem = elements.length; iElem < nElem; iElem ++ ) {

			var elem = elements[ iElem ];
			var v0 = elem.v0;
			var v1 = elem.v1;
			// Note that LDraw coordinate system is rotated 180 deg. in the X axis w.r.t. Three.js's one
			positions.push( v0.x, v0.y, v0.z, v1.x, v1.y, v1.z );
			if ( elementSize === 3 ) {

				positions.push( elem.v2.x, elem.v2.y, elem.v2.z );

				var n0 = elem.n0 || elem.faceNormal;
				var n1 = elem.n1 || elem.faceNormal;
				var n2 = elem.n2 || elem.faceNormal;
				normals.push( n0.x, n0.y, n0.z );
				normals.push( n1.x, n1.y, n1.z );
				normals.push( n2.x, n2.y, n2.z );

			}

			if ( prevMaterial !== elem.material ) {

				if ( prevMaterial !== null ) {

					bufferGeometry.addGroup( index0, numGroupVerts, materials.length - 1 );

				}

				materials.push( elem.material );

				prevMaterial = elem.material;
				index0 = iElem * elementSize;
				numGroupVerts = elementSize;

			} else {

				numGroupVerts += elementSize;

			}

		}

		if ( numGroupVerts > 0 ) {

			bufferGeometry.addGroup( index0, Infinity, materials.length - 1 );

		}

		bufferGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

		if ( elementSize === 3 ) {

			bufferGeometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );

		}

		var object3d = null;

		if ( elementSize === 2 ) {

			object3d = new THREE.LineSegments( bufferGeometry, materials );

		} else if ( elementSize === 3 ) {

			object3d = new THREE.Mesh( bufferGeometry, materials );

		}

		return object3d;

	}

	//

	function LDrawLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

		// This is a stack of 'parse scopes' with one level per subobject loaded file.
		// Each level contains a material lib and also other runtime variables passed between parent and child subobjects
		// When searching for a material code, the stack is read from top of the stack to bottom
		// Each material library is an object map keyed by colour codes.
		this.parseScopesStack = null;

		this.path = '';

		// Array of THREE.Material
		this.materials = [];

		// Not using THREE.Cache here because it returns the previous HTML error response instead of calling onError()
		// This also allows to handle the embedded text files ("0 FILE" lines)
		this.subobjectCache = {};

		// This object is a map from file names to paths. It agilizes the paths search. If it is not set then files will be searched by trial and error.
		this.fileMap = null;

		// Add default main triangle and line edge materials (used in piecess that can be coloured with a main color)
		this.setMaterials( [
			this.parseColourMetaDirective( new LineParser( "Main_Colour CODE 16 VALUE #FF8080 EDGE #333333" ) ),
			this.parseColourMetaDirective( new LineParser( "Edge_Colour CODE 24 VALUE #A0A0A0 EDGE #333333" ) )
		] );

		// If this flag is set to true, each subobject will be a THREE.Object.
		// If not (the default), only one object which contains all the merged primitives will be created.
		this.separateObjects = false;

	}

	// Special surface finish tag types.
	// Note: "MATERIAL" tag (e.g. GLITTER, SPECKLE) is not implemented
	LDrawLoader.FINISH_TYPE_DEFAULT = 0;
	LDrawLoader.FINISH_TYPE_CHROME = 1;
	LDrawLoader.FINISH_TYPE_PEARLESCENT = 2;
	LDrawLoader.FINISH_TYPE_RUBBER = 3;
	LDrawLoader.FINISH_TYPE_MATTE_METALLIC = 4;
	LDrawLoader.FINISH_TYPE_METAL = 5;

	// State machine to search a subobject path.
	// The LDraw standard establishes these various possible subfolders.
	LDrawLoader.FILE_LOCATION_AS_IS = 0;
	LDrawLoader.FILE_LOCATION_TRY_PARTS = 1;
	LDrawLoader.FILE_LOCATION_TRY_P = 2;
	LDrawLoader.FILE_LOCATION_TRY_MODELS = 3;
	LDrawLoader.FILE_LOCATION_TRY_RELATIVE = 4;
	LDrawLoader.FILE_LOCATION_TRY_ABSOLUTE = 5;
	LDrawLoader.FILE_LOCATION_NOT_FOUND = 6;

	LDrawLoader.prototype = {

		constructor: LDrawLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			if ( ! this.fileMap ) {

				this.fileMap = {};

			}

			var scope = this;

			var fileLoader = new THREE.FileLoader( this.manager );
			fileLoader.setPath( this.path );
			fileLoader.load( url, function ( text ) {

				processObject( text, onLoad );

			}, onProgress, onError );

			function processObject( text, onProcessed, subobject ) {

				var parseScope = scope.newParseScopeLevel();
				parseScope.url = url;

				var parentParseScope = scope.getParentParseScope();

				// Set current matrix
				if ( subobject ) {

					parseScope.currentMatrix.multiplyMatrices( parentParseScope.currentMatrix, subobject.matrix );
					parseScope.matrix.copy( subobject.matrix );
					parseScope.inverted = subobject.inverted;

				}

				// Add to cache
				var currentFileName = parentParseScope.currentFileName;
				if ( currentFileName !== null ) {

					currentFileName = parentParseScope.currentFileName.toLowerCase();

				}

				if ( scope.subobjectCache[ currentFileName ] === undefined ) {

					scope.subobjectCache[ currentFileName ] = text;

				}


				// Parse the object (returns a THREE.Group)
				scope.parse( text );
				var finishedCount = 0;
				onSubobjectFinish();

				function onSubobjectFinish() {

					finishedCount ++;

					if ( finishedCount === parseScope.subobjects.length + 1 ) {

						finalizeObject();

					} else {

						// Once the previous subobject has finished we can start processing the next one in the list.
						// The subobject processing shares scope in processing so it's important that they be loaded serially
						// to avoid race conditions.
						// Promise.resolve is used as an approach to asynchronously schedule a task _before_ this frame ends to
						// avoid stack overflow exceptions when loading many subobjects from the cache. RequestAnimationFrame
						// will work but causes the load to happen after the next frame which causes the load to take significantly longer.
						var subobject = parseScope.subobjects[ parseScope.subobjectIndex ];
						Promise.resolve().then( function () {

							loadSubobject( subobject );

						} );
						parseScope.subobjectIndex ++;

					}

				}

				function finalizeObject() {

					if ( parseScope.type === 'Part' ) {

						smoothNormals( parseScope.triangles, parseScope.lineSegments );

					}

					var isRoot = ! parentParseScope.isFromParse;
					if ( scope.separateObjects && ! isPrimitiveType( parseScope.type ) || isRoot ) {


						const objGroup = parseScope.groupObject;
						if ( parseScope.triangles.length > 0 ) {

							objGroup.add( createObject( parseScope.triangles, 3 ) );

						}

						if ( parseScope.lineSegments.length > 0 ) {

							objGroup.add( createObject( parseScope.lineSegments, 2 ) );

						}

						// if ( parseScope.optionalSegments.length > 0 ) {

						// 	objGroup.add( createObject( parseScope.optionalSegments, 2 ) );

						// }

						if ( parentParseScope.groupObject ) {

							objGroup.name = parseScope.fileName;
							objGroup.matrix.copy( parseScope.matrix );
							objGroup.matrix.decompose( objGroup.position, objGroup.quaternion, objGroup.scale );
							objGroup.matrixAutoUpdate = false;

							parentParseScope.groupObject.add( objGroup );

						}

					} else {

						if ( scope.separateObjects ) {

							// TODO: get normal matrix here
							parseScope.triangles.forEach( ls => {

							} );

						}

						var separateObjects = scope.separateObjects;
						var parentLineSegments = parentParseScope.lineSegments;
						var parentOptionalSegments = parentParseScope.optionalSegments;
						var parentTriangles = parentParseScope.triangles;

						var lineSegments = parseScope.lineSegments;
						var optionalSegments = parseScope.optionalSegments;
						var triangles = parseScope.triangles;

						for ( var i = 0, l = lineSegments.length; i < l; i ++ ) {

							var ls = lineSegments[ i ];
							if ( separateObjects ) {

								ls.v0.applyMatrix4( parseScope.matrix );
								ls.v1.applyMatrix4( parseScope.matrix );

							}
							parentLineSegments.push( ls );

						}

						for ( var i = 0, l = optionalSegments.length; i < l; i ++ ) {

							var os = optionalSegments[ i ];
							if ( separateObjects ) {

								os.v0.applyMatrix4( parseScope.matrix );
								os.v1.applyMatrix4( parseScope.matrix );

							}
							parentOptionalSegments.push( os );

						}

						for ( var i = 0, l = triangles.length; i < l; i ++ ) {

							var tri = triangles[ i ];
							if ( separateObjects ) {

								tri.v0 = tri.v0.clone().applyMatrix4( parseScope.matrix );
								tri.v1 = tri.v1.clone().applyMatrix4( parseScope.matrix );
								tri.v2 = tri.v2.clone().applyMatrix4( parseScope.matrix );
								// TODO: handle the normal scaling here

							}
							parentTriangles.push( tri );

						}

					}

					scope.removeScopeLevel();

					if ( onProcessed ) {

						onProcessed( parseScope.groupObject );

					}

				}

				function loadSubobject( subobject ) {

					parseScope.mainColourCode = subobject.material.userData.code;
					parseScope.mainEdgeColourCode = subobject.material.userData.edgeMaterial.userData.code;
					parseScope.currentFileName = subobject.originalFileName;


					// If subobject was cached previously, use the cached one
					var cached = scope.subobjectCache[ subobject.originalFileName.toLowerCase() ];
					if ( cached ) {

						processObject( cached, function ( subobjectGroup ) {

							onSubobjectLoaded( subobjectGroup, subobject );
							onSubobjectFinish();

						}, subobject );

						return;

					}

					// Adjust file name to locate the subobject file path in standard locations (always under directory scope.path)
					// Update also subobject.locationState for the next try if this load fails.
					var subobjectURL = subobject.fileName;
					var newLocationState = LDrawLoader.FILE_LOCATION_NOT_FOUND;

					switch ( subobject.locationState ) {

						case LDrawLoader.FILE_LOCATION_AS_IS:
							newLocationState = subobject.locationState + 1;
							break;

						case LDrawLoader.FILE_LOCATION_TRY_PARTS:
							subobjectURL = 'parts/' + subobjectURL;
							newLocationState = subobject.locationState + 1;
							break;

						case LDrawLoader.FILE_LOCATION_TRY_P:
							subobjectURL = 'p/' + subobjectURL;
							newLocationState = subobject.locationState + 1;
							break;

						case LDrawLoader.FILE_LOCATION_TRY_MODELS:
							subobjectURL = 'models/' + subobjectURL;
							newLocationState = subobject.locationState + 1;
							break;

						case LDrawLoader.FILE_LOCATION_TRY_RELATIVE:
							subobjectURL = url.substring( 0, url.lastIndexOf( "/" ) + 1 ) + subobjectURL;
							newLocationState = subobject.locationState + 1;
							break;

						case LDrawLoader.FILE_LOCATION_TRY_ABSOLUTE:

							if ( subobject.triedLowerCase ) {

								// Try absolute path
								newLocationState = LDrawLoader.FILE_LOCATION_NOT_FOUND;

							} else {

								// Next attempt is lower case
								subobject.fileName = subobject.fileName.toLowerCase();
								subobjectURL = subobject.fileName;
								subobject.triedLowerCase = true;
								newLocationState = LDrawLoader.FILE_LOCATION_AS_IS;

							}
							break;

						case LDrawLoader.FILE_LOCATION_NOT_FOUND:

							// All location possibilities have been tried, give up loading this object
							console.warn( 'LDrawLoader: Subobject "' + subobject.originalFileName + '" could not be found.' );

							return;

					}

					subobject.locationState = newLocationState;
					subobject.url = subobjectURL;

					// Load the subobject
					// Use another file loader here so we can keep track of the subobject information
					// and use it when processing the next model.
					var fileLoader = new THREE.FileLoader( scope.manager );
					fileLoader.setPath( scope.path );
					fileLoader.load( subobjectURL, function ( text ) {

						processObject( text, function ( subobjectGroup ) {

							onSubobjectLoaded( subobjectGroup, subobject );
							onSubobjectFinish();

						}, subobject );

					}, undefined, function ( err ) {

						onSubobjectError( err, subobject );

					}, subobject );

				}

				function onSubobjectLoaded( subobjectGroup, subobject ) {

					if ( subobjectGroup === null ) {

						// Try to reload
						loadSubobject( subobject );
						return;

					}

					scope.fileMap[ subobject.originalFileName ] = subobject.url;

				}

				function onSubobjectError( err, subobject ) {

					// Retry download from a different default possible location
					loadSubobject( subobject );

				}

			}

		},

		setPath: function ( value ) {

			this.path = value;

			return this;

		},

		setMaterials: function ( materials ) {

			// Clears parse scopes stack, adds new scope with material library

			this.parseScopesStack = [];

			this.newParseScopeLevel( materials );

			this.getCurrentParseScope().isFromParse = false;

			this.materials = materials;

			return this;

		},

		setFileMap: function ( fileMap ) {

			this.fileMap = fileMap;

			return this;

		},

		newParseScopeLevel: function ( materials ) {

			// Adds a new scope level, assign materials to it and returns it

			var matLib = {};

			if ( materials ) {

				for ( var i = 0, n = materials.length; i < n; i ++ ) {

					var material = materials[ i ];
					matLib[ material.userData.code ] = material;

				}

			}

			var topParseScope = this.getCurrentParseScope();
			var newParseScope = {

				lib: matLib,
				url: null,

				// Subobjects
				subobjects: null,
				numSubobjects: 0,
				subobjectIndex: 0,
				inverted: false,

				// Current subobject
				currentFileName: null,
				mainColourCode: topParseScope ? topParseScope.mainColourCode : '16',
				mainEdgeColourCode: topParseScope ? topParseScope.mainEdgeColourCode : '24',
				currentMatrix: new THREE.Matrix4(),
				matrix: new THREE.Matrix4(),

				// If false, it is a root material scope previous to parse
				isFromParse: true,

				triangles: null,
				lineSegments: null,
				optionalSegments: null,
			};

			this.parseScopesStack.push( newParseScope );

			return newParseScope;

		},

		removeScopeLevel: function () {

			this.parseScopesStack.pop();

			return this;

		},

		addMaterial: function ( material ) {

			// Adds a material to the material library which is on top of the parse scopes stack. And also to the materials array

			var matLib = this.getCurrentParseScope().lib;

			if ( ! matLib[ material.userData.code ] ) {

				this.materials.push( material );

			}

			matLib[ material.userData.code ] = material;

			return this;

		},

		getMaterial: function ( colourCode ) {

			// Given a colour code search its material in the parse scopes stack

			if ( colourCode.startsWith( "0x2" ) ) {

				// Special 'direct' material value (RGB colour)

				var colour = colourCode.substring( 3 );

				return this.parseColourMetaDirective( new LineParser( "Direct_Color_" + colour + " CODE -1 VALUE #" + colour + " EDGE #" + colour + "" ) );

			}

			for ( var i = this.parseScopesStack.length - 1; i >= 0; i -- ) {

				var material = this.parseScopesStack[ i ].lib[ colourCode ];

				if ( material ) {

					return material;

				}

			}

			// Material was not found
			return null;

		},

		getParentParseScope: function () {

			if ( this.parseScopesStack.length > 1 ) {

				return this.parseScopesStack[ this.parseScopesStack.length - 2 ];

			}

			return null;

		},

		getCurrentParseScope: function () {

			if ( this.parseScopesStack.length > 0 ) {

				return this.parseScopesStack[ this.parseScopesStack.length - 1 ];

			}

			return null;

		},

		parseColourMetaDirective: function ( lineParser ) {

			// Parses a colour definition and returns a THREE.Material or null if error

			var code = null;

			// Triangle and line colours
			var colour = 0xFF00FF;
			var edgeColour = 0xFF00FF;

			// Transparency
			var alpha = 1;
			var isTransparent = false;
			// Self-illumination:
			var luminance = 0;

			var finishType = LDrawLoader.FINISH_TYPE_DEFAULT;
			var canHaveEnvMap = true;

			var edgeMaterial = null;

			var name = lineParser.getToken();
			if ( ! name ) {

				throw 'LDrawLoader: Material name was expected after "!COLOUR tag' + lineParser.getLineNumberString() + ".";

			}

			// Parse tag tokens and their parameters
			var token = null;
			while ( true ) {

				token = lineParser.getToken();

				if ( ! token ) {

					break;

				}

				switch ( token.toUpperCase() ) {

					case "CODE":

						code = lineParser.getToken();
						break;

					case "VALUE":

						colour = lineParser.getToken();
						if ( colour.startsWith( '0x' ) ) {

							colour = '#' + colour.substring( 2 );

						} else if ( ! colour.startsWith( '#' ) ) {

							throw 'LDrawLoader: Invalid colour while parsing material' + lineParser.getLineNumberString() + ".";

						}
						break;

					case "EDGE":

						edgeColour = lineParser.getToken();
						if ( edgeColour.startsWith( '0x' ) ) {

							edgeColour = '#' + edgeColour.substring( 2 );

						} else if ( ! edgeColour.startsWith( '#' ) ) {

							// Try to see if edge colour is a colour code
							edgeMaterial = this.getMaterial( edgeColour );
							if ( ! edgeMaterial ) {

								throw 'LDrawLoader: Invalid edge colour while parsing material' + lineParser.getLineNumberString() + ".";

							}

							// Get the edge material for this triangle material
							edgeMaterial = edgeMaterial.userData.edgeMaterial;

						}
						break;

					case 'ALPHA':

						alpha = parseInt( lineParser.getToken() );

						if ( isNaN( alpha ) ) {

							throw 'LDrawLoader: Invalid alpha value in material definition' + lineParser.getLineNumberString() + ".";

						}

						alpha = Math.max( 0, Math.min( 1, alpha / 255 ) );

						if ( alpha < 1 ) {

							isTransparent = true;

						}

						break;

					case 'LUMINANCE':

						luminance = parseInt( lineParser.getToken() );

						if ( isNaN( luminance ) ) {

							throw 'LDrawLoader: Invalid luminance value in material definition' + LineParser.getLineNumberString() + ".";

						}

						luminance = Math.max( 0, Math.min( 1, luminance / 255 ) );

						break;

					case 'CHROME':
						finishType = LDrawLoader.FINISH_TYPE_CHROME;
						break;

					case 'PEARLESCENT':
						finishType = LDrawLoader.FINISH_TYPE_PEARLESCENT;
						break;

					case 'RUBBER':
						finishType = LDrawLoader.FINISH_TYPE_RUBBER;
						break;

					case 'MATTE_METALLIC':
						finishType = LDrawLoader.FINISH_TYPE_MATTE_METALLIC;
						break;

					case 'METAL':
						finishType = LDrawLoader.FINISH_TYPE_METAL;
						break;

					case 'MATERIAL':
						// Not implemented
						lineParser.setToEnd();
						break;

					default:
						throw 'LDrawLoader: Unknown token "' + token + '" while parsing material' + lineParser.getLineNumberString() + ".";
						break;

				}

			}

			var material = null;

			switch ( finishType ) {

				case LDrawLoader.FINISH_TYPE_DEFAULT:

					material = new THREE.MeshStandardMaterial( { color: colour, roughness: 0.3, envMapIntensity: 0.3, metalness: 0 } );
					break;

				case LDrawLoader.FINISH_TYPE_PEARLESCENT:

					// Try to imitate pearlescency by setting the specular to the complementary of the color, and low shininess
					var specular = new THREE.Color( colour );
					var hsl = specular.getHSL( { h: 0, s: 0, l: 0 } );
					hsl.h = ( hsl.h + 0.5 ) % 1;
					hsl.l = Math.min( 1, hsl.l + ( 1 - hsl.l ) * 0.7 );
					specular.setHSL( hsl.h, hsl.s, hsl.l );

					material = new THREE.MeshPhongMaterial( { color: colour, specular: specular, shininess: 10, reflectivity: 0.3 } );
					break;

				case LDrawLoader.FINISH_TYPE_CHROME:

					// Mirror finish surface
					material = new THREE.MeshStandardMaterial( { color: colour, roughness: 0, metalness: 1 } );
					break;

				case LDrawLoader.FINISH_TYPE_RUBBER:

					// Rubber is best simulated with Lambert
					material = new THREE.MeshStandardMaterial( { color: colour, roughness: 0.9, metalness: 0 } );
					canHaveEnvMap = false;
					break;

				case LDrawLoader.FINISH_TYPE_MATTE_METALLIC:

					// Brushed metal finish
					material = new THREE.MeshStandardMaterial( { color: colour, roughness: 0.8, metalness: 0.4 } );
					break;

				case LDrawLoader.FINISH_TYPE_METAL:

					// Average metal finish
					material = new THREE.MeshStandardMaterial( { color: colour, roughness: 0.2, metalness: 0.85 } );
					break;

				default:
					// Should not happen
					break;

			}

			material.transparent = isTransparent;
			material.opacity = alpha;

			material.userData.canHaveEnvMap = canHaveEnvMap;

			if ( luminance !== 0 ) {

				material.emissive.set( material.color ).multiplyScalar( luminance );

			}

			if ( ! edgeMaterial ) {

				// This is the material used for edges
				edgeMaterial = new THREE.LineBasicMaterial( { color: edgeColour } );
				edgeMaterial.userData.code = code;
				edgeMaterial.name = name + " - Edge";
				edgeMaterial.userData.canHaveEnvMap = false;

			}

			material.userData.code = code;
			material.name = name;

			material.userData.edgeMaterial = edgeMaterial;

			return material;

		},

		//

		parse: function ( text ) {

			//console.time( 'LDrawLoader' );

			// Retrieve data from the parent parse scope
			var parentParseScope = this.getParentParseScope();

			// Main colour codes passed to this subobject (or default codes 16 and 24 if it is the root object)
			var mainColourCode = parentParseScope.mainColourCode;
			var mainEdgeColourCode = parentParseScope.mainEdgeColourCode;

			var url = parentParseScope.url;

			var currentParseScope = this.getCurrentParseScope();

			// Parse result variables
			var triangles;
			var lineSegments;
			var optionalSegments;

			var subobjects = [];

			var category = null;
			var keywords = null;

			if ( text.indexOf( '\r\n' ) !== - 1 ) {

				// This is faster than String.split with regex that splits on both
				text = text.replace( /\r\n/g, '\n' );

			}

			var lines = text.split( '\n' );
			var numLines = lines.length;
			var lineIndex = 0;

			var parsingEmbeddedFiles = false;
			var currentEmbeddedFileName = null;
			var currentEmbeddedText = null;

			var bfcCertified = false;
			var bfcCCW = true;
			var bfcInverted = false;
			var bfcCull = true;
			var type = '';

			var scope = this;
			function parseColourCode( lineParser, forEdge ) {

				// Parses next colour code and returns a THREE.Material

				var colourCode = lineParser.getToken();

				if ( ! forEdge && colourCode === '16' ) {

					colourCode = mainColourCode;

				}
				if ( forEdge && colourCode === '24' ) {

					colourCode = mainEdgeColourCode;

				}

				var material = scope.getMaterial( colourCode );

				if ( ! material ) {

					throw 'LDrawLoader: Unknown colour code "' + colourCode + '" is used' + lineParser.getLineNumberString() + ' but it was not defined previously.';

				}

				return material;

			}

			function parseVector( lp ) {

				var v = new THREE.Vector3( parseFloat( lp.getToken() ), parseFloat( lp.getToken() ), parseFloat( lp.getToken() ) );

				if ( ! scope.separateObjects ) {

					v.applyMatrix4( currentParseScope.currentMatrix );

				}

				return v;

			}

			// Parse all line commands
			for ( lineIndex = 0; lineIndex < numLines; lineIndex ++ ) {

				var line = lines[ lineIndex ];

				if ( line.length === 0 ) continue;

				if ( parsingEmbeddedFiles ) {

					if ( line.startsWith( '0 FILE ' ) ) {

						// Save previous embedded file in the cache
						this.subobjectCache[ currentEmbeddedFileName.toLowerCase() ] = currentEmbeddedText;

						// New embedded text file
						currentEmbeddedFileName = line.substring( 7 );
						currentEmbeddedText = '';

					} else {

						currentEmbeddedText += line + '\n';

					}

					continue;

				}

				var lp = new LineParser( line, lineIndex + 1 );

				lp.seekNonSpace();

				if ( lp.isAtTheEnd() ) {

					// Empty line
					continue;

				}

				// Parse the line type
				var lineType = lp.getToken();

				switch ( lineType ) {

					// Line type 0: Comment or META
					case '0':

						// Parse meta directive
						var meta = lp.getToken();

						if ( meta ) {

							switch ( meta ) {

								case '!LDRAW_ORG':

									type = lp.getToken();

									if ( ! parsingEmbeddedFiles ) {

										currentParseScope.triangles = [];
										currentParseScope.lineSegments = [];
										currentParseScope.optionalSegments = [];
										currentParseScope.type = type;

										var isRoot = ! parentParseScope.isFromParse;
										if ( isRoot || scope.separateObjects && ! isPrimitiveType( type ) ) {

											currentParseScope.groupObject = new THREE.Group();

										}

										// If the scale of the object is negated then the triangle winding order
										// needs to be flipped.
										var matrix = currentParseScope.matrix;
										if (
											matrix.determinant() < 0 && (
												scope.separateObjects && isPrimitiveType( type ) ||
												! scope.separateObjects
											) ) {

											currentParseScope.inverted = ! currentParseScope.inverted;

										}

										triangles = currentParseScope.triangles;
										lineSegments = currentParseScope.lineSegments;
										optionalSegments = currentParseScope.optionalSegments;

									}

									break;

								case '!COLOUR':

									var material = this.parseColourMetaDirective( lp );
									if ( material ) {

										this.addMaterial( material );

									}	else {

										console.warn( 'LDrawLoader: Error parsing material' + lp.getLineNumberString() );

									}
									break;

								case '!CATEGORY':

									category = lp.getToken();
									break;

								case '!KEYWORDS':

									var newKeywords = lp.getRemainingString().split( ',' );
									if ( newKeywords.length > 0 ) {

										if ( ! keywords ) {

											keywords = [];

										}

										newKeywords.forEach( function ( keyword ) {

											keywords.push( keyword.trim() );

										} );

									}
									break;

								case 'FILE':

									if ( lineIndex > 0 ) {

										// Start embedded text files parsing
										parsingEmbeddedFiles = true;
										currentEmbeddedFileName = lp.getRemainingString();
										currentEmbeddedText = '';

										bfcCertified = false;
										bfcCCW = true;

									}

									break;

								case 'BFC':

									// Changes to the backface culling state
									while ( ! lp.isAtTheEnd() ) {

										var token = lp.getToken();

										switch ( token ) {

											case 'CERTIFY':
											case 'NOCERTIFY':

												bfcCertified = token === 'CERTIFY';
												bfcCCW = true;

												break;

											case 'CW':
											case 'CCW':

												bfcCCW = token === 'CCW';

												break;

											case 'INVERTNEXT':

												bfcInverted = true;

												break;

											case 'CLIP':
											case 'NOCLIP':

											  bfcCull = token === 'CLIP';

												break;

											default:

												console.warn( 'THREE.LDrawLoader: BFC directive "' + token + '" is unknown.' );

												break;

										}

									}

									break;

								default:
									// Other meta directives are not implemented
									break;

							}

						}

						break;

					// Line type 1: Sub-object file
					case '1':

						var material = parseColourCode( lp );

						var posX = parseFloat( lp.getToken() );
						var posY = parseFloat( lp.getToken() );
						var posZ = parseFloat( lp.getToken() );
						var m0 = parseFloat( lp.getToken() );
						var m1 = parseFloat( lp.getToken() );
						var m2 = parseFloat( lp.getToken() );
						var m3 = parseFloat( lp.getToken() );
						var m4 = parseFloat( lp.getToken() );
						var m5 = parseFloat( lp.getToken() );
						var m6 = parseFloat( lp.getToken() );
						var m7 = parseFloat( lp.getToken() );
						var m8 = parseFloat( lp.getToken() );

						var matrix = new THREE.Matrix4().set(
							m0, m1, m2, posX,
							m3, m4, m5, posY,
							m6, m7, m8, posZ,
							0, 0, 0, 1
						);

						var fileName = lp.getRemainingString().trim().replace( "\\", "/" );

						if ( scope.fileMap[ fileName ] ) {

							// Found the subobject path in the preloaded file path map
							fileName = scope.fileMap[ fileName ];

						}	else {

							// Standardized subfolders
							if ( fileName.startsWith( 's/' ) ) {

								fileName = 'parts/' + fileName;

							} else if ( fileName.startsWith( '48/' ) ) {

								fileName = 'p/' + fileName;

							}

						}

						subobjects.push( {
							material: material,
							matrix: matrix,
							fileName: fileName,
							originalFileName: fileName,
							locationState: LDrawLoader.FILE_LOCATION_AS_IS,
							url: null,
							triedLowerCase: false,
							inverted: bfcInverted !== currentParseScope.inverted
						} );

						bfcInverted = false;

						break;

					// Line type 2: Line segment
					// Line type 5: Optional Line segment
					case '2':
					case '5':

						var material = parseColourCode( lp, true );
						var arr = lineType === '2' ? lineSegments : optionalSegments;

						arr.push( {
							material: material.userData.edgeMaterial,
							colourCode: material.userData.code,
							v0: parseVector( lp ),
							v1: parseVector( lp )
						} );

						break;

					// Line type 3: Triangle
					case '3':

						var material = parseColourCode( lp );

						var inverted = currentParseScope.inverted;
						var ccw = bfcCCW !== inverted;
						var doubleSided = ! bfcCertified || ! bfcCull;
						var v0, v1, v2, faceNormal;

						if ( ccw === true ) {

							v0 = parseVector( lp );
							v1 = parseVector( lp );
							v2 = parseVector( lp );

						} else {

							v2 = parseVector( lp );
							v1 = parseVector( lp );
							v0 = parseVector( lp );

						}

						tempVec0.subVectors( v1, v0 );
						tempVec1.subVectors( v2, v1 );
						faceNormal = new THREE.Vector3()
							.crossVectors( tempVec0, tempVec1 )
							.normalize();

						triangles.push( {
							material: material,
							colourCode: material.userData.code,
							v0: v0,
							v1: v1,
							v2: v2,
							faceNormal: faceNormal,
							n0: null,
							n1: null,
							n2: null
						} );

						if ( doubleSided === true ) {

							triangles.push( {
								material: material,
								colourCode: material.userData.code,
								v0: v0,
								v1: v2,
								v2: v1,
								faceNormal: faceNormal,
								n0: null,
								n1: null,
								n2: null
							} );

						}

						break;

					// Line type 4: Quadrilateral
					case '4':

						var material = parseColourCode( lp );

						var inverted = currentParseScope.inverted;
						var ccw = bfcCCW !== inverted;
						var doubleSided = ! bfcCertified || ! bfcCull;
						var v0, v1, v2, v3, faceNormal;

						if ( ccw === true ) {

							v0 = parseVector( lp );
							v1 = parseVector( lp );
							v2 = parseVector( lp );
							v3 = parseVector( lp );

						} else {

							v3 = parseVector( lp );
							v2 = parseVector( lp );
							v1 = parseVector( lp );
							v0 = parseVector( lp );

						}

						tempVec0.subVectors( v1, v0 );
						tempVec1.subVectors( v2, v1 );
						faceNormal = new THREE.Vector3()
							.crossVectors( tempVec0, tempVec1 )
							.normalize();

						triangles.push( {
							material: material,
							colourCode: material.userData.code,
							v0: v0,
							v1: v1,
							v2: v2,
							faceNormal: faceNormal,
							n0: null,
							n1: null,
							n2: null
						} );

						triangles.push( {
							material: material,
							colourCode: material.userData.code,
							v0: v0,
							v1: v2,
							v2: v3,
							faceNormal: faceNormal,
							n0: null,
							n1: null,
							n2: null
						} );

						if ( doubleSided === true ) {

							triangles.push( {
								material: material,
								colourCode: material.userData.code,
								v0: v0,
								v1: v2,
								v2: v1,
								faceNormal: faceNormal,
								n0: null,
								n1: null,
								n2: null
							} );

							triangles.push( {
								material: material,
								colourCode: material.userData.code,
								v0: v0,
								v1: v3,
								v2: v2,
								faceNormal: faceNormal,
								n0: null,
								n1: null,
								n2: null
							} );

						}

						break;

					default:
						throw 'LDrawLoader: Unknown line type "' + lineType + '"' + lp.getLineNumberString() + '.';
						break;

				}

			}

			if ( parsingEmbeddedFiles ) {

				this.subobjectCache[ currentEmbeddedFileName.toLowerCase() ] = currentEmbeddedText;

			}

			currentParseScope.category = category;
			currentParseScope.keywords = keywords;
			currentParseScope.subobjects = subobjects;
			currentParseScope.numSubobjects = subobjects.length;
			currentParseScope.subobjectIndex = 0;

		}

	};

	return LDrawLoader;

} )();
