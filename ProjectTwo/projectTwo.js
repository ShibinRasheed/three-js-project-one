import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarField from "./getStarField.js";

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

//imports
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);

const earthGeometry = new THREE.IcosahedronGeometry(1, 12);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/earthMaterial.jpg"),
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/earthLights.jpg"),
  blending: THREE.AdditiveBlending,
});

const lightMesh = new THREE.Mesh(earthGeometry, lightsMat);
earthGroup.add(lightMesh);

const cloudsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/earthClouds.jpg"),
});

const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMat);
cloudsMesh.scale.set(1.003);
earthGroup.add(cloudsMesh);

const stars = getStarField({ numStars: 2000 });
scene.add(stars);

function animate() {
  requestAnimationFrame(animate);

  cloudsMesh.rotation.y += 0.002;
  earthMesh.rotation.y += 0.002;
  lightMesh.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();
