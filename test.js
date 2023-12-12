
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

// マテリアルの読み込み
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );

// 円柱のジオメトリを作成
const radiusTop = 2;
const radiusBottom = 2;
const height = 1;
const radialSegments = 32;

const geometry = new THREE.BufferGeometry();

const positions = [];
const indices = [];

for ( let i = 0; i <= radialSegments; i ++ ) {

	const theta = ( i / radialSegments ) * Math.PI;
	const x = radiusTop * Math.cos( theta );
	const z = radiusBottom * Math.sin( theta );

	positions.push( x, height, z );

	if ( i > 0 ) {

		indices.push( i - 1, i, radialSegments );

	}

}

geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

// メッシュの作成
const cylinder = new THREE.Mesh( geometry, material );



// シーンにメッシュを追加
scene.add( cylinder );

// レンダリングループの設定
const animate = () => {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	cylinder.rotation.x += 0.01;
	cylinder.rotation.y += 0.01;

};

animate();
