import * as THREE from 'three';
import { createPhongMaterial } from '../material/phongMaterial.js';
import { MATERIAL_PROPERTIES, OBJECT_PROPERTIES, TEXTURE } from '../constants.js';


async function generatePlane(width, height, rotation, position, color, texturePath) {
    const geometry = new THREE.PlaneGeometry(width, height);

    const textureLoader = new THREE.TextureLoader();
    const baseColorMap = textureLoader.load(TEXTURE.brick_wall.texture_map);
    const normalMap = textureLoader.load(TEXTURE.brick_wall.normal_map);
    const roughnessMap = textureLoader.load(TEXTURE.brick_wall.roughness_map);
    const ambientOcculsionMap = textureLoader.load(TEXTURE.brick_wall.ambient_occlusion_map);
    const displacementMap = textureLoader.load(TEXTURE.brick_wall.displacement_map);

    geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));


    // const material = new THREE.MeshStandardMaterial({ 
    //     color: color, 
    //     side: THREE.DoubleSide,
    // });

    const material = new THREE.MeshStandardMaterial({
        map: baseColorMap,
        normalMap: normalMap,
        side: THREE.DoubleSide, // Render both sides of the plane
        roughnessMap: roughnessMap,
        roughness: 1,
        metalness: 0,
        aoMap: ambientOcculsionMap,
        aoMapIntensity: 1,
        displacementMap: displacementMap,
        displacementScale: 0,
        color: 0xffffff, // Set the color to white to see the texture clearly
    });


    // const vertexShader = await fetch('./shaders/brickVertex.glsl').then(res => res.text());
    // const fragmentShader = await fetch('./shaders/brickFragment.glsl').then(res => res.text());
    // const material = new THREE.ShaderMaterial({
    //     vertexShader,
    //     fragmentShader,
    //     uniforms: {
    //         uResolution: { value: new THREE.Vector2(width, height) },
    //         brickColor: { value: new THREE.Color(0.8, 0.3, 0.1) }, // Brick color
    //         mortarColor: { value: new THREE.Color(0.9, 0.9, 0.9) }, // Mortar color
    //     },
    // });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.set(rotation.x, rotation.y, rotation.z);
    plane.position.set(position.x, position.y, position.z);
    return plane
}

export async function createPlanes(scene) {
    const planes_list = []
    const planes = OBJECT_PROPERTIES.planes
    const plane_material = MATERIAL_PROPERTIES.planes

    const brick_texture_path = './images/textures/Bricks101_1K-PNG/Bricks101_1K-PNG_Color.png';
    

    // loop over COnstants OBJECT_PROPERTIES.planes and create a plane for each one
    for (let i = 0; i < OBJECT_PROPERTIES.planes.length; i++) {
        const plane = await generatePlane(
            planes[i].width, planes[i].height, 
            planes[i].rotation, planes[i].position, 
            plane_material[i].color, brick_texture_path);
        planes_list.push(plane);
    }

    // const geometry = new THREE.PlaneGeometry(12, 9); // Large plane
    // const material = new THREE.MeshStandardMaterial({ 
    //     color: MATERIAL_PROPERTIES.planes[0].color, 
    //     side: THREE.DoubleSide,
    // });
    // const plane = new THREE.Mesh(geometry, material);
    // // plane.rotation = new THREE.Vector3(-Math.PI / 2, 0, 0); // Make it lie flat on XZ plane
    // plane.rotation.set(-Math.PI / 2, 0 ,0); // Make it lie flat on XZ 
    // plane.position.set(0, -1, -2); // Center it at the origin
    // // plane.position.y = -1; // Move it down slightly
    // // plane.position.z = -2;


    // Create the wireframe geometry and material
    // const wireframe = new THREE.WireframeGeometry(geometry);
    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    // const wireframeMesh = new THREE.LineSegments(wireframe, lineMaterial);
    // wireframeMesh.rotation.x = -Math.PI / 2;
    // wireframeMesh.position.y = -1;

    
    // group.add(plane);
    // group.add(wireframeMesh);

    // return group
    // plane.add(wireframeMesh);
    // scene.add(plane);
    return planes_list
}
