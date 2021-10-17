/// <reference types="three" />

function main() {
  const mac = new Macro();

  let currColor = "";
  let currObj = {};

  // set canvas
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  // set scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");

  // set camera
  const camera = new THREE.PerspectiveCamera(
    mac.CAMERA_FOV,
    mac.CAMERA_ASPECT,
    mac.CAMERA_NEAR,
    mac.CAMERA_FAR
  );
  camera.position.z = mac.CAMERA_POSITION;
  scene.add(camera);

  // add light
  const light = new THREE.DirectionalLight(
    mac.LIGHT_COLOR,
    mac.LIGHT_INTENSITY
  );
  light.position.set(mac.LIGHT_X, mac.LIGHT_Y, mac.LIGHT_Z);
  camera.add(light);

  // create sphere geometry
  const geometry = new THREE.SphereGeometry(
    mac.SPHERE_RADIUS,
    mac.SPHERE_HEIGHT_SEGMENTS,
    mac.SPHERE_WIDTH_SEGMENTS
  );

  let currNumObjects = 0;
  let waitTime = mac.MAX_WAIT_TIME;

  function drawSpheres() {
    const numObjects = 100;

    setTimeout(function () {
      const material = new THREE.MeshPhysicalMaterial({
        color: randomColor(),
        clearcoat: 0.8,
        sheen: 0.3,
        roughness: 0.5,
      });

      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      sphere.position.set(
        rand(-mac.SPHERE_X_SPREAD, mac.SPHERE_X_SPREAD),
        rand(-mac.SPHERE_Y_SPREAD, mac.SPHERE_Y_SPREAD),
        rand(-mac.SPHERE_Z_SPREAD, 0)
      );
      sphere.rotation.set(rand(Math.PI), rand(Math.PI), 0);

      currNumObjects++;
      waitTime = 1000 - currNumObjects * 10;
      if (currNumObjects < numObjects) {
        drawSpheres();
      }
    }, waitTime);
  }

  drawSpheres();

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
      this.pickedObjectSavedColor = 0;
    }
    pick(normalizedPosition, scene, camera) {
      // restore the color if there is a picked object
      if (this.pickedObject) {
        this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
        this.pickedObject = undefined;
      }

      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(
        scene.children
      );
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        this.pickedObject = intersectedObjects[0].object;

        // save its color
        this.pickedObjectSavedColor =
          this.pickedObject.material.emissive.getHex();

        let objColor = JSON.stringify(this.pickedObject.material.color);
        let num = parseInt(objColor);
        let hex = num.toString(16);

        changeLogColor(hex);

        if (
          prevPickPosition.x != pickPosition.x &&
          prevPickPosition.y != pickPosition.y
        ) {
          if (currColor == objColor && currObj !== this.pickedObject) {
            addScore();

            scene.remove(this.pickedObject);
            scene.remove(currObj);
            drawSpheres();
            clearPickPosition();
            currNumObjects -= 2;
          }

          prevPickPosition.x = pickPosition.x;
          prevPickPosition.y = pickPosition.y;
        } else {
          currColor = objColor;
          currObj = this.pickedObject;
        }

        this.pickedObject.material.emissive.setHex(0x3f3f3f);
      }
    }
  }

  const pickPosition = { x: 0, y: 0 };
  const prevPickPosition = { x: 0, y: 0 };
  const pickHelper = new PickHelper();
  clearPickPosition();

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    pickHelper.pick(pickPosition, scene, camera);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };
  }

  function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;
  }

  function clearPickPosition() {
    currColor = "";
    currObj = {};

    resetLogColor();

    pickPosition.x = -100000;
    pickPosition.y = -100000;
  }
  window.addEventListener("click", setPickPosition);
  window.addEventListener("mouseout", clearPickPosition);
  window.addEventListener("mouseleave", clearPickPosition);

  window.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      setPickPosition(event.touches[0]);
    },
    { passive: false }
  );

  window.addEventListener("touchmove", (event) => {
    setPickPosition(event.touches[0]);
  });

  window.addEventListener("touchend", clearPickPosition);
}

main();
