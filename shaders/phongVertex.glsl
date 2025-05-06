
varying vec3 vNormal;     // To pass normal to the fragment shader
varying vec3 vPosition;   // To pass world position to the fragment shader

void main() {
    // Transform the normal to world space
    // vNormal = normalize(normalMatrix * normal);
    vNormal = normalize(mat3(modelMatrix) * normal);
    
    // Get world position of the vertex
    // vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    
    // Final vertex position
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * vec4(vPosition, 1.0);
}
