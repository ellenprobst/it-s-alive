var renderer, scene, camera, group;
var mouseX = 0;
var mouseY= 0;

var skull, leftEye, rightEye;
   
init();
animate();  

function init() {

	// renderer
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);
  
	// camera
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 10000);
	camera.position.set(0, 0, 60);
	camera.zoom = 2;
	camera.updateProjectionMatrix();
        
	// scene
	scene = new THREE.Scene();
	scene.updateMatrixWorld();

	// lights
	var light = new THREE.SpotLight( 16726440, .5 );
	light.angle = 0.50;
	light.decay = 1;
	light.position.set( -50.56, -21.69, 50.41 );
	scene.add( light );
	
		 var sphereSize = 10;
		 var spotLightHelper = new THREE.SpotLightHelper( light, sphereSize );
		 //scene.add( spotLightHelper );

	var pointLight = new THREE.PointLight( 216285, 3.1 );
	pointLight.decay = 1;
	pointLight.position.set( -2.37, -18.15, 20.48 );
	scene.add( pointLight );
	
		//  var sphereSize = 1;
		//  var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
		//  scene.add( pointLightHelper );

	// grid
	var size = 100;
	var divisions = 10;
	var gridHelper = new THREE.GridHelper( size, divisions );
	//scene.add( gridHelper );

	//load mesh
  	var loader = new THREE.JSONLoader(); 
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/skull.json', generateMesh );
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/eyes.json', generateLeftEye );
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/eyes.json', generateRightEye );


  	
	window.addEventListener( 'resize', onWindowResize, false );
  
};


// generate skull 
function generateMesh(geometry, material){
	geometry.computeVertexNormals();

	skull = new THREE.Mesh(geometry, material);
	skull.scale.y = skull.scale.z = skull.scale.x = 8.37;

	scene.add( skull );
}; 


// generate eye 
function generateLeftEye(geometry, material){
	geometry.computeVertexNormals();
	geometry.center();
	
	leftEye = new THREE.Mesh(geometry, material);
	leftEye.scale.y = leftEye.scale.z = leftEye.scale.x = 8;
	leftEye.position.set(-4.5,1.7,4.3);

	// var box = new THREE.BoxHelper( eye, 0xffff00 );
	// scene.add( box );

	scene.add( leftEye );
};

// generate eye 
function generateRightEye(geometry, material){
	geometry.computeVertexNormals();
	geometry.center();
	
	rightEye = new THREE.Mesh(geometry, material);
	rightEye.scale.y = rightEye.scale.z = rightEye.scale.x = 8;
	rightEye.position.set(0,1.7,4.3);

	// var box = new THREE.BoxHelper( eye, 0xffff00 );
	// scene.add( box );

	scene.add( rightEye );
}; 


document.addEventListener('mousemove', onMouseMove, false);

// Follows the mouse event
function onMouseMove(event) {
  event.preventDefault();

  cursorX = event.clientX;
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
};

// on resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// render
function render() {
  	renderer.render( scene, camera );
};

// animate
function animate(event) {
	
	requestAnimationFrame( animate );

	if (scene) {
		scene.rotation.y = mouseX * .1;
		scene.rotation.x = mouseY * -.1;
	}

	if (leftEye) {
		leftEye.rotation.y = rightEye.rotation.y = mouseX * .50;
		leftEye.rotation.x = rightEye.rotation.x = mouseY * -.50;
	} 


	render();
}; 
 
