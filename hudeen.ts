import * as THREE from 'three';

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// テクスチャの読み込み
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('hudeen2.jpg'); // 画像のパスを指定

// マテリアルの作成
const material = new THREE.MeshBasicMaterial({ map: texture });
//const material = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // 青色に変更


// 円柱のジオメトリを作成
const cylinderRadiusTop = 0.7; // 上面の半径
const cylinderRadiusBottom = 0.7; // 底面の半径
const cylinderHeight = 2.4; // 高さ
const cylinderSegments = 32; // 円周の分割数
const geometry = new THREE.CylinderGeometry(cylinderRadiusTop, cylinderRadiusBottom, cylinderHeight, cylinderSegments);

// メッシュの作成
const cylinder = new THREE.Mesh(geometry, material);

// シーンにメッシュを追加
scene.add(cylinder);

// レンダリングループの設定
const animate = () => {
    requestAnimationFrame(animate);
    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();
