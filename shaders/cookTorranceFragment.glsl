precision mediump float;

uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform vec3 viewPosition;
uniform vec3 objectColor;

uniform float roughness;
uniform float metalness;

varying vec3 vNormal;
varying vec3 vPosition;

uniform int useSnoise;

// GGX Normal Distribution Function
float D_GGX(float NdotH, float alpha) {
    float a2 = alpha * alpha;
    float denom = (NdotH * NdotH) * (a2 - 1.0) + 1.0;
    return a2 / (3.14159 * denom * denom);
}

// Smith Geometry Function (Schlick-GGX)
float G_SchlickGGX(float NdotV, float alpha) {
    float k = (alpha + 1.0) * (alpha + 1.0) / 8.0;
    return NdotV / (NdotV * (1.0 - k) + k);
}

float G_Smith(float NdotV, float NdotL, float alpha) {
    return G_SchlickGGX(NdotV, alpha) * G_SchlickGGX(NdotL, alpha);
}

// Fresnel Schlick approximation
vec3 F_Schlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}


void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(viewPosition - vPosition);
    vec3 L = normalize(lightPosition - vPosition);
    vec3 H = normalize(V + L);

    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.0);
    float NdotH = max(dot(N, H), 0.0);
    float VdotH = max(dot(V, H), 0.0);

    float alpha;

    // if (useSnoise == 1) {
    //     // Simple fake noise using sine waves — you can replace with Perlin later
    //     // float noise = sin(vPosition.x * 20.0) * 0.5 + 0.5;
    //     // Scale the noise to create roughness variation (between 0.8× and 1.5× the input roughness)
    //     // float rough = mix(roughness, roughness * 1.5, noise);
    //     float n = snoise(vPosition * 5.0);  // Range: -1 to +1
    //     float rough = mix(roughness * 0.8, roughness * 1.5, n * 0.5 + 0.5);
    //     alpha = rough * rough;
    // }
    // else {
    //     alpha = roughness * roughness;
    // }

    float n = snoise(vPosition * 5.0);  // Range: -1 to +1
    float rough = mix(roughness * 0.8, roughness * 1.5, n * 0.5 + 0.5);
    alpha = rough * rough;

    // Fresnel term
    vec3 F0 = mix(vec3(0.04), objectColor, metalness);
    vec3 F = F_Schlick(VdotH, F0);
    float fresnelNoise = 1.0;
    // if (useSnoise == 1) {
    //     // Apply noise to the Fresnel term
    // }
    fresnelNoise = snoise(vPosition * 10.0) * 0.1 + 0.5;

    F *= fresnelNoise;

    // float fresnelNoise = snoise(vPosition * 10.0) * 0.5 + 0.5;
    // F *= fresnelNoise;

    // Geometry term
    float G = G_Smith(NdotV, NdotL, alpha);

    // Normal Distribution Function (GGX)
    float D = D_GGX(NdotH, alpha);

    // Cook-Torrance BRDF
    vec3 specular = (D * G * F) / (2.0 * NdotV * NdotL + 0.0001);

    // Energy conservation: no diffuse for metals
    vec3 kD = vec3(1.0 - metalness);

    // Ambient
    vec3 ambient = 0.2 * objectColor;

    // Final color
    vec3 Lo = ((kD * objectColor / 3.14159 )+ specular) * lightColor * NdotL;

    gl_FragColor = vec4(ambient + Lo, 1.0);
}
