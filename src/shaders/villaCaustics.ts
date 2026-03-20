export const villaCausticsVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const villaCausticsFragmentShader = `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

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
    // Project caustics based on world position to look like they are coming from the open doors
    vec2 uv = vWorldPosition.xz * 0.5;
    uv.y += time * 0.05;
    uv.x += sin(time * 0.1 + uv.y) * 0.1;
    
    float c = voronoi(uv);
    c = 1.0 - c;
    c = pow(c, 4.0); // Sharpen the caustics
    
    // Fade out caustics as they get further into the room (away from doors at z = -10)
    float fade = smoothstep(0.0, -10.0, vWorldPosition.z);
    
    vec3 finalColor = color + vec3(c * 0.5 * fade);
    gl_FragColor = vec4(finalColor, c * 0.3 * fade);
  }
`;
