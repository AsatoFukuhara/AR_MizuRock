"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('note.jpg');
var material = new THREE.MeshBasicMaterial({ map: texture });
// サイズを変更できるようにするパラメータ
var width = 1; // 幅
var height = 0.1; // 高さ
var depth = 1; // 奥行き
var geometry = new THREE.BoxGeometry(width, height, depth);
var notebook = new THREE.Mesh(geometry, material);
scene.add(notebook);
var animate = function () {
    requestAnimationFrame(animate);
    notebook.rotation.x += 0.01;
    notebook.rotation.y += 0.01;
    renderer.render(scene, camera);
};
animate();
