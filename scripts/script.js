var renderer, scene, camera, group, textMesh;
var mouseX = 0;
var mouseY= 0;

var skull, leftEye, rightEye, light1, light2, light3, light4, light5, light6, light7, light8;
  
    
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
	
		 // var sphereSize = 10;
		 // var spotLightHelper = new THREE.SpotLightHelper( light, sphereSize );
		 //scene.add( spotLightHelper );

	var pointLight = new THREE.PointLight( 216285, 3.1 );
	pointLight.decay = 1;
	pointLight.position.set( -2.37, -18.15, 20.48 );
	scene.add( pointLight );
	
		//  var sphereSize = 1;
		//  var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
		//  scene.add( pointLightHelper );
		var sphere = new THREE.SphereGeometry( 0.1, 16, 8 );
	light1 = new THREE.PointLight( 16726440, .8, 10 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 16726440 } ) ) );
	scene.add( light1 );
	light2 = new THREE.PointLight( 16726440, .8, 10 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 16726440 } ) ) );
	scene.add( light2 );
	light3 = new THREE.PointLight( 16726440, .8, 10 );
	light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 16726440 } ) ) );
	scene.add( light3 );
	light4 = new THREE.PointLight( 16726440, .8, 10 );
	light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 16726440 } ) ) );
	scene.add( light4 );
		light5 = new THREE.PointLight( 16726440, .8, 10 );
	light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 16726440 } ) ) );
	scene.add( light5 );
		light6 = new THREE.PointLight( 16726440, .8, 10 );
	light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 16726440 } ) ) );
	scene.add( light6 );
		light7 = new THREE.PointLight( 16726440, .8, 10 );
	light7.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 16726440 } ) ) );
	scene.add( light7 );
	light8 = new THREE.PointLight( '#87F5FB', .8, 10 );
	light8.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: '#87F5FB' } ) ) );
	scene.add( light8 );


	// grid
	var size = 100;
	var divisions = 10;
	var gridHelper = new THREE.GridHelper( size, divisions );
	//scene.add( gridHelper );

	//load mesh
  	var loader = new THREE.JSONLoader(); 
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/skull.json', generateSkull );
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/eyes.json', generateLeftEye );
  	loader.load('https://raw.githubusercontent.com/ellenprobst/it-s-alive/master/blender/eyes.json', generateRightEye );
  	
  
  	group = new THREE.Group();
  	group.position.x = 2;
	scene.add( group );

	window.addEventListener( 'resize', onWindowResize, false );

  	// load text
  	generateText();

};


function generateText(){
	var loader = new THREE.FontLoader();
	loader.load( '../scripts/optimer_regular.typeface.json', function ( font ) {

	var textGeometry = new THREE.TextGeometry( "It's alive !", {
	    font: font,

	    size: 6,
	    height: 5,
	    curveSegments: 20,

	    bevelThickness: 1,
	    bevelSize: 1,
	    bevelEnabled: false

	  });

	var textMaterial = new THREE.MeshPhongMaterial( 
	    { color: 16726440, specular: 0xffffff }
	);

	var mesh = new THREE.Mesh( textGeometry, textMaterial );
	mesh.scale.z =mesh.scale.y=mesh.scale.x=.3;
	mesh.position.y = -10;
	mesh.position.x = -5;
	  
	scene.add( mesh );
	});

}; 

// generate skull 
function generateSkull(geometry, material){
	geometry.computeVertexNormals();

	skull = new THREE.Mesh(geometry, material);
	skull.scale.y = skull.scale.z = skull.scale.x = 8.37;

	group.add( skull );
}; 

// generate eye 
function generateLeftEye(geometry, material){
	geometry.computeVertexNormals();
	geometry.center();
	
	leftEye = new THREE.Mesh(geometry, material);
	leftEye.scale.y = leftEye.scale.z = leftEye.scale.x = 8.5;
	leftEye.position.set(-4.5,1.7,4.3);

	// var box = new THREE.BoxHelper( eye, 0xffff00 );
	// scene.add( box );

	group.add( leftEye );
};

// generate eye 
function generateRightEye(geometry, material){
	geometry.computeVertexNormals();
	geometry.center();
	
	rightEye = new THREE.Mesh(geometry, material);
	rightEye.scale.y = rightEye.scale.z = rightEye.scale.x = 8.5;
	rightEye.position.set(0,1.7,4.3);

	// var box = new THREE.BoxHelper( eye, 0xffff00 );
	// scene.add( box );

	group.add( rightEye );
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

	if (group) {
		group.rotation.y = mouseX * .15;
		group.rotation.x = mouseY * -.15;
	}

	if (rightEye) {
		leftEye.rotation.y = rightEye.rotation.y = mouseX * .50;
		leftEye.rotation.x = rightEye.rotation.x = mouseY * -.50;
	} 

	var time = Date.now() * 0.0008;
	
				light1.position.x = Math.sin( time * 0.7 ) * 10;
				light1.position.y = Math.cos( time * 0.5 ) * 15;
				light1.position.z = Math.cos( time * 0.3 ) * 10;
				light2.position.x = Math.cos( time * 0.3 ) * 15;
				light2.position.y = Math.sin( time * 0.5 ) * 15;
				light2.position.z = Math.sin( time * 0.7 ) * 10;
				light3.position.x = Math.sin( time * 0.7 ) * 10;
				light3.position.y = Math.cos( time * 0.3 ) * 15;
				light3.position.z = Math.sin( time * 0.5 ) * 15;
				light4.position.x = Math.sin( time * 0.5 ) * 10;
				light4.position.y = Math.cos( time * 0.3 ) * 15;
				light4.position.z = Math.sin( time * 0.7 ) * 10;
				light5.position.x = Math.sin( time * 0.6 ) * 15;
				light5.position.y = Math.cos( time * 0.7 ) * 10;
				light5.position.z = Math.cos( time * 0.4 ) * 15;
				light6.position.x = Math.cos( time * 0.4 ) * 10;
				light6.position.y = Math.sin( time * 0.5 ) * 15;
				light6.position.z = Math.sin( time * 0.7 ) * 10;
				light7.position.x = Math.sin( time * 0.5 ) * 10;
				light7.position.y = Math.cos( time * 0.3 ) * 10;
				light7.position.z = Math.sin( time * 0.6 ) * 15;
				light8.position.x = Math.sin( time * 0.7 ) * 10;
				light8.position.y = Math.cos( time * 0.3 ) * 15;
				light8.position.z = Math.sin( time * 0.5 ) * 15;
				
	render();
}; 
 
// to do: remove shininess,  change light colors