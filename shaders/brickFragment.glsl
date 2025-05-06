precision mediump float;

uniform vec2 uResolution; // Resolution of the plane
uniform vec3 brickColor;
uniform vec3 mortarColor;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    // Brick dimensions
    float brickWidth = 0.4;
    float brickHeight = 0.2;

    // Mortar thickness
    float mortarThickness = 0.02;

    // Calculate brick coordinates
    float x = mod(uv.x, brickWidth + mortarThickness);
    float y = mod(uv.y, brickHeight + mortarThickness);

    // Alternate rows
    float offset = mod(floor(uv.y / (brickHeight + mortarThickness)), 2.0) * 0.5 * brickWidth;

    // Determine if the fragment is in a brick or mortar
    if (x < brickWidth && y < brickHeight) {
        gl_FragColor = vec4(brickColor, 1.0); // Brick color
    } else {
        gl_FragColor = vec4(mortarColor, 1.0); // Mortar color
    }
}