import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const INITIAL_OPACITY = 0.3;
const ROTATION_PROBABILITY = 0.03; // Probability that a cube will rotate during each check
const ROTATION_CHECK_INTERVAL = 0.3; // Check for rotations every 0.1 seconds
const ROTATION_SPEED = 0.01; // Speed of rotation animation

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
    const material = new THREE.MeshPhongMaterial({
      color: 0x8844ff,
      emissive: 0x6804af,
      specular: 0xffffff,
      shininess: 300,
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

          // Initialize rotation tracking in userData
          cube.userData = {
            targetRotation: { x: 0, y: 0, z: 0 },
            isRotating: false,
          };

          cubeGroup.add(cube);
        }
      }
    }

    scene.add(cubeGroup);

    // Multi-light setup for more dynamic appearance

    // Main key light (purple) - from top-right
    const keyLight = new THREE.PointLight(0xc866f4, 30, 150, 1.5);
    keyLight.position.set(40, 40, 30);
    scene.add(keyLight);

    // Secondary accent light (orange/red) - from opposite side for contrast
    const accentLight = new THREE.PointLight(0xff6644, 25, 120, 1.3);
    accentLight.position.set(-40, 20, -30);
    scene.add(accentLight);

    // Fill light (blue-purple) - softens shadows
    const fillLight = new THREE.PointLight(0x4466ff, 15, 100, 1.2);
    fillLight.position.set(0, -30, 40);
    scene.add(fillLight);

    // Rim/back light - highlights edges
    const rimLight = new THREE.DirectionalLight(0xaa66ff, 1.5);
    rimLight.position.set(-20, 10, -20);
    scene.add(rimLight);

    // Hemisphere light for ambient base lighting (sky and ground colors)
    const hemisphereLight = new THREE.HemisphereLight(0x6644aa, 0x221144, 0.6);
    scene.add(hemisphereLight);

    // Ambient light for overall visibility (kept lower since we have hemisphere)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
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

    // Track time for periodic rotation checks
    let lastRotationCheck = Date.now();

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        // Add subtle idle rotation when not scrolling
        if (cubeGroupRef.current) {
          cubeGroupRef.current.rotation.z += 0.001;

          // Check if it's time to potentially trigger rotations
          const currentTime = Date.now();
          if (currentTime - lastRotationCheck >= ROTATION_CHECK_INTERVAL * 1000) {
            lastRotationCheck = currentTime;

            // Check each cube for potential rotation
            cubeGroupRef.current.children.forEach((child) => {
              const cube = child as THREE.Mesh;
              if (!cube.userData.isRotating && Math.random() < ROTATION_PROBABILITY) {
                // Select random axis (0=x, 1=y, 2=z)
                const axis = Math.floor(Math.random() * 3);
                const rotationAmount = Math.PI / 2; // 90 degrees

                // Set target rotation
                cube.userData.isRotating = true;
                if (axis === 0) {
                  cube.userData.targetRotation.x = cube.rotation.x + rotationAmount;
                } else if (axis === 1) {
                  cube.userData.targetRotation.y = cube.rotation.y + rotationAmount;
                } else {
                  cube.userData.targetRotation.z = cube.rotation.z + rotationAmount;
                }
              }
            });
          }

          // Animate rotating cubes
          cubeGroupRef.current.children.forEach((child) => {
            const cube = child as THREE.Mesh;
            if (cube.userData.isRotating) {
              // Smoothly interpolate to target rotation
              const epsilon = 0.01;
              let reachedTarget = true;

              ['x', 'y', 'z'].forEach((axis) => {
                const current = cube.rotation[axis as 'x' | 'y' | 'z'];
                const target = cube.userData.targetRotation[axis];
                const diff = target - current;

                if (Math.abs(diff) > epsilon) {
                  cube.rotation[axis as 'x' | 'y' | 'z'] += diff * ROTATION_SPEED;
                  reachedTarget = false;
                } else {
                  cube.rotation[axis as 'x' | 'y' | 'z'] = target;
                }
              });

              if (reachedTarget) {
                cube.userData.isRotating = false;
              }
            }
          });
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
