//find constants
const w = window.innerWidth,
    h = window.innerHeight,
    aspect = w/h,
    clock = new THREE.Clock();
let vrDisplay;

//Set the scene
const stats = new Stats();
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

//Camera and Renderer
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(w,h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

//add stereo effect to renderer
// const stereoEffect = new THREE.StereoEffect( renderer );
// const effect = new THREE.AnaglyphEffect( renderer );
// stereoEffect.setSize(w,h);

const vrEffect = new THREE.VREffect( renderer );

//WEBVR Button
var options = {};
var enterVR = new webvrui.EnterVRButton(renderer.domElement, options);
document.body.appendChild(enterVR.domElement);

enterVR.getVRDisplay().then((display)=>{
  vrDisplay = display
  console.log(vrDisplay)
}).catch((err)=>{
  console.log(err)
})

// RAYCASTER
let raycaster = new THREE.Raycaster()
let arrow = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, 1000, Math.random() * 0xffffff );
scene.add( arrow );

// CONTROLS
// const orientationControls = new THREE.DeviceOrientationControls( camera );
const orbitControls = new THREE.OrbitControls( camera );

const vrControls = new THREE.VRControls( camera )


var light = new THREE.AmbientLight( 0x222222 );
scene.add( light );
var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 );
scene.add( light );
var light = new THREE.DirectionalLight( 0x002288 );
light.position.set( -1, -1, -1 );
scene.add( light );


const box = new THREE.BoxBufferGeometry(10,10,10);
const red = new THREE.MeshLambertMaterial({color: 0xff5500});
const green = new THREE.MeshLambertMaterial({color: 0x005500});

for(var i = 0; i < 500; i++){
  let cube = new THREE.Mesh(box, green);
  cube.position.x = (Math.random() - 0.5) * 1000
  cube.position.y = (Math.random() - 0.5) * 1000
  cube.position.z = (Math.random() - 0.5) * 1000
  cube.castShadow = true
  cube.recieveShadow = true

  scene.add( cube );
}

scene.add( camera );
camera.position.y = 0.5;

// document.body.appendChild(stats.dom)
let isClicked = false

function animate(){
  if(enterVR.isPresenting()){
    vrEffect.render(scene, camera)
    vrControls.update()
  } else {
    renderer.render(scene, camera)
    orbitControls.update();
    // stats.update();
  }
  
  
  // update the position of arrow
  arrow.setDirection(raycaster.ray.direction);
  // update the raycaster
  raycaster.set(camera.getWorldPosition(), camera.getWorldDirection());
 
  // intersect with all scene meshes.
  var intersects = raycaster.intersectObjects(scene.children);
  intersectedObject = intersects;
  if (intersects.length > 0) {
    let obj = intersects[0].object
    obj.rotation.x += 0.05
    obj.rotation.y += 0.05
    obj.updateMatrix()

    if(isClicked){
      obj.position.x = (Math.random() - 0.5) * 1000
      obj.position.y = (Math.random() - 0.5) * 1000
      obj.position.z = (Math.random() - 0.5) * 1000
    }
  }
  isClicked = false

  //grab correct vr-display || window
  let display = (vrDisplay ? vrDisplay : window)
  display.requestAnimationFrame(animate);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

document.addEventListener('click', ()=> isClicked = true )
window.addEventListener('resize', onWindowResize)
animate()