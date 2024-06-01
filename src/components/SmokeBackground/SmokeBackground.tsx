"use client";

import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

const SmokeBackground = () => {
  const rendererContainerRef = useRef<HTMLDivElement | null>(null);

  const initThree = useCallback(() => {
    if (!rendererContainerRef.current) return;

    const width = rendererContainerRef.current.clientWidth;
    const height = rendererContainerRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio); // Asegura que el renderizado se vea bien en pantallas de alta densidad de píxeles
    renderer.setClearColor(0x18181b, 1);
    rendererContainerRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 0.1);
    light.position.set(-1, 3, 1);
    scene.add(light);

    const smokeParticles: THREE.Mesh<
      THREE.PlaneGeometry,
      THREE.MeshLambertMaterial
    >[] = [];
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";

    loader.load("/smoke.webp", (texture) => {
      const smokeGeometry = new THREE.PlaneGeometry(300, 300);

      const smokeMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
      });

      const NUM_OF_PARTICLES = 300;
      for (let p = 0; p < NUM_OF_PARTICLES; p++) {
        const particle = new THREE.Mesh(smokeGeometry, smokeMaterial);

        particle.position.set(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250,
          Math.random() * 1000 - 100
        );
        particle.rotation.z = Math.random() * 360;

        scene.add(particle);
        smokeParticles.push(particle);
      }
    });

    camera.position.z = 5;

    const resize = () => {
      if (rendererContainerRef.current) {
        const width = rendererContainerRef.current.clientWidth;
        const height = rendererContainerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      smokeParticles.forEach((particle) => {
        particle.rotation.z += 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    initThree();
  }, [initThree]);

  return <div ref={rendererContainerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }} />;
};

export default SmokeBackground;
