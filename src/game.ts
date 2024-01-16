
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


/*
//全体変更

import { group } from './AREngine'
import * as THREE from 'three';
// Function to move the object based on keyboard input
export function moveObject() {
    let joystickCenterX: number;
    let joystickCenterY: number;
    let joystickLimitNumber: number = 35;
    
    joystickBall.addEventListener("touchmove", dragMove);
    
    const dragMove = (event: TouchEvent) => {
      event.preventDefault();
    
      const pageX = event.touches[0].pageX;
      const pageY = event.touches[0].pageY;
    
      let touchX =
        Math.abs(pageX - joystickCenterX) < joystickLimitNumber
          ? pageX - joystickCenterX
          : pageX - joystickCenterX > 0
          ? joystickLimitNumber
          : -joystickLimitNumber;
      let touchY =
        Math.abs(pageY - joystickCenterY) < joystickLimitNumber
          ? pageY - joystickCenterY
          : pageY - joystickCenterY > 0
          ? joystickLimitNumber
          : -joystickLimitNumber;
    
      // @@@ ジョイスティックの傾きを２次元として用意
      const vector2d = new THREE.Vector2(touchX, touchY);
      
      // 後略
    };

};

*/