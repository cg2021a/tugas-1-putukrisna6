/// <reference types="three" />

let scene, camera, renderer, light;

function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        flatShading: true,
    });
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 3;
    scene.add(cube);
}

function createSphere() {
    const radius = 0.5;
    const detail = 10;
    const geometry = new THREE.IcosahedronGeometry(radius, detail);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: true,
    });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = 2;
    scene.add(sphere);
}

function createCone() {
    const radius = 1;
    const height = 2;
    const radialSegments = 100;
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        flatShading: true,
    });

    cone = new THREE.Mesh(geometry, material);
    cone.position.x = -3;
    scene.add(cone);
}

function createTorus() {
    const geometry = new THREE.TorusGeometry(1, 0.5, 100, 500);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        flatShading: true,
    });
    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
}


// set up the environment - // initiallize scene, camera, objects and renderer
function init() {
    // 1. create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 0, 1).normalize();
    scene.add(light); // 2. create an locate the camera
    camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 10; // 3. create an locate the object on the scene
    createCube();
    createSphere();
    createCone();
    createTorus(); // 4. create the renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}


// main animation loop - calls 50-60 in a second.
function mainLoop() {
    cube.rotation.x += 0.01;

    cone.rotation.x += 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    torus.rotation.x += 0.03;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

///////////////////////////////////////////////
init();
mainLoop();
