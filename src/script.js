import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Camera, GLTFModel, Scene } from './scene';
import './style.css';



let scene = new Scene(); // canvas, gui, camera
scene.background(new THREE.Color(0x2a3941));


let textureLoader = new THREE.TextureLoader();
/**
 * Debug
 */
const gui = new dat.GUI()

const loaderTextures = new THREE.TextureLoader();
/**
 * Canvas
 */

/**
 * Scène
 */
// const scene = new THREE.Scene() 
// scene.background = new THREE.Color(0xF4F4F4);
/**
 * Objets
 */
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

/**
 * Materiaux
 */

//PARTICULES

const starMap = loaderTextures.load("textures/star.png");
const materialPoint = new THREE.PointsMaterial({
    map: starMap,
    size: 1.5,
    transparent: true,
    depthWrite: false
    // color: "blue"
})
const particleGeo = new THREE.BufferGeometry();
const particlesCounter = 5000;
const positionArray = new Float32Array(particlesCounter * 3);

for (let i = 0; i < particlesCounter * 3; i++){
    positionArray[i] = (Math.random() - 0.5) * 500;
}
particleGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
)

const particlesMesh = new THREE.Points(particleGeo, materialPoint);
scene.add(particlesMesh);
scene.add(new THREE.AxesHelper(1000));

let tempColor = {color: "#f3f3f3"};
// let donutNM = new THREE.TextureLoader().load("textures/NormalMap.png")

const material = new THREE.MeshPhongMaterial({
    
    color : new THREE.Color(tempColor),
    // normalMap: donutNM,
    // normalScale: new THREE.Vector3(0.1, 0.1, 0.1)
    
    // wireframe: true
})


// material.color = new THREE.Color(tempColor); // 0xf3f3f3 =>  {r: .., g: ..., b:...}


/**
 * Mesh
 */




const sphere = new THREE.Mesh(geometry, material)
console.log('%c⧭', 'color: #917399', sphere);

scene.add(sphere)
gui.addColor(tempColor, 'color').onChange((value) =>{
    sphere.material.color = new THREE.Color(value);
})


let naturalTexture = new THREE.TextureLoader().load("textures/rock_basecolor.jpg")
let naturalMap = new THREE.TextureLoader().load("textures/rock_normal_map.jpg")
let displacementMap = new THREE.TextureLoader().load("textures/rock_height.png")
let alphaMap = new THREE.TextureLoader().load("textures/rock_alpha.png")
const planeSize = 5000;
const planeMat = new THREE.MeshStandardMaterial({
    map: naturalTexture,
    normalMap: naturalMap,
    displacementMap: displacementMap,
    displacementScale: 400,
    alphaMap: alphaMap,
    transparent: true,
    // color: 'red',
    // wireframe: true
})

gui.add(planeMat, "displacementScale");
// naturalTexture.wrapS = THREE.RepeatWrapping;
// naturalTexture.wrapT = THREE.RepeatWrapping;
// naturalTexture.repeat.set(4,4);


const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize, 128, 128)
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.scale.set(0.1,0.1, 0.1);
mesh.rotation.x = Math.PI * -.5;


scene.add(mesh);


let moonGeometry = new THREE.SphereGeometry(15.5, 50, 50);
let moonMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('textures/moon_texture.jpg'),
    // wireframe: true
})

window.moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.y = 100;
let moonHelper = new THREE.BoxHelper(moon, 0xffff00);
scene.add(moon);
scene.add(moonHelper);
/**
 * Lumières
 */ 


let pointLight = new THREE.PointLight(0xffffff,1, 1000,)

pointLight.position.x = -10
pointLight.position.y = 3
pointLight.position.z = 4
let pointLightHelper = new THREE.PointLightHelper(pointLight, 0xffff00);
moon.add(pointLight)
scene.add(pointLightHelper);

gui.add(pointLight.position, "x");
gui.add(pointLight.position, "y");
gui.add(pointLight.position, "z");


/**
 * Tailles
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const renderer = new THREE.WebGLRenderer({
    canvas: scene.getCanvas()
})
window.addEventListener('resize', () =>
{
    /**
     * Mise à jour des tailles
     */
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    /**
     * Mise à jour de la caméra
     */
    camera.c.aspect = sizes.width / sizes.height
    camera.c.updateProjectionMatrix()

    /**
     * Mise à jour du rendu
     */
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Mesh


const  modelHouse = new GLTFModel("models/house.gltf", scene.s, [0.1, 0.1, 0.1]);
// await modelHouse.init();


/**
 * Camera
 */
//Caméra de base

window.camera = new Camera(75, sizes.width / sizes.height, 0.1, 10000);
console.log('%c⧭', 'color: #ffa640', camera);
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2


// const camera = new Camera();
scene.add(camera.c)

// Controles
const controls = new OrbitControls(camera.c, scene.getCanvas())
controls.enableDamping = true

/**
 * Rendu
 */

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animation
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Mise à jour des Orbital Controls
    controls.update()

    renderer.render(scene.render(), camera.c)

    // Appel de tick à la prochaine image
    window.requestAnimationFrame(tick)
}

tick()