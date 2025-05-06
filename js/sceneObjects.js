import { createSpheres } from './shapes/sphere.js';
import { createCube } from './shapes/cube.js';
import { createPlanes } from './shapes/plane.js';
import { OBJECT_PROPERTIES } from './constants.js';

export async function setupObjects(scene, camera, envMap) {

        // Create and add objects to the scene

        // Sphere
        const spheres = await createSpheres(scene, camera, envMap);
        for (let i = 0; i < spheres.length; i++) {
            scene.add(spheres[i]);
        }

        // Cube
        const cube = await createCube(scene, camera);
        cube.position.set(OBJECT_PROPERTIES.cube.position.x, OBJECT_PROPERTIES.cube.position.y, OBJECT_PROPERTIES.cube.position.z);
        scene.add(cube);

        // Planes
        // const planes = await createPlanes(scene);
        // for (let i = 0; i < planes.length; i++) {
        //     scene.add(planes[i]);
        // }

        // return scene
}
