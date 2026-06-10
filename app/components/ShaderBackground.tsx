"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

// tapered leaf blade lying along +x
float blade(vec2 p, float len, float w) {
  float t = clamp(p.x / len, 0.0, 1.0);
  float halfw = w * (1.0 - t * t) * (0.3 + 0.7 * smoothstep(0.0, 0.12, t));
  float d = abs(p.y) - halfw;
  return max(d, max(-p.x, p.x - len));
}

// one palm frond: drooping stem with alternating leaflets
float frond(vec2 p, float flutter) {
  p.y -= 0.20 * p.x * p.x;
  float d = blade(p, 0.95, 0.006);
  for (int i = 0; i < 13; i++) {
    float fi = float(i);
    float x0 = 0.07 + fi * 0.066;
    vec2 q = vec2(p.x - x0, p.y);
    float side = mod(fi, 2.0) < 1.0 ? 1.0 : -1.0;
    float ang = side * (1.18 - 0.6 * x0) + 0.1 * flutter * sin(fi * 1.93);
    q = rot(ang) * q;
    float llen = 0.30 * (1.0 - 0.42 * x0) + 0.06;
    d = min(d, blade(q, llen, 0.013 + 0.004 * sin(fi * 2.7)));
  }
  return d;
}

// a cluster of fronds fanning out from the origin
float palm(vec2 p, float t, float seed, float orient, float spread, int n) {
  float d = 1e3;
  for (int i = 0; i < 5; i++) {
    if (i >= n) break;
    float fi = float(i);
    float baseAng = orient + (fi - float(n - 1) * 0.5) * spread
      + 0.22 * (hash(vec2(seed, fi)) - 0.5);
    float sway = 0.045 * sin(t * 0.55 + fi * 1.7 + seed * 7.0)
      + 0.018 * sin(t * 1.3 + fi * 3.1);
    vec2 q = rot(-(baseAng + sway)) * p;
    d = min(d, frond(q, sin(t * 0.8 + fi * 2.1 + seed * 3.0)));
  }
  return d;
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res.y; // x in [0, aspect], y in [0,1]
  float t = u_time;

  // slow wind drift over everything
  float gust = 0.5 + 0.5 * sin(t * 0.18);
  vec2 wind = vec2(0.012 * sin(t * 0.4), 0.006 * sin(t * 0.27 + 2.0)) * (0.4 + gust);

  // warm cream wall with sunlight from the upper right
  vec3 wallA = vec3(0.932, 0.905, 0.852);
  vec3 wallB = vec3(0.972, 0.945, 0.898);
  vec3 col = mix(wallA, wallB, smoothstep(0.0, 1.0, 0.35 * uv.x / max(aspect, 0.001) + 0.65 * uv.y));

  float sun = exp(-1.4 * length(uv - vec2(aspect * 0.88, 1.02)));
  col += vec3(0.075, 0.048, 0.012) * sun * (0.85 + 0.15 * sin(t * 0.7) * sin(t * 0.31));

  vec2 par = u_mouse * vec2(0.018, 0.012);

  // far layer: large, very soft, out of focus
  {
    vec2 p = (uv - vec2(aspect * 1.02, 1.18) - wind * 0.6 - par * 0.5) / 1.85;
    float d = palm(p, t * 0.6, 11.0, 3.85, 0.40, 4) * 1.85;
    float s = 1.0 - smoothstep(0.0, 0.16, d);
    col = mix(col, col * vec3(0.80, 0.79, 0.77), s * 0.34);
  }

  // mid layer: the main palm from the top right
  {
    vec2 p = (uv - vec2(aspect * 0.94, 1.10) - wind - par) / 1.12;
    float d = palm(p, t, 23.0, 3.72, 0.46, 5) * 1.12;
    float pen = 0.018 + 0.10 * length(p) * 0.55; // penumbra widens away from anchor
    float s = 1.0 - smoothstep(0.0, pen, d);
    col = mix(col, col * vec3(0.74, 0.72, 0.69), s * 0.52);
  }

  // near layer: crisp fronds reaching in from off-screen lower left
  {
    vec2 p = (uv - vec2(-0.46, -0.06) - wind * 1.5 - par * 1.6) / 1.05;
    float d = palm(p, t * 1.15, 37.0, 0.30, 0.55, 3) * 1.05;
    float pen = 0.012 + 0.07 * length(p) * 0.5;
    float s = 1.0 - smoothstep(0.0, pen, d);
    col = mix(col, col * vec3(0.70, 0.685, 0.66), s * 0.42);
  }

  // film grain
  float g = hash(gl_FragCoord.xy + fract(t) * 17.0);
  col += (g - 0.5) * 0.022;

  // gentle vignette
  vec2 vc = uv - vec2(aspect * 0.5, 0.5);
  col *= 1.0 - 0.14 * dot(vc, vc);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      (canvas.getContext("experimental-webgl", {
        antialias: false,
        alpha: false,
      }) as WebGLRenderingContext | null);
    if (!gl) return; // CSS gradient fallback stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 12.0 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("pointermove", onMouse);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMouse);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="shader-bg" aria-hidden="true" />;
}
