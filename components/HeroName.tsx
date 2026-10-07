"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const LINES = ["ABHIRAM", "KALATHUR"] as const;
const COLS = 96;
const ROWS = 40;
const COUNT = (COLS + 1) * (ROWS + 1);

const COLORS = [
  [0.905882, 0.658824, 0.243137],
  [0.54902, 0.682353, 0.588235],
] as const;

const VERT = `#version 300 es
in vec2 aPos;
in vec2 aUv;
in vec2 aDisp;
out vec2 vUv;
out float vMag;
void main() {
  gl_Position = vec4(aPos + aDisp, 0.0, 1.0);
  vUv = aUv;
  vMag = length(aDisp);
}
`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
in float vMag;
out vec4 outColor;
uniform sampler2D uTex;
uniform float uChroma;
uniform vec3 uColorA;
uniform vec3 uColorB;
void main() {
  vec4 base = texture(uTex, vUv);
  if (uChroma > 0.0) {
    float shift = uChroma * 0.005 * clamp(vMag * 8.0, 0.0, 1.0);
    float aOff = texture(uTex, vUv + vec2(shift, 0.0)).a;
    float bOff = texture(uTex, vUv - vec2(shift, 0.0)).a;
    vec3 col = base.rgb * base.a;
    col += uColorA * max(0.0, aOff - base.a);
    col += uColorB * max(0.0, bOff - base.a);
    outColor = vec4(col, max(base.a, max(aOff, bOff)));
  } else {
    outColor = base;
  }
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroName() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap || prefersReducedMotion()) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERT);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positions = new Float32Array(COUNT * 2);
    const uvs = new Float32Array(COUNT * 2);
    const displacement = new Float32Array(COUNT * 2);
    const velocity = new Float32Array(COUNT * 2);
    for (let row = 0; row <= ROWS; row += 1) {
      for (let col = 0; col <= COLS; col += 1) {
        const index = (row * (COLS + 1) + col) * 2;
        const u = col / COLS;
        const v = row / ROWS;
        positions[index] = u * 2 - 1;
        positions[index + 1] = 1 - v * 2;
        uvs[index] = u;
        uvs[index + 1] = v;
      }
    }

    const indices = new Uint32Array(COLS * ROWS * 6);
    let cursor = 0;
    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const start = row * (COLS + 1) + col;
        indices[cursor++] = start;
        indices[cursor++] = start + COLS + 1;
        indices[cursor++] = start + 1;
        indices[cursor++] = start + 1;
        indices[cursor++] = start + COLS + 1;
        indices[cursor++] = start + COLS + 2;
      }
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(program, "aUv");
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const displacementBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, displacementBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, displacement, gl.DYNAMIC_DRAW);
    const displacementLoc = gl.getAttribLocation(program, "aDisp");
    gl.enableVertexAttribArray(displacementLoc);
    gl.vertexAttribPointer(displacementLoc, 2, gl.FLOAT, false, 0, 0);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const chromaLoc = gl.getUniformLocation(program, "uChroma");
    const colorALoc = gl.getUniformLocation(program, "uColorA");
    const colorBLoc = gl.getUniformLocation(program, "uColorB");

    const offscreen = document.createElement("canvas");
    const context = offscreen.getContext("2d");
    if (!context || !vao) return;

    const pointer = { x: 99, y: 99, px: 99, py: 99, vx: 0, vy: 0, inside: false };
    let frame = 0;
    let stopped = false;

    const bindTexture = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    };

    const paintTexture = () => {
      const sample = wrap.querySelector("h1");
      if (!sample) return;
      const style = getComputedStyle(sample);
      const fontSize = parseFloat(style.fontSize);
      const ratio = window.devicePixelRatio || 1;
      const width = Math.max(2, Math.round(wrap.clientWidth * ratio));
      const height = Math.max(2, Math.round(wrap.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      offscreen.width = width;
      offscreen.height = height;
      context.clearRect(0, 0, width, height);
      const size = fontSize * ratio;
      context.fillStyle = "#ffffff";
      context.font = `900 ${size}px ${style.fontFamily}`;
      context.textBaseline = "alphabetic";
      const probe = context.measureText("M");
      const ascent = probe.fontBoundingBoxAscent || size * 0.8;
      const descent = probe.fontBoundingBoxDescent || size * 0.2;
      const lineHeight = size * 0.9;
      const halfLeading = (lineHeight - (ascent + descent)) / 2;
      const tracking = size * -0.055;
      LINES.forEach((line, index) => {
        let pen = 0;
        const baseline = halfLeading + ascent + index * lineHeight;
        for (const character of line) {
          context.fillText(character, pen, baseline);
          pen += context.measureText(character).width + tracking;
        }
      });
      bindTexture();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      if (stopped) return;
      pointer.vx = pointer.x - pointer.px;
      pointer.vy = pointer.y - pointer.py;
      if (Math.hypot(pointer.vx, pointer.vy) > 0.3) {
        pointer.vx = 0;
        pointer.vy = 0;
      }
      pointer.px = pointer.x;
      pointer.py = pointer.y;

      for (let index = 0; index < COUNT; index += 1) {
        const offset = index * 2;
        const originX = positions[offset];
        const originY = positions[offset + 1];
        const dispX = displacement[offset];
        const dispY = displacement[offset + 1];
        const reach = Math.max(
          0,
          1 / (1 + Math.hypot(pointer.x - (originX + dispX), pointer.y - (originY + dispY)) / 0.05) - 0.1,
        );
        let nextX = velocity[offset];
        let nextY = velocity[offset + 1];
        nextX += pointer.vx * 1.8 * reach;
        nextY += pointer.vy * 1.8 * reach;
        nextX -= dispX * 0.08;
        nextY -= dispY * 0.08;
        nextX *= 0.9;
        nextY *= 0.9;
        velocity[offset] = nextX;
        velocity[offset + 1] = nextY;
        let movedX = dispX + nextX * 0.1;
        let movedY = dispY + nextY * 0.1;
        movedX = Math.min(1, Math.max(-1, movedX));
        movedY = Math.min(1, Math.max(-1, movedY));
        displacement[offset] = movedX;
        displacement[offset + 1] = movedY;
      }

      const colorIndex = Math.floor(performance.now() / 400) % COLORS.length;
      const colorA = COLORS[colorIndex];
      const colorB = COLORS[(colorIndex + 1) % COLORS.length];

      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, displacementBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, displacement);
      gl.vertexAttribPointer(displacementLoc, 2, gl.FLOAT, false, 0, 0);
      bindTexture();
      gl.uniform1i(gl.getUniformLocation(program, "uTex"), 0);
      gl.uniform1f(chromaLoc, 1);
      gl.uniform3f(colorALoc, colorA[0], colorA[1], colorA[2]);
      gl.uniform3f(colorBLoc, colorB[0], colorB[1], colorB[2]);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);
      frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = 1 - ((event.clientY - bounds.top) / bounds.height) * 2;
      if (!pointer.inside) {
        pointer.px = x;
        pointer.py = y;
        pointer.inside = true;
      }
      pointer.x = x;
      pointer.y = y;
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.x = 99;
      pointer.y = 99;
      pointer.vx = 0;
      pointer.vy = 0;
    };

    wrap.setAttribute("data-name-ready", "true");
    paintTexture();
    frame = requestAnimationFrame(draw);
    const resize = new ResizeObserver(paintTexture);
    resize.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    const fonts = document.fonts?.ready.then(() => {
      if (!stopped) paintTexture();
    });
    void fonts;

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      wrap.removeAttribute("data-name-ready");
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(uvBuffer);
      gl.deleteBuffer(displacementBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteTexture(texture);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
