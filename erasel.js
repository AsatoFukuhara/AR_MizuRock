"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var GLTFLoader_js_1 = require("three/addons/loaders/GLTFLoader.js");
// シーンの作成
var scene = new THREE.Scene();
// カメラの作成
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
// レンダラーの作成
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// テクスチャの読み込み
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('kesi.jpg'); // 消しゴムのテクスチャ画像のパス
// 3Dモデルの読み込み
var loader = new GLTFLoader_js_1.GLTFLoader();
var eraser;
loader.load('eraser_model.gltf', function (gltf) {
    eraser = gltf.scene;
    eraser.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshBasicMaterial({ map: texture });
        }
    });
    // 直方体のジオメトリを変更する
    eraser.scale.set(1, 0.5, 0.4);
    scene.add(eraser);
});
// ライトの設定
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 2);
scene.add(light);
// レンダリングループの設定
var animate = function () {
    requestAnimationFrame(animate);
    if (eraser) {
        eraser.rotation.x += 0.01;
        eraser.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
};
animate();
