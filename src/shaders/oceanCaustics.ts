export const oceanCausticsVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const oceanCausticsFragmentShader = `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;

  // Simple Voronoi noise for caustics effect
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  float voronoi(vec2 x) {
    vec2 n = floor(x);
    vec2 f = fract(x);
    float res = 8.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 b = vec2(float(i), float(j));
        vec2 r = vec2(b) - f + hash(n + b);
        float d = dot(r, r);
        res = min(res, d);
      }
    }
    return sqrt(res);
  }

  void main() {
    vec2 uv = vUv * 5.0;
    uv.y += time * 0.1;
    uv.x += sin(time * 0.2 + uv.y) * 0.2;
    
    float c = voronoi(uv);
    c = 1.0 - c;
    c = pow(c, 3.0); // Sharpen the caustics
    
    vec3 finalColor = color + vec3(c * 0.3); // Add caustics glow
    gl_FragColor = vec4(finalColor, c * 0.5); // Semi-transparent
  }
`;
