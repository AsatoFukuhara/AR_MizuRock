import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// テクスチャの読み込み
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('kesi.jpg'); // 消しゴムのテクスチャ画像のパス

// 3Dモデルの読み込み
const loader = new GLTFLoader();
let eraser: THREE.Group;

loader.load('eraser_model.gltf', (gltf) => {
    eraser = gltf.scene;
    eraser.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshBasicMaterial({ map: texture });
        }
    });

    // 直方体のジオメトリを変更する
    eraser.scale.set(1, 0.5, 0.4);

    scene.add(eraser);
});

// ライトの設定
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 2);
scene.add(light);

// レンダリングループの設定
const animate = () => {
    requestAnimationFrame(animate);
    if (eraser) {
        eraser.rotation.x += 0.01;
        eraser.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
};

animate();
