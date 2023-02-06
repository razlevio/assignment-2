import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

// set the scene size
const WIDTH = 500, HEIGHT = 500;

// set some camera attributes
const VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 1000;

// get the element to attach
const container = document.getElementById("container");

// create a WebGL renderer, camera, and a scene
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

// the camera starts at 0,0,0 so pull it back
camera.position.z = 30;

// add the camera to the scene
scene.add(camera);

// set up the camera controls. Please keep in mind that what this does is move the entire scene around.
// because the entire scene is moving the position of the camera and lights in relation to objects within
// the scene doesn't change so the lighting on the surface of the object(s) will not change either
var cameraControls = new OrbitControls(camera, renderer.domElement);
cameraControls.addEventListener("mousemove", renderer);
cameraControls.autoRotate = true;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// attach the render-supplied DOM element
container.append(renderer.domElement);

// polygon composed of 5 vertices have a red or blue surface and spin slowly on its axes
// Define vertices for a polygon with 5 sides
const vertices = new Float32Array([
  -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0, 0, 0, 1,
]);

// Create a buffer geometry
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex([0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4]);
geometry.computeVertexNormals();
geometry.computeBoundingSphere();


// Create a material with a red or blue surface
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
material.color.setHex(Math.random() > 0.5 ? 0xff0000 : 0x0000ff);

// Create a mesh from the buffer geometry and material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Standard functions for rendering the scene. Notice how we have the animate function
// which submits a call to requestAnimationFrame to call animate. This creates a loop
// that will render the scene again whenever something within the scene changes.
// Standard functions for rendering the scene.  Notice how we have the animate function
// which submits a call to requestAnimationFrame to call animate. This creates a loop
// that will render the scene again whenever something within the scene changes.

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.05;
  mesh.rotation.y += 0.05;
  render();
}

function render() {
  cameraControls.update();
  renderer.render(scene, camera);
}
animate();
