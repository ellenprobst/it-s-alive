var renderer, scene, camera, group;
var mouseX = 0;
var mouseY= 0;

var skull, eye;
   
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

	//camera.rotation.set(-14.56,-85.02,-14.50);

       
            
	// scene
	scene = new THREE.Scene();
	scene.updateMatrixWorld();


	var light = new THREE.SpotLight( 16726440, 1 );
	light.distance = 0;
	light.angle = 0.314159;
	light.decay = 1;
	light.position.set( -17.56, -21.69, 55.41 );
	scene.add( light );
	console.log(light)
	// var sphereSize = 10;
	// var spotLightHelper = new THREE.SpotLightHelper( light, sphereSize );
	// scene.add( spotLightHelper );

	var pointLight = new THREE.PointLight( 216285, 3.1 );
	pointLight.distance = 0;
	pointLight.decay = 1;
	pointLight.position.set( -2.37, -16.15, 15.48 );
	scene.add( pointLight );
	console.log(pointLight);
	 var sphereSize = 1;
	 var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
	 scene.add( pointLightHelper );

	var size = 100;
	var divisions = 10;

	var gridHelper = new THREE.GridHelper( size, divisions );
	scene.add( gridHelper );

	//load mesh
  	var loader = new THREE.JSONLoader(); 
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/skull.json', generateMesh );

  	var loader = new THREE.JSONLoader(); 
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/eyes.json', generateEyes );

	window.addEventListener( 'resize', onWindowResize, false );
 
  //plane(); 
  
};




// load skull 
function generateMesh(geometry, material){
	geometry.computeVertexNormals();

	skull = new THREE.Mesh(geometry, material);
	skull.scale.y = skull.scale.z = skull.scale.x = 8.37;

	scene.add( skull );
}; 

// load skull 
function generateEyes(geometry, material){
	geometry.computeVertexNormals();

	eye = new THREE.Mesh(geometry, material);
	eye.scale.y = eye.scale.z = eye.scale.x = 8;
	eye.position.set(-.2,-0.22,12);

	scene.add( eye );
}; 


document.addEventListener('mousemove', onMouseMove, false);

// Follows the mouse event
function onMouseMove(event) {
  event.preventDefault();
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
function animate() {
	
	requestAnimationFrame( animate );
	scene ? scene.rotation.y = mouseX * 1.5 : null;
	scene ? scene.rotation.x = mouseY * 1.5 : null;

	render();
}; 
 
