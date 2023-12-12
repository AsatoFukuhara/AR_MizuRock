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

// 半球のジオメトリを作成
const radius = 1;
const widthSegments = 32;
const heightSegments = 16;
const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments, 0, Math.PI, 0, Math.PI );

// メッシュの作成
const hemisphere = new THREE.Mesh( geometry, material );

// シーンにメッシュを追加
scene.add( hemisphere );

// レンダリングループの設定
const animate = () => {

	requestAnimationFrame( animate );
	hemisphere.rotation.x += 0.01;
	hemisphere.rotation.y += 0.01;
	renderer.render( scene, camera );

};

animate();
