precision mediump float;

uniform vec3 viewPosition;
uniform samplerCube envMap;
uniform vec3 objectColor;
uniform float ior;
uniform float baseOpacity;

varying vec3 vNormal;
varying vec3 vPosition;

vec3 F_Schlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(viewPosition - vPosition);
    // Calculate refraction direction using Snell's law
    float eta = 1.0 / ior; // assume air to glass
    vec3 refractedDir = refract(-V, N, eta);

    // vec3 reflectedColor = textureCube(envMap, R).rgb;
    // Use direction to modulate color or simulate depth shift
    vec3 distortedColor = objectColor + 0.1 * refractedDir;



    // Approximate Fresnel reflectance for glass
    vec3 F0 = vec3(0.04); // base reflectivity for glass
    vec3 fresnel = F_Schlick(dot(N, V), F0);

    // Final color is mostly transparent + slight edge glow
    // vec3 color = mix(objectColor, vec3(1.0), fresnel);
    // vec3 color = mix(objectColor, objectColor + fresnel * 0.5, fresnel.r);
    vec3 color = mix(distortedColor, vec3(1.0), fresnel);


    float opacity = baseOpacity + fresnel.r * 0.5; // higher opacity at edges

    gl_FragColor = vec4(color, opacity);
}
