"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var canvas;
var scene;
var camera;
var renderer;
var model;
var joystickBall;
var vectorMagnitude = 0;
var updateRequestId;
var joystickCenterX;
var joystickCenterY;
var joystickLimitNumber = 35;
var init = function () {
    setupJoystick();
    setUpScene();
    bindEvents();
};
var setupJoystick = function () {
    joystickBall = document.getElementById("joystick-ball");
    joystickCenterX =
        joystickBall.getBoundingClientRect().left + joystickBall.clientWidth / 2;
    joystickCenterY =
        joystickBall.getBoundingClientRect().top + joystickBall.clientHeight / 2;
    joystickBall.addEventListener("touchstart", dragStart);
    joystickBall.addEventListener("touchmove", dragMove);
    joystickBall.addEventListener("touchend", dragLeave);
};
var dragStart = function () {
    if (!model)
        return;
    dragUpdate();
};
var dragUpdate = function () {
    if (vectorMagnitude !== 0) {
        model.translateZ(vectorMagnitude / 10000);
    }
    updateRequestId = requestAnimationFrame(dragUpdate);
};
var dragMove = function (event) {
    event.preventDefault();
    var pageX = event.touches[0].pageX;
    var pageY = event.touches[0].pageY;
    var touchX = Math.abs(pageX - joystickCenterX) < joystickLimitNumber
        ? pageX - joystickCenterX
        : pageX - joystickCenterX > 0
            ? joystickLimitNumber
            : -joystickLimitNumber;
    var touchY = Math.abs(pageY - joystickCenterY) < joystickLimitNumber
        ? pageY - joystickCenterY
        : pageY - joystickCenterY > 0
            ? joystickLimitNumber
            : -joystickLimitNumber;
    var vector2d = new THREE.Vector2(touchX, touchY);
    vectorMagnitude = vector2d.x * vector2d.x + vector2d.y * vector2d.y;
    var vector3d = new THREE.Vector3(vector2d.x * 1000, 0, vector2d.y * 1000);
    model.lookAt(vector3d);
    joystickBall.style.left = "calc(50% + ".concat(touchX, "px)");
    joystickBall.style.top = "calc(50% + ".concat(touchY, "px)");
};
var dragLeave = function () {
    joystickBall.style.top = "50%";
    joystickBall.style.left = "50%";
    cancelAnimationFrame(updateRequestId);
    vectorMagnitude = 0;
};
var setUpScene = function () {
    canvas = document.getElementById("canvas");
    setScene();
    setCamera();
    setObjects();
    setLights();
    setRenderer();
};
var setScene = function () {
    scene = new THREE.Scene();
};
var setCamera = function () {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 8, 8);
    camera.lookAt(new THREE.Vector3());
};
var setObjects = function () {
    var geo = new THREE.BoxGeometry(1, 1, 1);
    var mat = new THREE.MeshPhongMaterial({ color: 0x7140ce });
    model = new THREE.Mesh(geo, mat);
    model.rotation.y = THREE.MathUtils.degToRad(45);
    scene.add(model);
};
var setLights = function () {
    var ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    var frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
    frontLight.position.set(1, 10, 20);
    scene.add(frontLight);
    var backLight = new THREE.DirectionalLight(0xffffff, 0.2);
    backLight.position.set(-1, 10, -10);
    scene.add(backLight);
};
var setRenderer = function () {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
    });
    renderer.setClearColor(0x8cafea);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(function () {
        renderStage();
    });
};
var renderStage = function () {
    renderer.render(scene, camera);
};
var bindEvents = function () {
    window.addEventListener("resize", function () {
        onResize();
    });
};
var onResize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    joystickCenterX =
        joystickBall.getBoundingClientRect().left + joystickBall.clientWidth / 2;
    joystickCenterY =
        joystickBall.getBoundingClientRect().top + joystickBall.clientHeight / 2;
};
init();
