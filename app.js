let w = window.innerWidth,
    h = window.innerHeight,
    aspect = w/h;

const stats = new Stats();
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(w,h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

// var ray = new RayInput(camera, renderer.domElement);
// ray.setSize(renderer.getSize())
// scene.add(ray.getMesh())

const effect = new THREE.StereoEffect( renderer );
// const effect = new THREE.AnaglyphEffect( renderer );
effect.setSize(w,h);

// let button = WEBVR.createButton(renderer)
// document.body.appendChild(button)
// console.log(button)

const orientationControls = new THREE.DeviceOrientationControls( camera );
// const orbitControls = new THREE.OrbitControls( camera );
var light = new THREE.AmbientLight( 0x222222 );
scene.add( light );
var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 );
scene.add( light );
var light = new THREE.DirectionalLight( 0x002288 );
light.position.set( -1, -1, -1 );
scene.add( light );


const box = new THREE.BoxBufferGeometry(10,10,10);
const green = new THREE.MeshLambertMaterial({color: 0x00ff00});

for(var i = 0; i < 500; i++){
  let cube = new THREE.Mesh(box, green);
  cube.position.x = (Math.random() - 0.5) * 1000
  cube.position.y = (Math.random() - 0.5) * 1000
  cube.position.z = (Math.random() - 0.5) * 1000
  cube.castShadow = true
  cube.recieveShadow = true
  // ray.add(cube)

  scene.add( cube );
}
// ray.on(raydown, (mesh) =>{
//   mesh.set
// })

scene.add( camera );
camera.position.z = 10;

document.body.appendChild(stats.dom)

function animate(){
  window.requestAnimationFrame(animate);
  // orbitControls.update();
  orientationControls.update();
  // ray.update()
  stats.update();
  // renderer.render(scene, camera);
  effect.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize)
animate()