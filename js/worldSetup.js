import * as THREE from 'three';
import { VIEW_POSITION, VIEW_LOOK_AT } from './constants.js';
import { AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY, TEXTURE } from './constants.js';



export function getEnvironmentMap(renderer) {
    const loader = new THREE.CubeTextureLoader();
    const envMap = loader.load([
        TEXTURE.brick_wall2.texture_map,
        TEXTURE.window_wall2.texture_map,
        TEXTURE.ceiling.texture_map,
        TEXTURE.wooden_floor.texture_map,
        TEXTURE.wall2.texture_map,
        TEXTURE.brick_wall2.texture_map,
    ],
    () => {
        console.log('Environment map loaded successfully');
    },
    undefined,
    (error) => {
        console.error('Error loading environment map:', error);
    });

    // const pmremGenerator = new THREE.PMREMGenerator(renderer);
    // const processedEnvMap = pmremGenerator.fromCubemap(envMap).texture;
    // pmremGenerator.dispose();

    // // Scale the intensity of the environment map
    // processedEnvMap.encoding = THREE.sRGBEncoding;
    // processedEnvMap.intensity = 0.5; // Reduce intensity (default is 1.0)

    return envMap;
}

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(VIEW_POSITION.x, VIEW_POSITION.y, VIEW_POSITION.z);
    camera.lookAt(VIEW_LOOK_AT.x, VIEW_LOOK_AT.y, VIEW_LOOK_AT.z); // Look at the origin
    return camera;
}

export function createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

export function addAmbientLight() {
    const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY); // Soft background lighting
    return ambientLight;
}