import * as THREE from 'three';
import { color, ior, metalness, roughness, texture } from 'three/tsl';
import {MATERIAL_MODEL_TYPE} from './material_model.js'



export const LIGHT_POSITION = new THREE.Vector3(2.7, 8, 0); // Default light position
export const LIGHT_COLOR = new THREE.Color(1, 1, 1); // Default light color
export const LIGHT_INTENSITY = 50; // Default light intensity
export const LIGHT_DISTANCE = 120; // Default light distance
export const LIGHT_SPEED = 3; // Default light speed
// export const LIGHT_COLOR = new THREE.Color(0,0,0); // Default light color

export const AMBIENT_LIGHT_COLOR = new THREE.Color(1,1,1); // Default ambient light color
export const AMBIENT_LIGHT_INTENSITY = 0.2; // Default ambient light intensity

export const VIEW_POSITION = new THREE.Vector3(0 , 0, 25); // Default view position
// export const VIEW_POSITION = new THREE.Vector3(0, 1, 0); // Default view position
export const VIEW_LOOK_AT = new THREE.Vector3(0, 0, 0); // Default view look at position

export const OBJECT_PROPERTIES = {
    sphere: [
        {
            renderType: MATERIAL_MODEL_TYPE.PHONG,
            position:new THREE.Vector3(-15, -6, -1),
            radius: 3,
            color: new THREE.Color(0.44, 0.66, 0.88),
            // color: new THREE.Color(0.75, 0.75, 0.75),
            specular: LIGHT_COLOR
        },
        {
            renderType: MATERIAL_MODEL_TYPE.COOK_TORRANCE,
            position:new THREE.Vector3(-10, -2, -10),
            radius: 3,
            color: new THREE.Color(0.75, 0.75, 0.75),
            specular: LIGHT_COLOR,
            roughness: 0.7,
            metalness: 1,
            noise: true,
        },
        {
            renderType: MATERIAL_MODEL_TYPE.COOK_TORRANCE,
            position:new THREE.Vector3(10, -2, -10),
            radius: 3,
            color: new THREE.Color(0.95, 0.64, 0.32),
            specular: LIGHT_COLOR,
            roughness: 0.4,
            metalness: 1,
            noise : true,
        },
        {
            renderType: MATERIAL_MODEL_TYPE.MIRROR,
            position:new THREE.Vector3(0, 10, -10),
            radius: 8,
            color: new THREE.Color(0.95,0.3,0),
            specular: LIGHT_COLOR,
            reflects: true,
        },
        {
            renderType: MATERIAL_MODEL_TYPE.GLASS,
            position:new THREE.Vector3(0, -2, -20),
            radius: 4,
            color: new THREE.Color(0.95,0.3,0),
            specular: LIGHT_COLOR,
            reflects: true,
            ior: 1.1, // Index of refraction for glass
            opacity: 0.1, // Opacity of the glass material (0.0 to 1.0)
        },
    ],
    cube: {
        position: new THREE.Vector3(15, -6, -1),
        width: 4,
        height: 4,
        depth: 4,
        color: new THREE.Color(0.87, 0.18, 0.47),
        specular: LIGHT_COLOR
    },
    planes:[
        {
            // base
            width: 40,
            height: 30,
            position: new THREE.Vector3(0, -8, -5),
            rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
            shadingProperty: MATERIAL_MODEL_TYPE.TEXTURE,
            texture: 'brick_wall',
        },
        {
            // top
            width: 40,
            height: 30,
            position: new THREE.Vector3(0, 12, -5),
            rotation: new THREE.Vector3(Math.PI / 2, 0, 0),
            shadingProperty: MATERIAL_MODEL_TYPE.TEXTURE,
            texture: 'brick_wall',
        },
        {
            // back
            width: 40,
            height: 20,
            position: new THREE.Vector3(0, 2, -20),
            rotation: new THREE.Vector3(0, 0, 0),
            shadingProperty: MATERIAL_MODEL_TYPE.TEXTURE,
            texture: 'brick_wall',
        },
        {
            // left
            width: 30,
            height: 20,
            position: new THREE.Vector3(-20, 2, -6),
            rotation: new THREE.Vector3(0, Math.PI / 2, 0),
            shadingProperty: MATERIAL_MODEL_TYPE.TEXTURE,
            texture: 'brick_wall',
        },
        {
            // right
            width: 30,
            height: 20,
            position: new THREE.Vector3(20, 2, -6),
            rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
            shadingProperty: MATERIAL_MODEL_TYPE.TEXTURE,
            texture: 'carpet'
        },

    ]
}

export const MATERIAL_PROPERTIES = {
    sphere: [
        {
            color: new THREE.Color(0.44, 0.66, 0.88),
            specular: LIGHT_COLOR
        },
        {
            color: new THREE.Color(0.44, 0.66, 0.88),
            specular: LIGHT_COLOR
        }
    ],
    cube: {
        color: new THREE.Color(0.87, 0.18, 0.47),
        specular: LIGHT_COLOR
    },
    planes: [
        {color: new THREE.Color(1, 0.8, 0.5)},
        {color: new THREE.Color(1, 0.8, 0.5)},
        {color: new THREE.Color(0.5, 0.8, 1)},
        {color: new THREE.Color(0.5, 0.8, 0)},
        {color: new THREE.Color(0.5, 0.8, 0)}
    ],        
}

export const TEXTURE = {
    brick_wall:
    {
        normal_map : 'images/textures/Bricks101_1K-PNG/Bricks101_1K-PNG_NormalGL.png',
        texture_map : 'images/textures/Bricks101_1K-PNG/Bricks101_1K-PNG_Color.png',
        roughness_map : 'images/textures/Bricks101_1K-PNG/Bricks101_1K-PNG_Roughness.png',
        displacement_map : 'images/textures/Bricks101_1K-PNG/Bricks101_1K-PNG_Displacement.png',
        ambient_occlusion_map : 'images/textures/Bricks101_1K-PNG/Bricks101_1K-PNG_AmbientOcclusion.png',
    },
    carpet: {
        normal_map : 'images/textures/Carpet016_1K-PNG/Carpet016_1K-PNG_NormalGL.png',
        texture_map : 'images/textures/Carpet016_1K-PNG/Carpet016_1K-PNG_Color.png',
        roughness_map : 'images/textures/Carpet016_1K-PNG/Carpet016_1K-PNG_Roughness.png',
        displacement_map : 'images/textures/Carpet016_1K-PNG/Carpet016_1K-PNG_Displacement.png',
        ambient_occlusion_map : 'images/textures/Carpet016_1K-PNG/Carpet016_1K-PNG_AmbientOcclusion.png',
    },
    brick_wall2: {
        texture_map : 'images/textures/brick_wall.jpg',
    },
    wooden_floor: {
        texture_map : 'images/textures/wooden_floor.jpeg',
    },
    window_wall: {
        texture_map : 'images/textures/window_wall.jpg',
    },
    window_wall2: {
        texture_map : 'images/textures/window_wall2.jpg',
    },
    ceiling: {
        texture_map : 'images/textures/ceiling.jpg',
    },
    wall2: {
        texture_map : 'images/textures/wall2.jpg',
    },

}


