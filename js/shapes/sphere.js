import * as THREE from 'three';
import { createPhongMaterial } from '../material/phongMaterial.js';
import { createCookTorranceMetalMaterial } from '../material/cookTorranceMaterial.js';
import { createGlassMaterial } from '../material/glassMaterial.js';
import { MATERIAL_PROPERTIES, OBJECT_PROPERTIES } from '../constants.js';
import {MATERIAL_MODEL_TYPE} from '../material_model.js';
import { createMirrorMaterial } from '../material/mirrorMaterial.js';



async function createSphere(properties, scene, camera, model, envMap) {
    const geometry = new THREE.SphereGeometry(properties.radius, 32, 32);
    var material = null;
    // geometry.computeVertexNormals(); // Compute normals for lighting
    if (model == MATERIAL_MODEL_TYPE.PHONG) {
        material = await createPhongMaterial(properties.color, scene, camera);
    }
    else if (model == MATERIAL_MODEL_TYPE.COOK_TORRANCE) {
        material = await createCookTorranceMetalMaterial(properties);
    }
    else if (model == MATERIAL_MODEL_TYPE.GLASS) {
        material = await createGlassMaterial(properties);
    }
    else if (model == MATERIAL_MODEL_TYPE.MIRROR) {
        material = await createMirrorMaterial(properties, envMap);
    }
    
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(properties.position.x, properties.position.y, properties.position.z);
    return sphere;
}


export async function createSpheres(scene, camera, envMap) {
    const sphere_list = [];
    const sphereObjects = OBJECT_PROPERTIES.sphere;
    // const sphereMaterials = MATERIAL_PROPERTIES.sphere;
    const sphereCount = sphereObjects.length; // Number of spheres to create

    for (let i = 0; i < sphereCount; i++) {
        const sphereProperties = sphereObjects[i];
        const sphere = await createSphere(sphereProperties, scene, camera, sphereProperties.renderType, envMap);
        if (sphereProperties.renderType == MATERIAL_MODEL_TYPE.MIRROR) {
            sphere.reflects = sphereProperties.reflects; // Set the reflects property for the mirror material
            sphere.material.envMap = envMap; // Set the environment map for the mirror material
        }
        else{
            sphere.reflects = false;
        }
        sphere_list.push(sphere);
    }
    return sphere_list;
}

