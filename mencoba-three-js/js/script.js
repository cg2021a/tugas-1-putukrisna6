/// <reference types="three" />

let scene; 
let camera, renderer, light, canvas;

// set up the environment - // initiallize scene, camera, objects and renderer
// 1. create the scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xababab);

const dLight = new THREE.DirectionalLight(0xffffff, 1);
dLight.position.set(1, 0, 1).normalize();
const aLight = new THREE.AmbientLight(0xffffff, 1);
aLight.position.set(0, 0, 10);
const pLight = new THREE.PointLight(0xffffff, 1, 100);
pLight.position.set(-10, 0, 0);
const hLight = new THREE.HemisphereLight(0xffffff, '#ffb703', 0.8);
hLight.position.set(-10, 10, 20);
const sLight = new THREE.SpotLight(0xffffff, 1, 50);
sLight.position.set(5, 10, 10);

const lights = [dLight, aLight, pLight, hLight, sLight];

lights.forEach((obj) => scene.add(obj));

lights.forEach((light) => {
    light.visible = false;
});
lights[0].visible = true;

const selectedLight = document.getElementById('light');
selectedLight.addEventListener('change', (e) => {
    const selected = e.target.value;
    lights.forEach((light) => {
        light.visible = false;
    });
    lights[selected].visible = true;
});

// 2. create an locate the camera
const fov = 40;
const aspect = 2;
const near = 0.1;
const far = 100;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);

// 3. create an locate the object on the scene

cube = new Cube(3, 0, 0, 0xff34aa);
torus = new Torus(0, 0, 0, 0x3456ff);
ring = new Ring(3, -2, 0, 0xfff321);
cone = new Cone(-3, 0, 0, 0x1fbbff);
octahedron = new Octahedron(0, -2, 0, 0xffb703);
sphere = new Sphere(0, 1.5, 3, 0x00ff00);
torusKnot = new TorusKnot(0, 0, -8, 0x219ebc);

// 4. create the renderer

canvas = document.querySelector("#myCanvas");
renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.querySelector("#inside").appendChild(renderer.domElement);

// main animation loop - calls 50-60 in a second.

function mainLoop() {
    cube.rotate(0.01);
    torus.rotate(-0.03);
    ring.rotate(0, 0, 0.09);
    cone.rotate(-0.01, 0, 0.02);
    octahedron.rotate(0.05, 0, 0.05);
    sphere.rotate(0.05, 0, -0.05);
    torusKnot.rotate(0.08, 0.08, 0.08);

    cone.moveY();
    octahedron.moveZ();
    sphere.moveX();
    sphere.moveZ();

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

mainLoop();
