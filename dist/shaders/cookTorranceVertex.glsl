varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // vNormal = normalize(normalMatrix * normal);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * vec4(vPosition, 1.0);
}