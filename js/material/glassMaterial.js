import * as THREE from 'three';

async function loadShader(file) {
    const response = await fetch(file);
    return await response.text();
}

export async function createGlassMaterial({ color, ior = 1.5, opacity = 0.25, renderTarget}) {
    const vertexShader = await loadShader('shaders/glassVertex.glsl');
    const fragmentShader = await loadShader('shaders/glassFragment.glsl');

    return new THREE.ShaderMaterial({
        uniforms: {
            lightPosition: { value: new THREE.Vector3() },
            viewPosition: { value: new THREE.Vector3() },
            objectColor: { value: new THREE.Color(...color) },
            ior: { value: ior },
            baseOpacity: { value: opacity },
            envMap: { value: new THREE.CubeTexture() },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false, // allow transparency layering
        side: THREE.DoubleSide,
    });
}
