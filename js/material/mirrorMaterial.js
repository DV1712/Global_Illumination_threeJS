import * as THREE from 'three';

async function loadShader(file) {
  const response = await fetch(file);
  return await response.text();
}

export async function createMirrorMaterial(envMap) {
  const vertexShader = await loadShader('shaders/mirrorVertex.glsl');
  const fragmentShader = await loadShader('shaders/mirrorFragment.glsl');

  return new THREE.ShaderMaterial({
    uniforms: {
      viewPosition: { value: new THREE.Vector3() },
      envMap: { value: new THREE.CubeTexture() },
    },
    vertexShader,
    fragmentShader,
    side: THREE.FrontSide
  });
}
