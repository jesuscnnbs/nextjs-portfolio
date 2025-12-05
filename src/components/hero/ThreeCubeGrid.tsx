import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ThreeCubeGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(-25, -15, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create cube group
    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;

    // Create 10x10x10 grid of cubes
    const gridSize = 6;
    const spacing = 4;
    const offset = ((gridSize - 1) * spacing) / 2;

    // Cube geometry and material
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8844ff,
      emissive: 0x6804af,
      specular: 0xffffff,
      shininess: 260,
      transparent: true,
      opacity: 0.2,
    });

    // Create cubes
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(
            x * spacing - offset,
            y * spacing - offset,
            z * spacing - offset
          );
          cubeGroup.add(cube);
        }
      }
    }

    scene.add(cubeGroup);

    // Lighting - positioned rgb(200, 102, 244)
    const light = new THREE.PointLight(0xc866f4, 2, 100);
    light.position.set(-15, 15, 15);
    scene.add(light);

    // Ambient light for overall visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Add some edge lighting
    const rimLight = new THREE.DirectionalLight(0x6633cc, 0.5);
    rimLight.position.set(-10, 5, -10);
    scene.add(rimLight);

    // Handle scroll for rotation
    const handleScroll = () => {
      if (!cubeGroupRef.current) return;

      // Get scroll position
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      // Rotate 360 degrees (2 * Math.PI radians) based on scroll
      const rotation = scrollProgress * Math.PI * 2;
      cubeGroupRef.current.rotation.y = rotation;
      cubeGroupRef.current.rotation.x = rotation * 0.2;
      cubeGroupRef.current.position.x = Math.min(20, scrollProgress * 50);
      cubeGroupRef.current.position.y = Math.min(20, scrollProgress * 50);
      cubeGroupRef.current.position.z = Math.min(20, scrollProgress * 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        // Add subtle idle rotation when not scrolling
        if (cubeGroupRef.current) {
          cubeGroupRef.current.rotation.z += 0.001;
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      geometry.dispose();
      material.dispose();
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ThreeCubeGrid;
