export const silkVertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;
    
    vec3 pos = position;
    
    // Wind effect: stronger at the bottom (assuming uv.y = 1 is top, 0 is bottom)
    float windStrength = (1.0 - uv.y) * 0.5;
    float wave = sin(pos.x * 3.0 + time * 1.2) * cos(pos.y * 2.0 + time * 0.8);
    float microWave = sin(pos.x * 10.0 + time * 2.0) * 0.05;
    
    pos.z += (wave + microWave) * windStrength;
    pos.x += sin(time * 0.5) * windStrength * 0.2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const silkFragmentShader = `
  uniform vec3 color;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Simple silk sheen effect based on normal
    vec3 viewDir = vec3(0.0, 0.0, 1.0); // Simplified view dir
    float sheen = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 3.0);
    
    vec3 finalColor = color + vec3(sheen * 0.4); // Add white/gold sheen
    
    gl_FragColor = vec4(finalColor, 0.85); // Slightly transparent silk
  }
`;
