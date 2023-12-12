

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 2;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// テクスチャの読み込み
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load( 'http://localhost:8000/erasel3.png' );

// マテリアルの読み込み
const material = new THREE.MeshBasicMaterial( { map: texture } );

// 直方体のジオメトリを作成
const geometry = new THREE.BoxGeometry( 0.5, 0.2, 0.3　);

// メッシュの作成
const cube = new THREE.Mesh(　geometry, material　);

// シーンにメッシュを追加
scene.add(　cube　);

// レンダリングループの設定
const animate = () => {

	requestAnimationFrame(　animate　);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(　scene, camera　);

};

animate();



