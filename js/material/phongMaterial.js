import * as THREE from 'three';
import {LIGHT_POSITION,LIGHT_COLOR,VIEW_POSITION} from '../constants.js'
 
async function loadShader(file) {
    const response = await fetch(file);
    return await response.text();
}

export async function createPhongMaterial(OBJECT_COLOR, scene, camera) {
    const vertexShader = await loadShader('shaders/phongVertex.glsl');
    const fragmentShader = await loadShader('shaders/phongFragment.glsl');

    const lights = scene.children.filter(obj => obj instanceof THREE.PointLight);
    // const lightPositions = lights.map(light => light.position);
    // const lightColors = lights.map(light => light.color);

    return new THREE.ShaderMaterial({
        uniforms: {
            // lightPositions: { value: lightPositions },
            // lightColors: { value: lightColors},
            // lightPosition: { value: lightPosition },
            lightColor: { value: LIGHT_COLOR },
            objectColor: { value: OBJECT_COLOR},
            // viewPosition: { value: VIEW_POSITION },
            // viewPosition: { value : camera.position.clone() },
            lightPosition: { value: new THREE.Vector3() },
            viewPosition: { value: new THREE.Vector3() },
            // numLights: { value: lights.length },
        },

        vertexShader,
        fragmentShader,
    });
}
