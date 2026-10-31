import { useEffect, useRef } from "react";

const GlobalParticleSculpture = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let time = 0;
    const pointCount = 9000;

    // Smooth physics states
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const pos = { x: 0, y: 0, scale: 1.15, opacity: 0.0 };

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (gl) {
      const vsSource = `
        attribute vec3 a_coords;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        uniform vec2 u_pos;
        uniform float u_scale;

        varying float v_light;
        varying float v_depth;
        varying float v_spec;

        mat3 rotateY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c); }
        mat3 rotateX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c); }
        mat3 rotateZ(float a) { float c = cos(a), s = sin(a); return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0); }

        void main() {
          float theta = a_coords.x;
          float phi = a_coords.y;
          float jitter = a_coords.z;

          float cosPhi = cos(phi);
          vec3 p0 = vec3(cosPhi * cos(theta), sin(phi), cosPhi * sin(theta));

          float t = u_time * 0.9;

          // Organic harmonic deformation matching reference photo
          float h1 = 0.44 * (p0.x * p0.x - p0.y * p0.y + 0.85 * p0.x * p0.z);
          float h2 = 0.32 * sin(2.2 * p0.x + 1.8 * p0.y + t * 0.75) * cos(2.0 * p0.z - t * 0.55);
          float h3 = -0.38 * exp(-2.2 * (p0.x * p0.x + p0.z * p0.z)) * cos(p0.y * 2.4);
          float h4 = 0.16 * cos(2.8 * p0.y + 2.2 * p0.x + t * 1.1);
          float h5 = 0.035 * sin(14.0 * p0.x) * sin(14.0 * p0.y) * sin(14.0 * p0.z);

          float radius = 1.0 + h1 + h2 + h3 + h4 + h5 + jitter * 0.06;
          vec3 p = p0 * radius;

          vec3 norm = normalize(p0 + vec3(
            0.35 * cos(2.2 * p0.x + t),
            0.35 * sin(2.2 * p0.y + t),
            0.35 * cos(2.2 * p0.z + t)
          ));

          float ry = t * 0.42 + u_mouse.x * 0.85;
          float rx = 0.32 + sin(t * 0.28) * 0.22 - u_mouse.y * 0.75;
          float rz = cos(t * 0.22) * 0.18;

          mat3 rot = rotateY(ry) * rotateX(rx) * rotateZ(rz);
          vec3 rPos = rot * p;
          vec3 rNorm = rot * norm;

          // Pure directional key light
          vec3 lightDir = normalize(vec3(0.65, 0.85, 0.95));
          float diff = max(0.0, dot(rNorm, lightDir));

          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          vec3 halfVec = normalize(lightDir + viewDir);
          float spec = pow(max(0.0, dot(rNorm, halfVec)), 24.0);

          v_light = clamp(0.14 + 0.72 * diff + 0.65 * spec, 0.10, 1.0);
          v_depth = (rPos.z + 1.8) / 3.6;
          v_spec = spec;

          float fov = 3.2;
          float zDist = 4.2 - rPos.z * 0.85;
          vec2 proj = (rPos.xy * fov) / zDist;

          float aspect = u_resolution.x / u_resolution.y;
          if (aspect > 1.0) {
            proj.x /= aspect;
          } else {
            proj.y *= aspect;
          }

          // Dynamic screen position
          proj += u_pos;

          gl_Position = vec4(proj * u_scale, 0.0, 1.0);

          float pSize = (1.5 + v_depth * 3.0 + v_light * 1.4) * (u_resolution.y / 560.0);
          gl_PointSize = clamp(pSize, 1.0, 8.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        uniform float u_opacity;
        varying float v_light;
        varying float v_depth;
        varying float v_spec;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float alphaEdge = smoothstep(0.5, 0.22, dist);
          float brightness = v_light * (0.35 + 0.65 * v_depth);
          
          vec3 col = vec3(brightness);

          float alpha = alphaEdge * clamp(0.18 + brightness * 0.82, 0.14, 0.98) * u_opacity;
          gl_FragColor = vec4(col, alpha);
        }
      `;

      const createShader = (type: number, src: string) => {
        const s = gl.createShader(type);
        if (!s) return null;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) return null;
        return s;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

      gl.useProgram(program);

      const coordsData = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount; i++) {
        const y = 1.0 - (i / (pointCount - 1)) * 2.0;
        const phi = Math.asin(Math.max(-1, Math.min(1, y)));
        const theta = i * 2.399963229728653;
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

      const uTime = gl.getUniformLocation(program, "u_time");
      const uMouse = gl.getUniformLocation(program, "u_mouse");
      const uRes = gl.getUniformLocation(program, "u_resolution");
      const uPos = gl.getUniformLocation(program, "u_pos");
      const uScale = gl.getUniformLocation(program, "u_scale");
      const uOpacity = gl.getUniformLocation(program, "u_opacity");

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const handleResize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.floor(window.innerWidth * dpr);
        const h = Math.floor(window.innerHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      };
      handleResize();

      const handleMouseMove = (e: MouseEvent) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      const render = () => {
        time += 0.016;

        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        const vh = window.innerHeight;
        const heroEl = document.getElementById("hero");
        const aboutEl = document.getElementById("about");
        const journeyEl = document.getElementById("journey");
        const projectsEl = document.getElementById("projects");
        const contactEl = document.getElementById("contact");

        const isViewParam = typeof window !== "undefined" && window.location.search.includes("view=");
        const viewSec = isViewParam ? window.location.search.split("view=")[1]?.split("&")[0] : null;

        let targetX = 0;
        let targetY = 0;
        let targetScale = 1.15;
        let targetOpacity = 1.0;

        if (viewSec === "about") {
          targetX = 0.58; targetY = -0.04; targetScale = 1.0; targetOpacity = 1.0;
        } else if (viewSec === "journey") {
          targetX = -0.58; targetY = 0; targetScale = 1.0; targetOpacity = 1.0;
        } else if (viewSec === "projects") {
          targetOpacity = 0.0;
        } else if (viewSec === "contact") {
          targetX = 0.58; targetY = 0.02; targetScale = 1.02; targetOpacity = 1.0;
        } else if (aboutEl && heroEl) {
          const aboutRect = aboutEl.getBoundingClientRect();
          const journeyRect = journeyEl ? journeyEl.getBoundingClientRect() : null;
          const projectsRect = projectsEl ? projectsEl.getBoundingClientRect() : null;
          const contactRect = contactEl ? contactEl.getBoundingClientRect() : null;

          const isMobile = window.innerWidth < 768;
          const heroScale = isMobile ? 0.72 : 1.15;
          const heroOpacity = isMobile ? 0.55 : 1.0;

          if (contactRect && contactRect.top < vh * 0.75) {
            // In Contact: Fades out cleanly to spotlight the personal trust profile card
            targetX = 0.0;
            targetY = 0.0;
            targetScale = 0.65;
            targetOpacity = 0.0;
          } else if (projectsRect && projectsRect.top < vh * 0.75) {
            // In Featured Projects: Fades out completely as requested!
            targetX = 0.0;
            targetY = 0.0;
            targetScale = 0.65;
            targetOpacity = 0.0;
          } else if (aboutRect.top >= vh * 0.75) {
            // At Hero Section: Centered
            targetX = 0;
            targetY = 0;
            targetScale = heroScale;
            targetOpacity = heroOpacity;
          } else if (aboutRect.top < vh * 0.75 && (!journeyRect || journeyRect.top >= vh * 0.65)) {
            // In About Me: On desktop slides to right (+0.58), on mobile stays subtle and centered
            const t = Math.max(0, Math.min(1, (vh * 0.75 - aboutRect.top) / (vh * 0.75)));
            targetX = isMobile ? 0 : 0.58 * t;
            targetY = -0.04 * t;
            targetScale = isMobile ? 0.65 : (1.15 - 0.15 * t);
            targetOpacity = isMobile ? 0.3 : 1.0;
          } else if (journeyRect && journeyRect.top < vh * 0.65) {
            // In Journey: On desktop slides across to left (-0.58), on mobile stays subtle and centered
            const t = Math.max(0, Math.min(1, (vh * 0.65 - journeyRect.top) / (vh * 0.65)));
            targetX = isMobile ? 0 : (0.58 * (1 - t) + -0.58 * t);
            targetY = 0.0;
            targetScale = isMobile ? 0.65 : 1.0;
            targetOpacity = isMobile ? 0.3 : 1.0;
          }
        }

        // Mouse follow dynamic offset
        targetX += mouse.x * 0.15;
        targetY += -mouse.y * 0.13;

        pos.x += (targetX - pos.x) * 0.065;
        pos.y += (targetY - pos.y) * 0.065;
        pos.scale += (targetScale - pos.scale) * 0.065;
        if ((pos as any).opacity === undefined) (pos as any).opacity = 1.0;
        (pos as any).opacity += (targetOpacity - (pos as any).opacity) * 0.075;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if ((pos as any).opacity > 0.01) {
          gl.uniform1f(uTime, time);
          gl.uniform2f(uMouse, mouse.x, mouse.y);
          gl.uniform2f(uRes, canvas.width, canvas.height);
          gl.uniform2f(uPos, pos.x, pos.y);
          gl.uniform1f(uScale, pos.scale);
          gl.uniform1f(uOpacity, Math.max(0, Math.min(1, (pos as any).opacity)));

          gl.drawArrays(gl.POINTS, 0, pointCount);
        }

        animId = requestAnimationFrame(render);
      };

      render();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        gl.deleteBuffer(vbo);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="global-particle-sculpture-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 4,
      }}
    />
  );
};

export default GlobalParticleSculpture;
