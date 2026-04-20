'use client';

/**
 * Heavy WebGL scene — Three.js + R3F live ONLY in this file
 * so the bundle stays in a separate chunk loaded after window 'load'.
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uPointerInfluence;
  uniform float uIntensity;

  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * snoise(p); p *= 2.02; a *= 0.5; }
    return v;
  }
  vec3 iridescence(float t) {
    vec3 rose  = vec3(1.000, 0.847, 0.894);
    vec3 lav   = vec3(0.847, 0.831, 1.000);
    vec3 mint  = vec3(0.812, 0.961, 0.898);
    vec3 peach = vec3(1.000, 0.890, 0.812);
    vec3 sky   = vec3(0.812, 0.910, 1.000);
    float seg = t * 5.0;
    int i = int(mod(seg, 5.0));
    float f = fract(seg);
    vec3 a = rose; vec3 b = lav;
    if (i == 0) { a = rose; b = lav; }
    else if (i == 1) { a = lav;  b = mint; }
    else if (i == 2) { a = mint; b = peach; }
    else if (i == 3) { a = peach; b = sky; }
    else { a = sky; b = rose; }
    return mix(a, b, smoothstep(0.0, 1.0, f));
  }
  void main() {
    vec2 uv = vUv;
    vec2 st = uv;
    st.x *= uResolution.x / max(uResolution.y, 1.0);
    float t = uTime * 0.04;
    vec2 p = st + (uPointer - 0.5) * 0.18 * uPointerInfluence;
    float n1 = fbm(p * 1.1 + vec2(t * 1.2, -t * 0.6));
    float n2 = fbm(p * 1.9 - vec2(t * 0.8, t * 1.4) + 3.0);
    float n3 = fbm(p * 0.6 + vec2(-t * 0.3, t * 0.5) + 7.0);
    float field = 0.5 + 0.5 * (n1 * 0.55 + n2 * 0.3 + n3 * 0.25);
    float bands = sin(field * 10.0 + uTime * 0.35 + n2 * 2.3) * 0.5 + 0.5;
    float thin  = sin(field * 16.0 - uTime * 0.2) * 0.5 + 0.5;
    float palIdx = fract(field * 1.3 + bands * 0.25 + thin * 0.15);
    vec3 col = iridescence(palIdx);
    vec3 pearl = vec3(0.985, 0.97, 0.965);
    float lum = smoothstep(0.3, 1.2, field + bands * 0.3);
    col = mix(pearl, col, clamp(lum * uIntensity, 0.0, 0.9));
    float vign = smoothstep(1.2, 0.3, length(uv - 0.5));
    col *= 0.88 + 0.14 * vign;
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.012;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function IridescentPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const { size, gl } = useThree();
  const pointer = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uPointerInfluence: { value: 1 },
      uIntensity: { value: 1 },
    }),
    [],
  );

  useEffect(() => {
    const canvas = gl.domElement;
    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.tx = (e.clientX - rect.left) / rect.width;
      pointer.current.ty = 1 - (e.clientY - rect.top) / rect.height;
    };
    const handleLeave = () => {
      pointer.current.tx = 0.5;
      pointer.current.ty = 0.5;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    canvas.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      canvas.removeEventListener('pointerleave', handleLeave);
    };
  }, [gl]);

  useFrame((state) => {
    if (!ref.current) return;
    pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.05;
    pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.05;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uPointer.value.set(pointer.current.x, pointer.current.y);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface Props {
  isVisible?: boolean;
}

export default function IridescentScene({ isVisible = true }: Props) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: 'low-power',
      }}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      style={{ width: '100%', height: '100%' }}
      frameloop={isVisible ? 'always' : 'never'}
    >
      <IridescentPlane />
    </Canvas>
  );
}
