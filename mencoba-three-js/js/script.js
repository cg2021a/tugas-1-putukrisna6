/// <reference types="three" />

let scene, camera, renderer, light, canvas;

class Shapes {
  mesh;
  speed = 0.01;

  addPhongMaterial(color) {
    return new THREE.MeshPhongMaterial({
      color: color,
      flatShading: true,
    });
  }

  addBasicMaterial(color) {
    return new THREE.MeshBasicMaterial({ color: color });
  }

  addLambertMaterial(color) {
    return new THREE.MeshLambertMaterial({ color: color });
  }

  addToScene(posX, posY, posZ, geometry, material) {
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(posX, posY, posZ);
    scene.add(this.mesh);
  }

  addWireframe() {
    const geo = new THREE.WireframeGeometry(this.mesh.geometry);
    const mat = new THREE.LineBasicMaterial({ color: 0xffffff });
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
    if (this.mesh.position.x >= 5 || this.mesh.position.x <= -5)
      this.speed = -this.speed;
    this.mesh.position.x += this.speed;
  }
  moveY() {
    if (this.mesh.position.y >= 3 || this.mesh.position.y <= -3)
      this.speed = -this.speed;
    this.mesh.position.y += this.speed;
  }
  moveZ() {
    if (this.mesh.position.z >= 5 || this.mesh.position.z <= -5)
      this.speed = -this.speed;
    this.mesh.position.z += this.speed;
  }
}

class Cube extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff0000) {
        super();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material);
    }
}

class Torus extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff0000) {
        super();
        const geometry = new THREE.TorusGeometry(0.5, 0.25, 10, 50);
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material);
        this.addWireframe();
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

        this.addToScene(posX, posY, posZ, geometry, material);
        this.addWireframe();
    }
}

class Cone extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff00ff) {
        super();
        const radius = 0.5;
        const height = 1;
        const radialSegments = 100;
        const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material);
    }
}

class Octahedron extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff00ff) {
        super();
        const radius = 0.6;
        const detail = 2;
        const geometry = new THREE.OctahedronGeometry(radius, detail);
        const material = this.addLambertMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material);
        this.addWireframe();
    }
}

class Sphere extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff00ff) {
        super();
        const geometry = new THREE.SphereGeometry(0.4, 32, 16);
        const material = this.addPhongMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material);
        this.addWireframe();
    }
}
class TorusKnot extends Shapes {
    constructor(posX = 0, posY = 0, posZ = 0, color = 0xff00ff) {
        super();
        const radius = 2;
        const tubeRadius = 0.5;
        const radialSegments = 8;
        const tubularSegments = 64;
        const p = 2;
        const q = 3;

        const geometry = new THREE.TorusKnotGeometry(
        radius,
        tubeRadius,
        tubularSegments,
        radialSegments,
        p,
        q
        );
        const material = this.addBasicMaterial(color);

        this.addToScene(posX, posY, posZ, geometry, material);
    }
}

// set up the environment - // initiallize scene, camera, objects and renderer
// 1. create the scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xababab);

const dLight = new THREE.DirectionalLight(0xffffff, 1);
dLight.position.set(1, 0, 1).normalize();
const aLight = new THREE.AmbientLight(0xffffff, 1);
aLight.position.set(0, 0, 10);
const pLight = new THREE.PointLight(0xffffff, 1, 100);
pLight.position.set(20, 20, 20);
const hLight = new THREE.HemisphereLight(0xffffff, '#ffb703', 0.8);
hLight.position.set(0, 10, 0);
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
const fov = 45;
const aspect = 2; // the canvas default
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

///////////////////////////////////////////////
// init();
mainLoop();
