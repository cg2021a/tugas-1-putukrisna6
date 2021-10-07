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
