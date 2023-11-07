import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('note.jpg');

const material = new THREE.MeshBasicMaterial({ map: texture });

// サイズを変更できるようにするパラメータ
const width = 1; // 幅
const height = 0.1; // 高さ
const depth = 1; // 奥行き

const geometry = new THREE.BoxGeometry(width, height, depth);

const notebook = new THREE.Mesh(geometry, material);

scene.add(notebook);

const animate = () => {
    requestAnimationFrame(animate);
    notebook.rotation.x += 0.01;
    notebook.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();
