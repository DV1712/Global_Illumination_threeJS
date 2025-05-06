import * as THREE from 'three';
import { LIGHT_POSITION, LIGHT_COLOR, LIGHT_INTENSITY, LIGHT_DISTANCE } from './constants';

function createPointLight(motionProperty = "movement") {
    const light = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY, LIGHT_DISTANCE); // White light
    light.position.set(LIGHT_POSITION.x, LIGHT_POSITION.y, LIGHT_POSITION.z);

    // Create a helper to mark the light
    // const lightHelper = new THREE.PointLightHelper(light, 0.2, 0x00ff00); // Green color for the helper
    const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    light.add(sphere);
    light.motionProperty = motionProperty; // Add a custom property to the light object
    // return [light,lightHelper];
    return light;
}


export function createLights() {
    // define collection of lights and create a point light and add to the list
    const lights = [];    
    lights.push(createPointLight("movement")); // Add a point light to the scene
    // lights.push(createPointLight("static")); // Add a static point light to the scene

    // wall lights
    
    // scene.add(lightHelper);
    return lights;
}
