import * as THREE from 'three';


let canvas: HTMLCanvasElement;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let model: THREE.Mesh;
let joystickBall: HTMLElement;
let vectorMagnitude = 0;
let updateRequestId: number;
let joystickCenterX: number;
let joystickCenterY: number;
let joystickLimitNumber = 35;

const init = (): void => {
  setupJoystick();
  setUpScene();
  bindEvents();
};

const setupJoystick = (): void => {
  joystickBall = document.getElementById("joystick-ball")!;
  joystickCenterX =
    joystickBall.getBoundingClientRect().left + joystickBall.clientWidth / 2;
  joystickCenterY =
    joystickBall.getBoundingClientRect().top + joystickBall.clientHeight / 2;
  joystickBall.addEventListener("touchstart", dragStart);
  joystickBall.addEventListener("touchmove", dragMove);
  joystickBall.addEventListener("touchend", dragLeave);
};

const dragStart = (): void => {
  if (!model) return;
  dragUpdate();
};

const dragUpdate = (): void => {
  if (vectorMagnitude !== 0) {
    model.translateZ(vectorMagnitude / 10000);
  }
  updateRequestId = requestAnimationFrame(dragUpdate);
};

const dragMove = (event: TouchEvent): void => {
  event.preventDefault();

  const pageX = event.touches[0].pageX;
  const pageY = event.touches[0].pageY;

  let touchX =
    Math.abs(pageX - joystickCenterX) < joystickLimitNumber
      ? pageX - joystickCenterX
      : pageX - joystickCenterX > 0
      ? joystickLimitNumber
      : -joystickLimitNumber;

  let touchY =
    Math.abs(pageY - joystickCenterY) < joystickLimitNumber
      ? pageY - joystickCenterY
      : pageY - joystickCenterY > 0
      ? joystickLimitNumber
      : -joystickLimitNumber;

  const vector2d = new THREE.Vector2(touchX, touchY);

  vectorMagnitude = vector2d.x * vector2d.x + vector2d.y * vector2d.y;

  const vector3d = new THREE.Vector3(vector2d.x * 1000, 0, vector2d.y * 1000);
  model.lookAt(vector3d);

  joystickBall.style.left = `calc(50% + ${touchX}px)`;
  joystickBall.style.top = `calc(50% + ${touchY}px)`;
};

const dragLeave = (): void => {
  joystickBall.style.top = "50%";
  joystickBall.style.left = "50%";
  cancelAnimationFrame(updateRequestId);
  vectorMagnitude = 0;
};

const setUpScene = (): void => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  setScene();
  setCamera();
  setObjects();
  setLights();
  setRenderer();
};

const setScene = (): void => {
  scene = new THREE.Scene();
};

const setCamera = (): void => {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 8, 8);
  camera.lookAt(new THREE.Vector3());
};

const setObjects = (): void => {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshPhongMaterial({ color: 0x7140ce });

  model = new THREE.Mesh(geo, mat);
  model.rotation.y = THREE.MathUtils.degToRad(45);
  scene.add(model);
};

const setLights = (): void => {
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
  frontLight.position.set(1, 10, 20);
  scene.add(frontLight);
  const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
  backLight.position.set(-1, 10, -10);
  scene.add(backLight);
};

const setRenderer = (): void => {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
  });
  renderer.setClearColor(0x8cafea);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setAnimationLoop(() => {
    renderStage();
  });
};

const renderStage = (): void => {
  renderer.render(scene, camera);
};

const bindEvents = (): void => {
  window.addEventListener("resize", () => {
    onResize();
  });
};

const onResize = (): void => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  joystickCenterX =
    joystickBall.getBoundingClientRect().left + joystickBall.clientWidth / 2;
  joystickCenterY =
    joystickBall.getBoundingClientRect().top + joystickBall.clientHeight / 2;
};

init();
