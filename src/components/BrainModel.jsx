import { useRef, useMemo, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { skills } from '../data/portfolio';

/* OrbitControls wrapper — strips cursor overrides */
function NoCursorControls() {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    el.style.cursor = 'none';
    // OrbitControls sets cursor on pointerdown/up/move — override via interval + observer
    const obs = new MutationObserver(() => {
      if (el.style.cursor && el.style.cursor !== 'none') el.style.cursor = 'none';
    });
    obs.observe(el, { attributes: true, attributeFilter: ['style'] });
    // Fallback: force it periodically in case MutationObserver misses inline sets
    const iv = setInterval(() => {
      if (el.style.cursor !== 'none') el.style.cursor = 'none';
    }, 200);
    return () => { obs.disconnect(); clearInterval(iv); };
  }, [gl]);
  return (
    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5}
      minPolarAngle={Math.PI * 0.2} maxPolarAngle={Math.PI * 0.8} />
  );
}

/* ── Region anchors (brain local space) ── */
const ANCHORS = [
  new THREE.Vector3(0, 0.3, 0.6),
  new THREE.Vector3(0, 0.7, 0),
  new THREE.Vector3(0.7, -0.1, 0),
  new THREE.Vector3(-0.7, -0.1, 0),
  new THREE.Vector3(0, 0.1, -0.6),
  new THREE.Vector3(0, -0.5, 0),
];

/* Label positions — just slightly outside the brain surface */
const LABEL_OFFSETS = ANCHORS.map(a => {
  const dir = a.clone().normalize();
  return a.clone().add(dir.multiplyScalar(0.45));
});

function closest(pt) {
  let best = -1, min = Infinity;
  ANCHORS.forEach((a, i) => {
    const d = pt.distanceTo(a);
    if (d < min) { min = d; best = i; }
  });
  return best < skills.length ? best : -1;
}

