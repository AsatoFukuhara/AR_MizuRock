import { group } from './AREngine'
import * as THREE from 'three';
// Function to move the object based on keyboard input
export function moveObject() {
    document.addEventListener('keydown', (event) => {
        let rotation = group.rotation.clone().y;
        let speed = 0.1;
        console.log(rotation);
        switch (event.key) {
            case 's':
                group.position.add(new THREE.Vector3(Math.sin(rotation)*speed,0,Math.cos(rotation)*speed));
                break;
            case 'w'://正面方向
                group.position.add(new THREE.Vector3(-Math.sin(rotation)*speed,0,-Math.cos(rotation)*speed));
                break;
            case 'a':
                group.rotation.y += 0.05;
                //console.log(group.rotation)
                break;
            case 'd':
                group.rotation.y -= 0.05;
                break;
        }
    });
}