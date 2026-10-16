import React, { useEffect, useRef } from "react";
import "./styles/CharacterModel.css";

const CharacterModel = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    let headBone: any = null;
    let characterModel: any = null;
    let animId: number;

    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to +1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic ESM import of Three.js and GLTFLoader
    let isCancelled = false;

    Promise.all([
      import(/* @vite-ignore */ "https://esm.sh/three@0.168.0"),
      import(/* @vite-ignore */ "https://esm.sh/three@0.168.0/examples/jsm/loaders/GLTFLoader.js"),
    ])
      .then(([THREE, { GLTFLoader }]) => {
        if (isCancelled || !mountRef.current) return;

        const width = mountRef.current.clientWidth || 550;
        const height = mountRef.current.clientHeight || 650;

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 1000);
        camera.position.set(0, 13.0, 24.5);
        camera.lookAt(0, 11.5, 0);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        mountRef.current.appendChild(renderer.domElement);

        // Studio Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        keyLight.position.set(5, 12, 10);
        scene.add(keyLight);

        // Neon Rim Light (Green/Lime + Purple backlights)
        const limeRim = new THREE.PointLight(0xccff00, 3.5, 50);
        limeRim.position.set(-6, 12, -5);
        scene.add(limeRim);

        const purpleRim = new THREE.PointLight(0xa87cff, 4.0, 50);
        purpleRim.position.set(6, 12, -5);
        scene.add(purpleRim);

        const loader = new GLTFLoader();
        loader.load(
          "/models/character.glb",
          (gltf: any) => {
            if (isCancelled) return;
            characterModel = gltf.scene;

            // Character scale & initial position
            characterModel.position.set(0, 7.8, 0);
            characterModel.scale.set(1.15, 1.15, 1.15);

            headBone =
              characterModel.getObjectByName("spine006") ||
              characterModel.getObjectByName("head") ||
              characterModel;

            scene.add(characterModel);
          },
          undefined,
          (err: any) => {
            console.warn("3D Character GLB fallback triggered:", err);
          }
        );

        // Animation Loop
        const animate = () => {
          animId = requestAnimationFrame(animate);

          // Smooth lerp to mouse look
          targetRot.x += (mouse.x * 0.35 - targetRot.x) * 0.08;
          targetRot.y += (-mouse.y * 0.22 - targetRot.y) * 0.08;

          if (headBone) {
            headBone.rotation.y = targetRot.x;
            headBone.rotation.x = targetRot.y;
          } else if (characterModel) {
            characterModel.rotation.y = targetRot.x * 0.5;
            characterModel.rotation.x = targetRot.y * 0.3;
          }

          renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
          if (!mountRef.current || !renderer || !camera) return;
          const w = mountRef.current.clientWidth;
          const h = mountRef.current.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };

        window.addEventListener("resize", handleResize);
      })
      .catch((err) => {
        console.warn("Three.js module loading fallback:", err);
      });

    return () => {
      isCancelled = true;
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
      if (renderer && renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="character-stage">
      {/* Neon glowing halo backdrop behind character */}
      <div className="character-backlight" />
      <div ref={mountRef} className="character-canvas-container" />
    </div>
  );
};

export default CharacterModel;