/* ── Holographic Brain ── */
function HoloBrain({ onHover, active, onLabelPositions }) {
  const group = useRef();
  const meshRef = useRef();
  const firingRef = useRef(null);
  const timeRef = useRef(0);

  const gltf = useLoader(GLTFLoader, '/brain.glb');

  const { geo, wGeo, pGeo } = useMemo(() => {
    let g = null;
    gltf.scene.traverse(c => { if (c.isMesh && !g) g = c.geometry.clone(); });
    if (!g) return {};
    g.computeBoundingBox();
    const cen = new THREE.Vector3(), sz = new THREE.Vector3();
    g.boundingBox.getCenter(cen);
    g.translate(-cen.x, -cen.y, -cen.z);
    g.boundingBox.getSize(sz);
    const s = 2.0 / Math.max(sz.x, sz.y, sz.z);
    g.scale(s, s, s);
    g.computeVertexNormals();
    const w = new THREE.WireframeGeometry(g);
    const pos = g.attributes.position;
    const cnt = Math.min(400, pos.count);
    const pp = new Float32Array(cnt * 3), sizes = new Float32Array(cnt);
    const phases = new Float32Array(cnt), firing = new Float32Array(cnt);
    const step = Math.max(1, Math.floor(pos.count / cnt));
    for (let i = 0; i < cnt; i++) {
      const idx = (i * step) % pos.count;
      pp[i*3] = pos.getX(idx); pp[i*3+1] = pos.getY(idx); pp[i*3+2] = pos.getZ(idx);
      sizes[i] = 0.8 + Math.random() * 0.4;
      phases[i] = Math.random() * Math.PI * 2;
      firing[i] = 0;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    pg.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    pg.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    pg.setAttribute('aFiring', new THREE.BufferAttribute(firing, 1));
    return { geo: g, wGeo: w, pGeo: pg };
  }, [gltf]);

  const accent = useMemo(() => new THREE.Color('#00ff88'), []);

  const holoMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vWorldPos; varying vec3 vNormal; varying vec3 vLocalPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vLocalPos = position;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; uniform float uPulse;
      uniform vec3 uHlCenter; uniform float uHlRadius; uniform float uHlStrength;
      varying vec3 vWorldPos; varying vec3 vNormal; varying vec3 vLocalPos;

      // Hex grid pattern
      float hexGrid(vec2 p, float scale) {
        p *= scale;
        vec2 h = vec2(1.0, 1.732);
        vec2 a = mod(p, h) - h * 0.5;
        vec2 b = mod(p - h * 0.5, h) - h * 0.5;
        vec2 g = length(a) < length(b) ? a : b;
        float d = max(abs(g.x), abs(g.y * 0.577 + abs(g.x) * 0.5));
        return smoothstep(0.42, 0.46, d);
      }

      // Data flow lines
      float dataFlow(vec3 p, float t) {
        float line1 = smoothstep(0.03, 0.0, abs(fract(p.y * 8.0 + t * 0.3) - 0.5) - 0.47);
        float line2 = smoothstep(0.03, 0.0, abs(fract(p.x * 6.0 - t * 0.2) - 0.5) - 0.47);
        float flow1 = smoothstep(0.4, 0.6, sin(p.y * 40.0 + t * 4.0)) * line1;
        float flow2 = smoothstep(0.4, 0.6, sin(p.x * 35.0 - t * 3.0)) * line2;
        return (flow1 + flow2) * 0.15;
      }

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        vec3 N = normalize(vNormal);
        float fresnel = pow(1.0 - max(dot(N, viewDir), 0.0), 2.2);

        // Sci-fi gradient: green -> cyan -> blue shifting across brain
        float gradT = vLocalPos.y * 0.5 + 0.5 + sin(uTime * 0.3) * 0.1;
        vec3 colGreen = vec3(0.0, 1.0, 0.53);   // #00ff88
        vec3 colCyan  = vec3(0.0, 0.83, 1.0);    // #00d4ff
        vec3 colBlue  = vec3(0.2, 0.4, 1.0);
        vec3 gradCol = mix(colBlue, colCyan, smoothstep(0.0, 0.5, gradT));
        gradCol = mix(gradCol, colGreen, smoothstep(0.4, 1.0, gradT));

        // Hex grid overlay
        vec2 hexUV = vec2(
          atan(vLocalPos.x, vLocalPos.z) / 3.14159,
          vLocalPos.y
        );
        float hex = hexGrid(hexUV, 8.0) * 0.06;

        // Data flow lines
        float flow = dataFlow(vLocalPos, uTime);

        // Scanline
        float scan = (0.5 + 0.5 * sin(vWorldPos.y * 30.0 + uTime * 0.8)) * 0.08;

        // Neural pulse ripple
        float pulse = sin(uTime * 2.5 + length(vLocalPos) * 8.0) * 0.5 + 0.5;
        float glow = uPulse * pulse * 0.08;

        // Region highlight
        float hDist = length(vWorldPos - uHlCenter);
        float hMask = exp(-pow(hDist / max(uHlRadius, 0.001), 2.0));
        hMask = clamp(hMask * uHlStrength, 0.0, 1.0);

        // Compose
        float alpha = clamp(0.025 + fresnel * 0.12 + hex + flow + scan * fresnel + glow, 0.0, 0.30);
        vec3 col = gradCol * (0.22 + mix(scan, 1.0, fresnel) * 0.20 + glow + flow * 0.5);
        col += vec3(hex * 0.3) * gradCol;
        col = mix(col, vec3(0.8, 1.0, 0.9), hMask * 0.5);
        alpha = max(alpha, hMask * 0.55);

        gl_FragColor = vec4(col, alpha);
      }`,
    uniforms: {
      uTime: { value: 0 }, uColor: { value: accent }, uPulse: { value: 0.3 },
      uHlCenter: { value: new THREE.Vector3() }, uHlRadius: { value: 0.6 }, uHlStrength: { value: 0 },
    },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  }), [accent]);

  const wireMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      uniform float uTime; varying vec3 vWorldPos; varying float vNeural; varying vec3 vLocalPos;
      void main() {
        vLocalPos = position;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vNeural = sin(uTime * 3.0 + position.y * 5.0) * 0.5 + 0.5;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor; uniform float uPulse;
      uniform vec3 uHlCenter; uniform float uHlRadius; uniform float uHlStrength;
      varying vec3 vWorldPos; varying float vNeural; varying vec3 vLocalPos;
      void main() {
        // Matching gradient
        float gradT = vLocalPos.y * 0.5 + 0.5 + sin(uTime * 0.3) * 0.1;
        vec3 colGreen = vec3(0.0, 1.0, 0.53);
        vec3 colCyan  = vec3(0.0, 0.83, 1.0);
        vec3 colBlue  = vec3(0.2, 0.4, 1.0);
        vec3 gradCol = mix(colBlue, colCyan, smoothstep(0.0, 0.5, gradT));
        gradCol = mix(gradCol, colGreen, smoothstep(0.4, 1.0, gradT));

        float wave = 0.5 + 0.5 * sin(uTime * 0.7 + vWorldPos.y);
        float imp = vNeural * uPulse * 0.4;
        float hDist = length(vWorldPos - uHlCenter);
        float hMask = exp(-pow(hDist / max(uHlRadius, 0.001), 2.0));
        hMask = clamp(hMask * uHlStrength, 0.0, 1.0);
        vec3 col = gradCol * (0.20 + 0.20 * wave + imp);
        col = mix(col, vec3(0.8, 1.0, 0.9), hMask * 0.5);
        float alpha = clamp(0.06 * (0.5 + 0.6 * wave) + imp * 0.3, 0.0, 0.4);
        alpha = max(alpha, hMask * 0.5);
        gl_FragColor = vec4(col, alpha);
      }`,
    uniforms: {
      uTime: { value: 0 }, uColor: { value: accent.clone() }, uPulse: { value: 0.3 },
      uHlCenter: { value: new THREE.Vector3() }, uHlRadius: { value: 0.6 }, uHlStrength: { value: 0 },
    },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }), [accent]);

  const ptMat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      attribute float aSize; attribute float aPhase; attribute float aFiring;
      uniform float uTime; varying float vAlpha; varying float vHeight;
      void main() {
        float pulse = 1.0 + sin(uTime * 2.5 + aPhase) * 0.2;
        float fire = 1.0 + aFiring * 1.5;
        vAlpha = 0.2 + aFiring * 0.5;
        vHeight = position.y * 0.5 + 0.5;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * 0.008 * pulse * fire * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uTime;
      varying float vAlpha; varying float vHeight;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float g = exp(-d * 8.0);
        // Gradient-matched particle color
        float gradT = vHeight + sin(uTime * 0.3) * 0.1;
        vec3 colGreen = vec3(0.0, 1.0, 0.53);
        vec3 colCyan  = vec3(0.0, 0.83, 1.0);
        vec3 colBlue  = vec3(0.2, 0.4, 1.0);
        vec3 gradCol = mix(colBlue, colCyan, smoothstep(0.0, 0.5, gradT));
        gradCol = mix(gradCol, colGreen, smoothstep(0.4, 1.0, gradT));
        gl_FragColor = vec4(gradCol * g * 0.7, g * 0.5 * vAlpha);
      }`,
    uniforms: { uTime: { value: 0 }, uColor: { value: accent.clone() } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }), [accent]);

  useEffect(() => {
    if (pGeo) firingRef.current = new Float32Array(pGeo.attributes.aSize.count);
  }, [pGeo]);

  const { raycaster, pointer, camera, size } = useThree();
  const lastR = useRef(null);
  const frameCount = useRef(0);
  const tmpV = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    frameCount.current++;

    if (group.current) group.current.rotation.y += 0.0012;

    holoMat.uniforms.uTime.value = t;
    wireMat.uniforms.uTime.value = t;
    ptMat.uniforms.uTime.value = t;

    const hlIdx = active !== null && active < ANCHORS.length ? active : -1;
    [holoMat, wireMat].forEach(mat => {
      if (hlIdx >= 0) {
        mat.uniforms.uHlCenter.value.copy(ANCHORS[hlIdx]);
        mat.uniforms.uHlStrength.value = 1.0;
      } else {
        mat.uniforms.uHlStrength.value = 0;
      }
    });

    if (frameCount.current % 3 === 0 && firingRef.current && pGeo) {
      const f = firingRef.current;
      for (let i = 0; i < f.length; i++) {
        if (f[i] <= 0 && Math.random() < 0.04) f[i] = 1;
        if (f[i] > 0) { f[i] -= 0.07; if (f[i] < 0) f[i] = 0; }
      }
      pGeo.attributes.aFiring.array.set(f);
      pGeo.attributes.aFiring.needsUpdate = true;
    }

    if (frameCount.current % 4 === 0 && meshRef.current) {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(meshRef.current);
      let r = null;
      if (hits.length) {
        const local = group.current.worldToLocal(hits[0].point.clone());
        r = closest(local);
      }
      if (r !== lastR.current) { lastR.current = r; onHover(r >= 0 ? r : null); }
    }

    // Project label positions to screen every 2nd frame
    if (frameCount.current % 2 === 0 && group.current) {
      const projected = [];
      for (let i = 0; i < LABEL_OFFSETS.length && i < skills.length; i++) {
        tmpV.copy(LABEL_OFFSETS[i]);
        group.current.localToWorld(tmpV);
        tmpV.project(camera);
        projected.push({
          x: (tmpV.x * 0.5 + 0.5) * size.width,
          y: (-tmpV.y * 0.5 + 0.5) * size.height,
          z: tmpV.z, // depth for fade
        });
      }
      onLabelPositions(projected);
    }
  });

  if (!geo) return null;

  return (
    <group ref={group} rotation={[0.15, 0, 0]}>
      <mesh ref={meshRef} geometry={geo} material={holoMat} />
      <lineSegments geometry={wGeo} material={wireMat} />
      {pGeo && <points geometry={pGeo} material={ptMat} />}
    </group>
  );
}

/* ── Skill label (pure HTML overlay) — always expanded, colored per-category ── */
const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

function SkillLabel({ skill, screenPos, isActive }) {
  if (!screenPos) return null;
  const behindFade = screenPos.z > 0.998 ? 0.25 : screenPos.z > 0.995 ? 0.5 : 1;
  const c = skill.color;

  return (
    <div style={{
      position: 'absolute',
      left: screenPos.x,
      top: screenPos.y,
      transform: 'translate(-50%, -50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 4 : 8,
      padding: isMobile ? '6px 10px' : '10px 16px',
      borderRadius: 14,
      background: isActive ? `${c}30` : `${c}1A`,
      border: `1px solid ${isActive ? c + '70' : c + '35'}`,
      backdropFilter: 'blur(10px)',
      opacity: (isActive ? 1 : 0.9) * behindFade,
      transition: 'opacity 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      boxShadow: isActive ? `0 0 24px ${c}25` : 'none',
      pointerEvents: 'none', zIndex: 10,
    }}>
      <div style={{
        fontSize: isMobile ? 10 : 13, fontWeight: 700, letterSpacing: isMobile ? 1.5 : 2.5, textTransform: 'uppercase',
        color: c,
        fontFamily: "'JetBrains Mono', monospace",
        textShadow: isActive ? `0 0 10px ${c}60` : 'none',
      }}>{skill.category}</div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: isMobile ? 3 : 5, justifyContent: 'center',
        maxWidth: isMobile ? 160 : 240,
      }}>
        {skill.items.map(item => (
          <span key={item} style={{
            padding: isMobile ? '2px 8px' : '4px 12px', borderRadius: 50,
            fontSize: isMobile ? 9 : 12, fontWeight: 500,
            color: '#eee',
            background: `${c}20`,
            border: `1px solid ${c}35`,
            whiteSpace: 'nowrap',
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function BrainModel() {
  const [active, setActive] = useState(null);
  const [labelPositions, setLabelPositions] = useState([]);

  const handleLabelPositions = useCallback((positions) => {
    setLabelPositions(positions);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}>
      <Canvas
        camera={{ position: [0, 0.2, 2.6], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), 0);
          gl.setClearAlpha(0);
        }}
      >
        <Suspense fallback={null}>
          <HoloBrain onHover={setActive} active={active} onLabelPositions={handleLabelPositions} />
        </Suspense>
        <NoCursorControls />
      </Canvas>

      {/* Labels rendered as HTML overlay — never clipped */}
      {skills.map((skill, i) => (
        <SkillLabel
          key={skill.category}
          skill={skill}
          screenPos={labelPositions[i]}
          isActive={active === i}
        />
      ))}

      {active === null && (
        <div style={{
          position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
          fontSize: 10, fontWeight: 600, letterSpacing: 2, color: 'rgba(0,255,136,0.2)',
          fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase',
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          {typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
            ? 'drag to rotate \u00b7 hover to explore'
            : 'pinch to zoom \u00b7 swipe to rotate'}
        </div>
      )}
    </div>
  );
}
