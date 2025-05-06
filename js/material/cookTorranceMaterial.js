import * as THREE from 'three';
import {LIGHT_POSITION,LIGHT_COLOR,VIEW_POSITION} from '../constants.js'
 
async function loadShader(file, augmentCode) {
    let response = await fetch(file).then(r => r.text());
    response = augmentCode + '\n' + response ;
    return response;
}

async function loadShaderChunks(files) {
    const chunks = await Promise.all(files.map(f => fetch(f).then(r => r.text())));
    return chunks.join('\n');
}

export async function createCookTorranceMetalMaterial(properties) {
    let noise = ''; // Placeholder for noise shader

    noise = await loadShaderChunks([
        'shaders/snoise.glsl'
    ]);


    const vertexShader = await loadShader('shaders/cookTorranceVertex.glsl','');
    const fragmentShader = await loadShader('shaders/cookTorranceFragment.glsl', noise);


    // const lights = scene.children.filter(obj => obj instanceof THREE.PointLight);
    // const lightPositions = lights.map(light => light.position);
    // const lightColors = lights.map(light => light.color);

    return new THREE.ShaderMaterial({
        uniforms: {
            lightPosition: { value: new THREE.Vector3() },
            lightColor: { value: LIGHT_COLOR },
            viewPosition: { value: new THREE.Vector3() },
            objectColor: { value: new THREE.Color(properties.color) }, // [r, g, b] in 0–1
            roughness: { value: properties.roughness },
            metalness: { value: properties.metalness },
            addNoise : { value: properties.noise ? 1 : 0 },
        },

        vertexShader,
        fragmentShader,
        lights: false, // Enable lighting
    });
}
