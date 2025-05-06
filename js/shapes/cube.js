import * as THREE from 'three';
import { createPhongMaterial } from '../material/phongMaterial.js';
import { OBJECT_PROPERTIES } from '../constants.js';

export async function createCube(scene, camera) {
    const properties = OBJECT_PROPERTIES.cube
    const geometry = new THREE.BoxGeometry(properties.width, properties.height, properties.depth);
    const material = await createPhongMaterial(properties.color,scene, camera);
    return new THREE.Mesh(geometry, material);
}
