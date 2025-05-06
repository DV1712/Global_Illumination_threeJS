
precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;


// uniform vec3 lightPositions[10]; // Assume max 10 lights for now
// uniform vec3 lightColors[10];
uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform vec3 objectColor;
uniform vec3 viewPosition;
// uniform int numLights;

void main() {
    // Normalize the normal
    vec3 norm = normalize(vNormal);
    // vec3 norm = normalize(mat3(modelViewMatrix) * vNormal);

    // Compute view direction
    vec3 viewDir = normalize(viewPosition - vPosition);

    // Single light implementation for now
    vec3 lightDir = normalize(lightPosition - vPosition);
    // vec3 lightDir = normalize(vPosition - lightPosition); // Inverted for correct lighting
    vec3 reflectDir = reflect(-lightDir, norm);

    // Ambient
    float ambientStrength = 0.2;
    vec3 ambient = ambientStrength * lightColor;

    // Diffuse
    float diffuseStrength = 0.8;
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor * diffuseStrength;

    // Specular
    float specularStrength = 0.5;
    float shininess = 15.0;
    vec3 halfwayDir = normalize(lightDir + viewDir); // Halfway vector for Blinn-Phong
    float spec = pow(max(dot(norm, halfwayDir), 0.0), shininess);
    // float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * lightColor;

    vec3 result = (ambient + diffuse + specular);

    gl_FragColor = vec4(result*objectColor, 1.0);










    // MULTIPLE LIGHT IMPLEMENTATION FOR LATER - IGNORE FOR NOW ----------------------------------------------------------
    // vec3 norm = normalize(vNormal);
    // vec3 result = vec3(0.0);
    // vec3 viewDir = normalize(viewPosition - vPosition);

    // for (int i = 0; i < numLights; i++) {

    //     vec3 lightDir = normalize(lightPositions[i] - vPosition);
    //     vec3 reflectDir = reflect(-lightDir, norm);
    
    //     // Ambient
    //     float ambientStrength = 0.2;
    //     vec3 ambient = ambientStrength * lightColors[i];

    //     // Diffuse
    //     float diffuseStrength = 0.8;
    //     float diff = max(dot(norm, lightDir), 0.0);
    //     vec3 diffuse = diff * lightColors[i] * diffuseStrength;

    //     // Specular
    //     float specularStrength = 0.5;
    //     float shininess = 15.0;
    //     vec3 halfwayDir = normalize(lightDir + viewDir); // Halfway vector for Blinn-Phong
    //     float spec = pow(max(dot(norm, halfwayDir), 0.0), shininess);
    //     // float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    //     vec3 specular = specularStrength * spec * lightColors[i];

    //     result += (ambient + diffuse + specular);
    // }

    // gl_FragColor = vec4(result*objectColor, 1.0);
    
}
