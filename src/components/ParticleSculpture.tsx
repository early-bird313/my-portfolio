import { useEffect, useRef } from "react";

interface ParticleSculptureProps {
  variant?: "hero" | "about" | "journey";
  className?: string;
  interactive?: boolean;
}

const ParticleSculpture = ({
  variant = "about",
  className = "",
  interactive = true,
}: ParticleSculptureProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = true;
    let animId: number;
    let time = Math.random() * 50;

    // Mouse coordinates (normalized -1 to 1)
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    // Configuration by variant
    const isHero = variant === "hero";
    const isJourney = variant === "journey";
    const variantId = isHero ? 0.0 : isJourney ? 2.0 : 1.0;
    const pointCount = isHero ? 7500 : 7000;
    const baseScale = isHero ? 1.05 : 1.0;
    const morphSpeed = isHero ? 0.8 : isJourney ? 1.05 : 0.95;

    // Try initializing WebGL
    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    // ─────────────────────────────────────────────────────────────
    // WEBGL IMPLEMENTATION
    // ─────────────────────────────────────────────────────────────
    if (gl) {
      const vsSource = `
        attribute vec3 a_coords; // x = theta, y = phi, z = jitter
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        uniform float u_scale;
        uniform float u_morph_speed;
        uniform float u_variant;

        varying float v_light;
        varying float v_depth;
        varying float v_accent;

        mat3 rotateY(float angle) {
          float c = cos(angle);
          float s = sin(angle);
          return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
        }

        mat3 rotateX(float angle) {
          float c = cos(angle);
          float s = sin(angle);
          return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
        }

        mat3 rotateZ(float angle) {
          float c = cos(angle);
          float s = sin(angle);
          return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
        }

        void main() {
          float theta = a_coords.x;
          float phi = a_coords.y;
          float jitter = a_coords.z;

          float cosPhi = cos(phi);
          vec3 p0 = vec3(cosPhi * cos(theta), sin(phi), cosPhi * sin(theta));

          float t = u_time * u_morph_speed;

          // Organic 3D sculptural harmonic deformation
          float h1 = 0.44 * (p0.x * p0.x - p0.y * p0.y + 0.85 * p0.x * p0.z);
          float h2 = 0.32 * sin(2.2 * p0.x + 1.8 * p0.y + t * 0.75) * cos(2.0 * p0.z - t * 0.55);
          float h3 = -0.38 * exp(-2.2 * (p0.x * p0.x + p0.z * p0.z)) * cos(p0.y * 2.4);
          float h4 = 0.16 * cos(2.8 * p0.y + 2.2 * p0.x + t * 1.1);
          float h5 = 0.035 * sin(14.0 * p0.x) * sin(14.0 * p0.y) * sin(14.0 * p0.z);

          float radius = 1.0 + h1 + h2 + h3 + h4 + h5 + jitter * 0.06;
          vec3 pos = p0 * radius;

          vec3 norm = normalize(p0 + vec3(
            0.35 * cos(2.2 * p0.x + t),
            0.35 * sin(2.2 * p0.y + t),
            0.35 * cos(2.2 * p0.z + t)
          ));

          float ry = t * 0.42 + u_mouse.x * 0.65;
          float rx = 0.32 + sin(t * 0.28) * 0.22 - u_mouse.y * 0.55;
          float rz = cos(t * 0.22) * 0.18;

          mat3 rot = rotateY(ry) * rotateX(rx) * rotateZ(rz);
          vec3 rPos = rot * pos;
          vec3 rNorm = rot * norm;

          // Directional key light from top-right-front
          vec3 lightDir = normalize(vec3(0.65, 0.85, 0.95));
          float diff = max(0.0, dot(rNorm, lightDir));

          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          vec3 halfVec = normalize(lightDir + viewDir);
          float spec = pow(max(0.0, dot(rNorm, halfVec)), 22.0);

          v_light = clamp(0.12 + 0.68 * diff + 0.55 * spec, 0.08, 1.0);
          v_depth = (rPos.z + 1.8) / 3.6;
          v_accent = spec;

          // Perspective projection
          float fov = 3.25;
          float zDist = 4.2 - rPos.z * 0.85;
          vec2 proj = (rPos.xy * fov) / zDist;

          float aspect = u_resolution.x / u_resolution.y;
          if (aspect > 1.0) {
            proj.x /= aspect;
          } else {
            proj.y *= aspect;
          }

          gl_Position = vec4(proj * u_scale, 0.0, 1.0);

          float pSize = (1.4 + v_depth * 2.8 + v_light * 1.3) * (u_resolution.y / 560.0);
          gl_PointSize = clamp(pSize, 1.0, 7.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        varying float v_light;
        varying float v_depth;
        varying float v_accent;
        uniform float u_variant;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float alphaEdge = smoothstep(0.5, 0.22, dist);
          float brightness = v_light * (0.4 + 0.6 * v_depth);
          vec3 col = vec3(brightness);

          // Subtle electric lime specular glint on highlights
          if (v_accent > 0.35) {
            vec3 lime = vec3(0.8, 1.0, 0.0);
            col = mix(col, lime, (v_accent - 0.35) * 0.7);
          }

          float alpha = alphaEdge * clamp(0.15 + brightness * 0.85, 0.12, 0.95);
          gl_FragColor = vec4(col, alpha);
        }
      `;

      const createShader = (type: number, src: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("Shader error:", gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return;
      }

      gl.useProgram(program);

      // Generate Fibonacci sphere coordinates (theta, phi, jitter)
      const coordsData = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount; i++) {
        // Uniform golden spiral distribution on sphere
        const y = 1.0 - (i / (pointCount - 1)) * 2.0; // -1 to 1
        const phi = Math.asin(Math.max(-1, Math.min(1, y)));
        const theta = i * 2.399963229728653; // golden angle
        const jitter = (Math.random() - 0.5) * 1.5;

        coordsData[i * 3 + 0] = theta;
        coordsData[i * 3 + 1] = phi;
        coordsData[i * 3 + 2] = jitter;
      }

      const vbo = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, coordsData, gl.STATIC_DRAW);

      const aCoords = gl.getAttribLocation(program, "a_coords");
      gl.enableVertexAttribArray(aCoords);
      gl.vertexAttribPointer(aCoords, 3, gl.FLOAT, false, 0, 0);

      // Uniform locations
      const uTime = gl.getUniformLocation(program, "u_time");
      const uMouse = gl.getUniformLocation(program, "u_mouse");
      const uRes = gl.getUniformLocation(program, "u_resolution");
      const uScale = gl.getUniformLocation(program, "u_scale");
      const uMorphSpeed = gl.getUniformLocation(program, "u_morph_speed");
      const uVariant = gl.getUniformLocation(program, "u_variant");

      gl.uniform1f(uScale, baseScale);
      gl.uniform1f(uMorphSpeed, morphSpeed);
      gl.uniform1f(uVariant, variantId);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(10, Math.floor(rect.width * dpr));
        const h = Math.max(10, Math.floor(rect.height * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      };
      resize();

      const render = () => {
        if (!isVisible) {
          animId = requestAnimationFrame(render);
          return;
        }

        time += 0.016;

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(uTime, time);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform2f(uRes, canvas.width, canvas.height);

        gl.drawArrays(gl.POINTS, 0, pointCount);

        animId = requestAnimationFrame(render);
      };

      render();

      const handleMouseMove = (e: MouseEvent) => {
        if (!interactive) return;
        const rect = canvas.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouse.targetX = ((e.clientX - cx) / (rect.width / 2)) * 0.8;
        mouse.targetY = ((e.clientY - cy) / (rect.height / 2)) * 0.8;
      };

      const handleMouseLeave = () => {
        mouse.targetX = 0;
        mouse.targetY = 0;
      };

      window.addEventListener("resize", resize);
      if (interactive) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);
      }

      // Visibility observer
      const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      });
      observer.observe(canvas);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        if (interactive) {
          window.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseleave", handleMouseLeave);
        }
        observer.disconnect();
        gl.deleteBuffer(vbo);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    } else {
      // ─────────────────────────────────────────────────────────────
      // CANVAS 2D FALLBACK (If WebGL is unavailable)
      // ─────────────────────────────────────────────────────────────
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const fallbackPoints: { theta: number; phi: number }[] = [];
      const count = 1200;
      for (let i = 0; i < count; i++) {
        const y = 1.0 - (i / (count - 1)) * 2.0;
        const phi = Math.asin(y);
        const theta = i * 2.399963;
        fallbackPoints.push({ theta, phi });
      }

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      resize();

      const render2D = () => {
        if (!isVisible) {
          animId = requestAnimationFrame(render2D);
          return;
        }

        time += 0.016;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const scale = Math.min(cx, cy) * 0.75 * baseScale;

        const ry = time * 0.42;
        const rx = 0.35 + Math.sin(time * 0.3) * 0.2;

        for (let i = 0; i < count; i++) {
          const pt = fallbackPoints[i];
          const cosP = Math.cos(pt.phi);
          let x = cosP * Math.cos(pt.theta);
          let y = Math.sin(pt.phi);
          let z = cosP * Math.sin(pt.theta);

          const r = 1 + 0.35 * (x * x - y * y) + 0.25 * Math.sin(2 * x + time);
          x *= r;
          y *= r;
          z *= r;

          // Rotate
          const x1 = x * Math.cos(ry) + z * Math.sin(ry);
          const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
          const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
          const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

          const pz = (z2 + 2) / 4;
          const alpha = Math.max(0.1, Math.min(0.9, pz * 0.8 + 0.1));
          const size = Math.max(1, pz * 2.8);

          ctx.beginPath();
          ctx.arc(cx + x1 * scale, cy + y2 * scale, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }

        animId = requestAnimationFrame(render2D);
      };

      render2D();
      window.addEventListener("resize", resize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
      };
    }
  }, [variant, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-sculpture-canvas ${className}`}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParticleSculpture;
