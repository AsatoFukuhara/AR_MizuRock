<script setup lang="ts">
import * as THREE from 'three';
import HelloWorld from './components/HelloWorld.vue';
import { onErrorCaptured, onMounted, reactive, ref } from 'vue';
import { useAREngine, type AREngineDelegate } from "./AREngine";
//import AREngine from "./AREngine"
import ChangeScene from './ChangeScene.vue';
import useLogger from './logger';
import type { Matrix4 } from 'three';
import type { ArMarkerControls } from '@ar-js-org/ar.js-threejs/types/ArMarkerControls';
import { gltfLoader } from 'gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const log = useLogger();
const video_canvas = "threejs"
const loder = new GLTFLoader;

onErrorCaptured((err, instance, info) => {
  log.error(err, info);
});
//ここから

export interface ARScene {
    makeObjectTree(): THREE.Object3D;
    animate(sec: number): void;

    name(): string;
};

// class TestScene implements ARScene {
//     cube?: THREE.Object3D;

//     name() { return "test"; }
//     // makeObjectTree(): THREE.Object3D {
        
//     //     const loader = new GLTFLoader();
//     //     loader.load("../data/note.glb", (gltf) => {
//     //         this.cube = gltf.scene;
//     //         this.cube;
//     //         return this.cube;
//     //     });
    
    
        

//         // const material = new THREE.MeshPhongMaterial({
//         //     color: 0xffffff ,
//         // });
//         // const cube = new THREE.Mesh(geometry, material);
//         // this.cube = cube
//         // return cube;
//     }

//     animate(sec: number): void {
//         if (!this.cube) return;

//         // 立方体を回転させるアニメーション
//         //this.cube.rotation.x += 0.01;
//         this.cube.rotation.y += 1 * sec;
//     }
// }


//ここまで追加した

class AREventHandler implements AREngineDelegate {
  onMarkerFound(marker: ArMarkerControls): void {
    //マーカーが見つかった時の処理
    console.log("mitukattayoo")
    const ar_engine = useAREngine();
    ar_engine.addgroup();
    // ar_engine.displayGLBModel('./src/pen.glb', new THREE.Vector3(0, 0.3, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(2, 2, 2));
    // ar_engine.displayGLBModel('./src/note.glb', new THREE.Vector3(0, 0.1, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(2, 2, 2));
    // ar_engine.displayGLBModel('./src/erasel.glb', new THREE.Vector3(0, 0.2, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(2, 2, 2));
    // ar_engine.displayGLBModel('./src/caterpillar.glb', new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(0.1, 0.1, 0.1));
    // const geometry = new THREE.BoxGeometry(1, 1, 1).translate(
    //         0,
    //         0.5,
    //         0
    //     );

    //     const material = new THREE.MeshPhongMaterial({
    //         color: 0xffffff * Math.random(),
    //     });
    //     const cube = new THREE.Mesh(geometry, material);
    //     this.cube = cube
    //     return cube;


    // const webar = useAREngine(); 
    // webar.replaceScene(new TestScene());
  }
}

const ar_engine = useAREngine(); //WebARクラスの唯一のインスタンスを取得
ar_engine.delegate = new AREventHandler();

//本モジュールが表示可能な状態になった直後に実行される
onMounted(() => {
  //webarの初期化
  ar_engine.start(video_canvas);
})


</script>


<template>
  <main>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <HelloWorld msg="You did it!" />
    <ChangeScene></ChangeScene>
  </main>
</template>

<style scoped>
#webar {
  /* display: flex;
  align-items: end; */
  position: fixed;
  bottom: 0;
}

main {
  /* background-color: red; */
  height: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
./AREngine