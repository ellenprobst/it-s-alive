var renderer, scene, camera, group;
var mouseX = 0;
var mouseY= 0;

var skull, leftEye, rightEye, light1, light2, light3, light4;
   
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
		var sphere = new THREE.SphereGeometry( 0.1, 16, 8 );
	light1 = new THREE.PointLight( 0xff0040, .8, 10 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
	scene.add( light1 );
	light2 = new THREE.PointLight( 0x0040ff, .8, 10 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
	scene.add( light2 );
	light3 = new THREE.PointLight( 0x80ff80, .8, 10 );
	light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
	scene.add( light3 );
	light4 = new THREE.PointLight( 0x80ff80, .8, 10 );
	light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
	scene.add( light4 );
	


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
		scene.rotation.y = mouseX * .15;
		scene.rotation.x = mouseY * -.15;
	}

	if (rightEye) {
		leftEye.rotation.y = rightEye.rotation.y = mouseX * .50;
		leftEye.rotation.x = rightEye.rotation.x = mouseY * -.50;
	} 

	var time = Date.now() * 0.0008;
	
				light1.position.x = Math.sin( time * 0.7 ) * 20;
				light1.position.y = Math.cos( time * 0.5 ) * 20;
				light1.position.z = Math.cos( time * 0.3 ) * 10;
				light2.position.x = Math.cos( time * 0.3 ) * 20;
				light2.position.y = Math.sin( time * 0.5 ) * 20;
				light2.position.z = Math.sin( time * 0.7 ) * 10;
				light3.position.x = Math.sin( time * 0.7 ) * 20;
				light3.position.y = Math.cos( time * 0.3 ) * 20;
				light3.position.z = Math.sin( time * 0.5 ) * 10;
				light4.position.x = Math.sin( time * 0.5 ) * 20;
				light4.position.y = Math.cos( time * 0.3 ) * 20;
				light4.position.z = Math.sin( time * 0.7 ) * 10;
				
	render();
}; 
 
// to do: remove shininess, add group for skull, change light colors