precision mediump float;

uniform vec3 viewPosition;
uniform samplerCube envMap;

varying vec3 vWorldPosition;
varying vec3 vNormal;

vec3 F_Schlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(viewPosition - vWorldPosition);

  // Reflect view vector around normal
    vec3 R = reflect(-V, N);
    R.x = -R.x; 

  // Sample the environment using the reflection vector
    vec3 reflectedColor = textureCube(envMap, R).rgb;

  // Optional: Fresnel for rim reflection
    vec3 F0 = vec3(1.0); // Perfect mirror
    vec3 fresnel = F_Schlick(dot(N, V), F0);
    vec3 finalColor = reflectedColor * fresnel;

    gl_FragColor = vec4(finalColor, 1.0);
}
