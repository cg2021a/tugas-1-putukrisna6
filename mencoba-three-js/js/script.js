/// <reference types="three" />

let scene, camera, renderer, light, canvas;

function addWireframe(mesh) {
    let geo = new THREE.WireframeGeometry(mesh.geometry);
    let mat = new THREE.LineBasicMaterial({color: 0xffffff});
    let wireframe = new THREE.LineSegments(geo, mat);
    mesh.add(wireframe);
}

class Shapes {
    mesh;
    speed = 0.01;

    addPhongMaterial(color) {
        return new THREE.MeshPhongMaterial({
            color: color,
            flatShading: true,
        });
    }

    addToScene(posX, posY, posZ, geometry, material) {
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(posX, posY, posZ);
        scene.add(this.mesh);

        this.addWireframe();
    }
    
    addWireframe() {
        const geo = new THREE.WireframeGeometry(this.mesh.geometry);
        const mat = new THREE.LineBasicMaterial({color: 0xffffff});
        const wireframe = new THREE.LineSegments(geo, mat);
        this.mesh.add(wireframe);
    }

    rotate(dx = 0, dy = 0, dz = 0) {
        this.mesh.rotation.x += dx;
        this.mesh.rotation.y += dy;
        this.mesh.rotation.z += dz;
    }

    getMesh() {
        return this.mesh;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    moveX() {
        if (this.mesh.position.x >= 5 || this.mesh.position.x <= -5) this.speed = -this.speed;
        this.mesh.position.x += this.speed;
    }

    moveY() {
        if (this.mesh.position.y >= 3 || this.mesh.position.y <= -3) this.speed = -this.speed;
        this.mesh.position.y += this.speed;
    }

    moveZ() {
        if (this.mesh.position.z >= 5 || this.mesh.position.z <= -5) this.speed = -this.speed;
        this.mesh.position.z += this.speed;
    }
}

class Cube extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff0000) {
        super();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material)
    }
}

class Torus extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff0000) {
        super();
        const geometry = new THREE.TorusGeometry(0.5, 0.25, 10, 50);
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material)
    }
}

class Ring extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff0000) {
        super();
        const innerRadius = 0.25;  
        const outerRadius = 0.75;  
        const thetaSegments = 18;  
        const geometry = new THREE.RingGeometry(
            innerRadius, 
            outerRadius, 
            thetaSegments
        );
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material)
    }
}

class Cone extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff00ff) {
        super();
        const radius = 0.5;
        const height = 1;
        const radialSegments = 20;
        const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material)
    }
}

function createOctahedron() {
    const radius = 0.6;
    const detail = 2;
    const geometry = new THREE.OctahedronGeometry(radius, detail);
    const material = new THREE.MeshPhongMaterial({
        color: 0xee00ee,
        flatShading: true,
    });
    octahedron = new THREE.Mesh(geometry, material);
    octahedron.position.y = -2;
    scene.add(octahedron);

    addWireframe(octahedron);
}

function createSphere() {
    const geometry = new THREE.SphereGeometry(0.4, 32, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: true,
    });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = 1.5;
    sphere.position.z = 3;
    scene.add(sphere);

    addWireframe(sphere);
}

// set up the environment - // initiallize scene, camera, objects and renderer
function init() {
    // 1. create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 0, 1).normalize();
    scene.add(light); 
    
    // 2. create an locate the camera
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 10);
    

    // 3. create an locate the object on the scene
    
    cube = new Cube(3, 0, 0, 0xff34aa);
    torus = new Torus(0, 0, 0, 0x3456ff);
    ring = new Ring(3, -2, 0, 0xfff321);
    cone = new Cone(-3, 0, 0, 0x1fbbff);


    createSphere();
    createOctahedron();
    
    // 4. create the renderer
    
    canvas = document.querySelector('#myCanvas');
    renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true});
	renderer.setClearColor(0x000000);
	renderer.setPixelRatio(window.devicePixelRatio);

    document.querySelector('#inside').appendChild(renderer.domElement);
}



// main animation loop - calls 50-60 in a second.
let dxSphere = 0.01;
let dzOctahedron = 0.01;

function mainLoop() {
    cube.rotate(0.01);
    torus.rotate(-0.03);
    ring.rotate(0.02, -0.02, 0.02);
    cone.rotate(-0.01, 0, 0.02);

    sphere.rotation.y += 0.01;
    octahedron.rotation.z += 0.01;

    [sphere, octahedron].forEach((obj) => (obj.rotation.x) += 0.01);

    cone.moveY();

    if (sphere.position.x >= 5 || sphere.position.x <= -5) dxSphere = -dxSphere;
    sphere.position.x += dxSphere;

    if (octahedron.position.z >= 5 || octahedron.position.z <= -5) dzOctahedron = -dzOctahedron;
    octahedron.position.z += dzOctahedron;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

///////////////////////////////////////////////
init();
mainLoop();
