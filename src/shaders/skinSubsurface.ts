export const skinSubsurfaceVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const skinSubsurfaceFragmentShader = `
  uniform vec3 color;
  uniform float time;
  uniform vec3 lightPosition;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 lightDir = normalize(lightPosition - vViewPosition);

    // Basic diffuse
    float diff = max(dot(normal, lightDir), 0.0);

    // Subsurface scattering approximation (wrap lighting)
    float wrap = 0.5;
    float scatter = max(0.0, (dot(normal, lightDir) + wrap) / (1.0 + wrap));
    scatter = pow(scatter, 2.0) * 0.4;
    
    // Rim light for peach fuzz effect
    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
    rim = smoothstep(0.6, 1.0, rim);
    
    vec3 sssColor = vec3(0.8, 0.3, 0.2); // Reddish subsurface color
    vec3 finalColor = color * diff + sssColor * scatter + vec3(1.0, 0.9, 0.8) * rim * 0.2;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
