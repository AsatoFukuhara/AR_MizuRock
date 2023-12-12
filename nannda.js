/*
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// テクスチャの読み込み
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load( 'http://localhost:8000/erasel3.png' );

// マテリアルの読み込み
const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } ); // 両面を描画するように設定

// 円柱のジオメトリを作成
const radiusTop = 2;
const radiusBottom = 2;
const height = 0.2;
const radialSegments = 100;
const geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, 0, Math.PI );
//geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( positionArray ), 3 ) );


// メッシュの作成
const protractor = new THREE.Mesh( geometry, material );

// シーンにメッシュを追加
scene.add( protractor );

// レンダリングループの設定
const animate = () => {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	protractor.rotation.x += 0.01;
	protractor.rotation.y += 0.01;

};

animate();
console.log( geometry.attributes.position.array );

*/
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// マテリアルの読み込み
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

// 円柱のジオメトリを手動で作成
const radiusTop = 2;
const radiusBottom = 2;
const height = 0.2;
const radialSegments = 100;

const geometry = new THREE.BufferGeometry();
const positions = [];
const indices = [];

for (let i = 0; i <= radialSegments; i++) {
    const theta = (i / radialSegments) * Math.PI * 2;
    const x = Math.cos(theta);
    const z = Math.sin(theta);

    positions.push(radiusTop * x, height / 2, radiusTop * z);
    positions.push(radiusBottom * x, -height / 2, radiusBottom * z);

    if (i < radialSegments) {
        const current = i * 2;
        const next = (i + 1) * 2;

        indices.push(current, current + 1, next);
        indices.push(current + 1, next + 1, next);
    }
}

geometry.setIndex(indices);
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

// メッシュの作成
const protractor = new THREE.Mesh(geometry, material);

// シーンにメッシュを追加
scene.add(protractor);

// レンダリングループの設定
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    protractor.rotation.x += 0.01;
    protractor.rotation.y += 0.01;
};

animate();
