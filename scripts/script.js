var renderer, scene, camera, group;
var mouseX = 0;
var mouseY= 0;
   
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
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 100, 500);
       
            
	// scene
	scene = new THREE.Scene();
	scene.updateMatrixWorld();
  
	var light = new THREE.AmbientLight( 0x999999, .8 ); 
	scene.add( light );
	var hemilight = new THREE.HemisphereLight( "#D66D75", "#26688F", 1.7 ); 
	scene.add( hemilight ); 
	var dirLight = new THREE.DirectionalLight( 0xffffff, .6 );
		dirLight.color.setHSL( 0.1, 1, 0.95 );
		dirLight.position.set( -1, 1.75, 1 );
		dirLight.position.multiplyScalar( 50 ); 
		scene.add( dirLight );


	//load mesh
  var loader = new THREE.JSONLoader(); 
  loader.load('../blender/skull.json', generateMesh );

	window.addEventListener( 'resize', onWindowResize, false );
 
  //plane(); 
  
};




// load pencil 
function generateMesh(geometry, material){
		geometry.computeVertexNormals();

	skull = new THREE.Mesh(geometry, material);
	scene.add( skull );
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

	render();
}; 
 
