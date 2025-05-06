import { createCamera, createRenderer, addAmbientLight, getEnvironmentMap } from './js/worldSetup.js';
import { createLights } from './js/lighting.js';
import { setupObjects } from './js/sceneObjects.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import {LIGHT_SPEED} from './js/constants.js';


(async function init() {
    const renderer = createRenderer();
    const renderTarget = await new THREE.WebGLRenderTarget(
        window.innerWidth, 
        window.innerHeight,
        {
            format: THREE.RGBAFormat,
            type: THREE.UnsignedByteType
        }
    );

    const scene = new THREE.Scene();
    const environmentMap = getEnvironmentMap(renderer);
    scene.background = environmentMap; // Set the background to black
    scene.environment = environmentMap; // Set the environment for reflections

    const camera = createCamera();

    // Add Light
    const lights = createLights();
    for (let i = 0; i < lights.length; i++) {
        scene.add(lights[i]);
    }

    const ambientLight = addAmbientLight();
    scene.add(ambientLight);

    await setupObjects(scene, camera, environmentMap);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.05;

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        scene.overrideMaterial = null; // or skip objects like glass
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null); // Reset render target to default

        controls.update(); // Update controls
        const elapsed = clock.getElapsedTime();


        scene.traverse((child) => {
            if (child.isMesh && child.material.isShaderMaterial) {
                if (child.material.uniforms.viewPosition) {
                    child.material.uniforms.viewPosition.value.copy(camera.position);

                }
                if (child.material.uniforms.lightPosition) {
                    child.material.uniforms.lightPosition.value.copy(lights[0].position);
                                        // loop over lights
                    // and set the light position in the shader
                    // for (let i = 0; i < lights.length; i++) {
                    //     const light = lights[i]; // Assuming you have only one light for simplicity
                    //     child.material.uniforms.lightPositions.value[i].copy(light.position);
                    // }

                    // customPhongMaterial.uniforms.lightPosition.value.copy(light.position);
                }
            }
        });

        scene.children.forEach((child) => {
            if (child.type == 'PointLight' || child.type == 'PointLightHelper') {
                if (child.motionProperty == 'movement') {
                    // child.position.x = Math.sin(Date.now() * 0.001) * 5;
                    // child.position.z = Math.cos(Date.now() * 0.001) * 5;
                    child.position.x = Math.sin(elapsed * LIGHT_SPEED) * 20;
                    child.position.z = Math.cos(elapsed * LIGHT_SPEED) * 20 - 10;
                    // move the light in a sinusoidal y direction
                    child.position.y = Math.sin(elapsed * LIGHT_SPEED * 5) * 2 + 4 ;
                }
            }
            else{
                if (child.geometry != undefined) {
                    if (child.geometry.type != 'PlaneGeometry' && child.geometry.type != 'SphereGeometry') {
                        child.rotation.x += 0.005;
                        child.rotation.y += 0.005;
                    }
                    if (child.geometry.type == 'SphereGeometry') {
                        if (child.reflects) {
                            child.material.uniforms.viewPosition.value.copy(camera.position);
                            child.material.uniforms.envMap.value.copy(environmentMap);
                        }
                    }
                }
            }
        });

        renderer.render(scene, camera);

    }

    animate();

})();
