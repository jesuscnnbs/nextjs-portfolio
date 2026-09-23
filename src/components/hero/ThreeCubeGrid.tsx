import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const INITIAL_OPACITY = 0.8;

// Generate a procedural rough-surface bump map using smoothed value noise
const generateBumpTexture = (size = 512, cells = 32) => {
  const coarse: number[][] = [];
  for (let y = 0; y <= cells; y++) {
    const row: number[] = [];
    for (let x = 0; x <= cells; x++) {
      row.push(Math.random());
    }
    coarse.push(row);
  }

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const image = ctx.createImageData(size, size);
  const cellSize = size / cells;

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const gx = px / cellSize;
      const gy = py / cellSize;
      const x0 = Math.min(Math.floor(gx), cells - 1);
      const y0 = Math.min(Math.floor(gy), cells - 1);
      const x1 = Math.min(x0 + 1, cells);
      const y1 = Math.min(y0 + 1, cells);
      const fx = gx - x0;
      const fy = gy - y0;

      const top = coarse[y0][x0] * (1 - fx) + coarse[y0][x1] * fx;
      const bottom = coarse[y1][x0] * (1 - fx) + coarse[y1][x1] * fx;
      const value = Math.floor((top * (1 - fy) + bottom * fy) * 255);

      const idx = (py * size + px) * 4;
      image.data[idx] = value;
      image.data[idx + 1] = value;
      image.data[idx + 2] = value;
      image.data[idx + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

// Detect device performance level
const detectPerformanceTier = (): 'high' | 'medium' | 'low' => {
  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory; // in GB

  // Check CPU cores
  const cpuCores = navigator.hardwareConcurrency || 4;

  // Performance scoring
  let score = 0;

  // Desktop gets higher score
  if (!isMobile) score += 3;

  // Memory-based scoring
  if (deviceMemory) {
    if (deviceMemory >= 8) score += 3;
    else if (deviceMemory >= 4) score += 2;
    else score += 1;
  } else {
    // Default if memory not available
    score += isMobile ? 1 : 2;
  }

  // CPU-based scoring
  if (cpuCores >= 8) score += 2;
  else if (cpuCores >= 4) score += 1;

  // Determine tier
  if (score >= 6) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
};

const ThreeCubeGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [performanceTier] = useState(() => detectPerformanceTier());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    // Performance-based settings
    const performanceSettings = {
      high: {
        gridSize: 4,
        spacing: 5,
        cubeSize: 2.5,
        segments: 1, // Box geometry segments (higher = more detailed)
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
      medium: {
        gridSize: 3,
        spacing: 5,
        cubeSize: 2.5,
        segments: 1,
        antialias: true,
        pixelRatio: 1,
      },
      low: {
        gridSize: 2,
        spacing: 6,
        cubeSize: 3,
        segments: 1,
        antialias: false,
        pixelRatio: 1,
      },
    };

    const settings = performanceSettings[performanceTier];

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    // Use container dimensions for aspect ratio
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(-25, -15, 0);
    cameraRef.current = camera;

    // Renderer setup with performance-based settings
    const renderer = new THREE.WebGLRenderer({
      antialias: settings.antialias,
      alpha: true,
    });
    // Use container dimensions instead of window to avoid mobile browser bar resize issues
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(settings.pixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create cube group
    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;

    // Use performance settings
    const gridSize = settings.gridSize;
    const spacing = settings.spacing;
    const cubeSize = settings.cubeSize;
    const offset = ((gridSize - 1) * spacing) / 2;

    // Cube geometry and material
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const bumpTexture = generateBumpTexture();
    const material = new THREE.MeshStandardMaterial({
      color: 0x8844ff,
      emissive: 0x1a0a33,
      roughness: 0.4,
      metalness: 1,
      bumpMap: bumpTexture,
      bumpScale: 2,
      transparent: true,
      opacity: INITIAL_OPACITY,
    });

    // Create cubes only on the outer shell
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const isInner = x !== 0 && y !== 0 && z !== 0 &&
                         x !== gridSize - 1 && y !== gridSize - 1 && z !== gridSize - 1;
          if (isInner) continue;

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

    // Standard three-point lighting setup with a purple tone
    // Key light - main illumination from the upper-left
    const keyLight = new THREE.DirectionalLight(0xe6d6ff, 2.5);
    keyLight.position.set(15, 25, 15);
    scene.add(keyLight);

    // Fill light - softens shadows on the opposite side
    const fillLight = new THREE.DirectionalLight(0xb28aff, 0.6);
    fillLight.position.set(-15, 5, 0);
    scene.add(fillLight);

    // Rim light - subtle edge highlight from behind to separate the cubes
    const rimLight = new THREE.DirectionalLight(0x9966ff, 1.0);
    rimLight.position.set(-20, 15, -20);
    scene.add(rimLight);

    // Ambient light - base visibility inside shadowed areas
    const ambientLight = new THREE.AmbientLight(0x1b1230, 0.5);
    scene.add(ambientLight);

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

      // Interpolate opacity from 0.6 to 0.15 based on fixed scroll amount
      const startOpacity = INITIAL_OPACITY;
      const endOpacity = 0.15;
      const opacityScrollDistance = 200; // Fixed amount of scroll in pixels
      const opacityProgress = Math.min(scrollY / opacityScrollDistance, 1);
      material.opacity = startOpacity + (endOpacity - startOpacity) * opacityProgress;
    };

    window.addEventListener("scroll", handleScroll);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;

      // Use container dimensions to avoid mobile browser bar resize issues
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      cameraRef.current.aspect = containerWidth / containerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerWidth, containerHeight);
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
      bumpTexture.dispose();
    };
  }, [isMounted, performanceTier]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full pointer-events-none z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100lvh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeCubeGrid;
