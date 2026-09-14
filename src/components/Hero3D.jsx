import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';

export default function Hero3D() {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('normal'); // 'normal' | 'bus' | 'wireframe'
  const [isDragging, setIsDragging] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // References to three.js objects for live updates
  const sceneRef = useRef(null);
  const materialsRef = useRef({});
  const rotationGroupRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch (e) {
      setWebGLSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f2038, 1.8);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00e5ff, 3, 20);
    cyanPointLight.position.set(4, 3, 4);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0x7c3aed, 2.5, 20);
    purplePointLight.position.set(-4, -2, 3);
    scene.add(purplePointLight);

    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 1.2);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // 4. Main Satellite / Embedded Core Model Group
    const satelliteGroup = new THREE.Group();
    rotationGroupRef.current = satelliteGroup;
    scene.add(satelliteGroup);

    // Shared Materials dictionary
    const materials = {
      pcbSubstrate: new THREE.MeshStandardMaterial({
        color: 0x07152b,
        metalness: 0.6,
        roughness: 0.3,
      }),
      copperTraces: new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x0099bb,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      }),
      chipPackage: new THREE.MeshStandardMaterial({
        color: 0x111827,
        metalness: 0.8,
        roughness: 0.2,
      }),
      goldPins: new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.9,
        roughness: 0.1,
      }),
      solarCell: new THREE.MeshStandardMaterial({
        color: 0x0c2444,
        roughness: 0.1,
        metalness: 0.8,
      }),
      solarFrame: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.4,
      }),
      glowingCyan: new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
      }),
      glowingGreen: new THREE.MeshBasicMaterial({
        color: 0x10b981,
      }),
      glowingAmber: new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
      }),
      orbitalRings: new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
      wireframeBlueprint: new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      }),
    };
    materialsRef.current = materials;

    // --- A. Central PCB Chassis ---
    const pcbGeo = new THREE.BoxGeometry(2.4, 2.4, 0.08);
    const pcbMesh = new THREE.Mesh(pcbGeo, materials.pcbSubstrate);
    satelliteGroup.add(pcbMesh);

    // Substrate Edge Bezel
    const pcbBezelGeo = new THREE.BoxGeometry(2.44, 2.44, 0.04);
    const pcbBezelMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, roughness: 0.3, metalness: 0.7 });
    const pcbBezel = new THREE.Mesh(pcbBezelGeo, pcbBezelMat);
    satelliteGroup.add(pcbBezel);

    // --- B. Central Microcontroller (ESP32 SoC Package) ---
    const mcuGeo = new THREE.BoxGeometry(0.9, 0.9, 0.12);
    const mcuMesh = new THREE.Mesh(mcuGeo, materials.chipPackage);
    mcuMesh.position.z = 0.1;
    satelliteGroup.add(mcuMesh);

    // MCU Heat-spreader Shield
    const shieldGeo = new THREE.BoxGeometry(0.65, 0.65, 0.13);
    const shieldMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.95, roughness: 0.1 });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.z = 0.105;
    satelliteGroup.add(shieldMesh);

    // MCU Pins (around QFN package)
    const pinGeo = new THREE.BoxGeometry(0.04, 0.1, 0.03);
    for (let side = 0; side < 4; side++) {
      for (let p = -3; p <= 3; p++) {
        const pin = new THREE.Mesh(pinGeo, materials.goldPins);
        const offset = p * 0.11;
        if (side === 0) { // Top
          pin.position.set(offset, 0.48, 0.08);
        } else if (side === 1) { // Bottom
          pin.position.set(offset, -0.48, 0.08);
        } else if (side === 2) { // Left
          pin.rotation.z = Math.PI / 2;
          pin.position.set(-0.48, offset, 0.08);
        } else { // Right
          pin.rotation.z = Math.PI / 2;
          pin.position.set(0.48, offset, 0.08);
        }
        satelliteGroup.add(pin);
      }
    }

    // --- C. Glowing Circuit Traces on PCB Surface ---
    const tracePoints = [
      // Bus traces leading to headers
      [-0.45, 0.3, 0.05], [-0.85, 0.3, 0.05], [-0.85, 0.8, 0.05], [-1.0, 0.8, 0.05],
      [0.45, 0.3, 0.05], [0.85, 0.3, 0.05], [0.85, 0.8, 0.05], [1.0, 0.8, 0.05],
      [-0.45, -0.3, 0.05], [-0.75, -0.3, 0.05], [-0.75, -0.85, 0.05], [-1.0, -0.85, 0.05],
      [0.45, -0.3, 0.05], [0.75, -0.3, 0.05], [0.75, -0.85, 0.05], [1.0, -0.85, 0.05],
      [0.2, 0.45, 0.05], [0.2, 0.8, 0.05], [0.5, 0.8, 0.05], [0.5, 1.0, 0.05],
      [-0.2, -0.45, 0.05], [-0.2, -0.8, 0.05], [-0.5, -0.8, 0.05], [-0.5, -1.0, 0.05],
    ];

    const tracesGroup = new THREE.Group();
    for (let i = 0; i < tracePoints.length; i += 2) {
      const p1 = new THREE.Vector3(...tracePoints[i]);
      const p2 = new THREE.Vector3(...tracePoints[i + 1]);
      const curve = new THREE.LineCurve3(p1, p2);
      const tubeGeo = new THREE.TubeGeometry(curve, 1, 0.012, 6, false);
      const traceMesh = new THREE.Mesh(tubeGeo, materials.copperTraces);
      tracesGroup.add(traceMesh);
    }
    satelliteGroup.add(tracesGroup);

    // --- D. Dual Solar Photovoltaic Array Wings ---
    const solarWingGroupLeft = new THREE.Group();
    const solarWingGroupRight = new THREE.Group();

    // Wing frame & panels
    const panelFrameGeo = new THREE.BoxGeometry(1.6, 1.1, 0.04);
    const panelCellGeo = new THREE.BoxGeometry(1.5, 1.0, 0.05);

    // Left Wing
    const leftFrame = new THREE.Mesh(panelFrameGeo, materials.solarFrame);
    const leftCell = new THREE.Mesh(panelCellGeo, materials.solarCell);
    solarWingGroupLeft.add(leftFrame);
    solarWingGroupLeft.add(leftCell);
    solarWingGroupLeft.position.set(-2.2, 0, 0);

    // Structural connecting arm Left
    const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9);
    armGeo.rotateZ(Math.PI / 2);
    const leftArm = new THREE.Mesh(armGeo, materials.solarFrame);
    leftArm.position.set(-1.4, 0, 0);
    satelliteGroup.add(leftArm);
    satelliteGroup.add(solarWingGroupLeft);

    // Right Wing
    const rightFrame = new THREE.Mesh(panelFrameGeo, materials.solarFrame);
    const rightCell = new THREE.Mesh(panelCellGeo, materials.solarCell);
    solarWingGroupRight.add(rightFrame);
    solarWingGroupRight.add(rightCell);
    solarWingGroupRight.position.set(2.2, 0, 0);

    // Structural connecting arm Right
    const rightArm = new THREE.Mesh(armGeo, materials.solarFrame);
    rightArm.position.set(1.4, 0, 0);
    satelliteGroup.add(rightArm);
    satelliteGroup.add(solarWingGroupRight);

    // --- E. Solar Panel Grid Wireframe Traces ---
    const solarWireGeo = new THREE.WireframeGeometry(new THREE.PlaneGeometry(1.48, 0.98, 6, 3));
    const solarWireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.4 });
    const leftWire = new THREE.LineSegments(solarWireGeo, solarWireMat);
    leftWire.position.z = 0.03;
    solarWingGroupLeft.add(leftWire);

    const rightWire = new THREE.LineSegments(solarWireGeo, solarWireMat);
    rightWire.position.z = 0.03;
    solarWingGroupRight.add(rightWire);

    // --- F. Pulsating SMD Status LEDs ---
    const ledGeo = new THREE.BoxGeometry(0.06, 0.08, 0.04);
    
    // TX LED (Cyan)
    const txLed = new THREE.Mesh(ledGeo, materials.glowingCyan);
    txLed.position.set(0.8, -0.6, 0.06);
    satelliteGroup.add(txLed);

    // RX LED (Green)
    const rxLed = new THREE.Mesh(ledGeo, materials.glowingGreen);
    rxLed.position.set(0.9, -0.6, 0.06);
    satelliteGroup.add(rxLed);

    // Power LED (Amber)
    const pwrLed = new THREE.Mesh(ledGeo, materials.glowingAmber);
    pwrLed.position.set(1.0, -0.6, 0.06);
    satelliteGroup.add(pwrLed);

    // --- G. Orbital Gyroscopic Rings ---
    const ringGeo1 = new THREE.RingGeometry(3.3, 3.32, 64);
    const ringMesh1 = new THREE.Mesh(ringGeo1, materials.orbitalRings);
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(3.6, 3.62, 64);
    const ringMesh2 = new THREE.Mesh(ringGeo2, new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    }));
    ringMesh2.rotation.x = Math.PI / 3;
    scene.add(ringMesh2);

    const ringGeo3 = new THREE.RingGeometry(4.0, 4.02, 64);
    const ringMesh3 = new THREE.Mesh(ringGeo3, new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    }));
    ringMesh3.rotation.y = Math.PI / 4;
    scene.add(ringMesh3);

    // Satellite High-Gain Dish Antenna on top
    const dishGeo = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4);
    const dishMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2, side: THREE.DoubleSide });
    const dishMesh = new THREE.Mesh(dishGeo, dishMat);
    dishMesh.rotation.x = -Math.PI / 3;
    dishMesh.position.set(0, 1.45, 0.2);
    satelliteGroup.add(dishMesh);

    // Dish Feed Horn / Probe
    const probeGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25);
    const probeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const probeMesh = new THREE.Mesh(probeGeo, probeMat);
    probeMesh.position.set(0, 1.55, 0.3);
    probeMesh.rotation.x = -Math.PI / 3;
    satelliteGroup.add(probeMesh);

    // Orbiting Sensor Breakout Node (Representing I2C sensors like MAX30102 / BME280)
    const sensorNodeGeo = new THREE.BoxGeometry(0.25, 0.35, 0.05);
    const sensorNodeMat = new THREE.MeshStandardMaterial({ color: 0x0a192f, metalness: 0.7, roughness: 0.3 });
    const sensorNode = new THREE.Mesh(sensorNodeGeo, sensorNodeMat);
    scene.add(sensorNode);

    // Orbiting particle halo
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const r = 2.8 + Math.random() * 1.5;
      particlePositions[i] = r * Math.cos(theta) * Math.cos(phi);
      particlePositions[i + 1] = r * Math.sin(phi);
      particlePositions[i + 2] = r * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // --- Interaction & Mouse Parallax ---
    let targetRotationX = 0.2;
    let targetRotationY = -0.3;
    let currentRotationX = 0.2;
    let currentRotationY = -0.3;
    let mouseX = 0;
    let mouseY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let isUserDragging = false;

    const handlePointerDown = (e) => {
      isUserDragging = true;
      setIsDragging(true);
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      sound.click();
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const yNorm = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = xNorm;
      mouseY = yNorm;

      if (isUserDragging) {
        const deltaX = e.clientX - lastPointerX;
        const deltaY = e.clientY - lastPointerY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isUserDragging = false;
      setIsDragging(false);
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Base auto-rotation when not dragging
      if (!isUserDragging) {
        targetRotationY += 0.003;
        targetRotationX = 0.15 + Math.sin(elapsedTime * 0.5) * 0.08 + mouseY * 0.2;
        targetRotationY += mouseX * 0.002;
      }

      // Smooth lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      satelliteGroup.rotation.x = currentRotationX;
      satelliteGroup.rotation.y = currentRotationY;
      satelliteGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12; // Gentle hover bobbing

      // Pulsate SMD LEDs
      materials.glowingCyan.color.setHSL(0.52, 1, 0.4 + Math.sin(elapsedTime * 8) * 0.3);
      materials.glowingGreen.color.setHSL(0.38, 1, 0.4 + Math.cos(elapsedTime * 6) * 0.3);
      materials.glowingAmber.color.setHSL(0.1, 1, 0.45 + Math.sin(elapsedTime * 4) * 0.2);

      // Rotate orbital rings
      ringMesh1.rotation.z = elapsedTime * 0.1;
      ringMesh2.rotation.z = -elapsedTime * 0.15;
      ringMesh3.rotation.x = Math.PI / 4 + Math.sin(elapsedTime * 0.2) * 0.1;

      // Orbit sensor node around satellite
      const orbitAngle = elapsedTime * 0.8;
      sensorNode.position.x = Math.cos(orbitAngle) * 3.4;
      sensorNode.position.z = Math.sin(orbitAngle) * 3.4;
      sensorNode.position.y = Math.sin(elapsedTime * 1.5) * 0.8;
      sensorNode.rotation.x = elapsedTime;
      sensorNode.rotation.y = elapsedTime * 1.2;

      // Rotate particle halo
      particlePoints.rotation.y = -elapsedTime * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle mode switches (Normal / Bus / Wireframe)
  useEffect(() => {
    const materials = materialsRef.current;
    if (!materials || !materials.pcbSubstrate) return;

    if (viewMode === 'wireframe') {
      materials.pcbSubstrate.wireframe = true;
      materials.chipPackage.wireframe = true;
      materials.solarCell.wireframe = true;
      materials.solarFrame.wireframe = true;
      materials.copperTraces.emissiveIntensity = 1.0;
    } else if (viewMode === 'bus') {
      materials.pcbSubstrate.wireframe = false;
      materials.chipPackage.wireframe = false;
      materials.solarCell.wireframe = false;
      materials.solarFrame.wireframe = false;
      materials.copperTraces.emissiveIntensity = 2.0;
      materials.pcbSubstrate.color.setHex(0x020814);
    } else {
      // Normal
      materials.pcbSubstrate.wireframe = false;
      materials.chipPackage.wireframe = false;
      materials.solarCell.wireframe = false;
      materials.solarFrame.wireframe = false;
      materials.copperTraces.emissiveIntensity = 0.6;
      materials.pcbSubstrate.color.setHex(0x07152b);
    }
  }, [viewMode]);

  return (
    <div className="relative w-full h-[480px] lg:h-[620px] flex items-center justify-center select-none">
      {/* 3D Canvas Mount */}
      {webGLSupported ? (
        <div
          ref={containerRef}
          className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700`}
        />
      ) : (
        /* Graceful Fallback for non-WebGL devices */
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl">
          <div className="w-24 h-24 rounded-full border-2 border-cyan-400/50 flex items-center justify-center mb-4 text-cyan-300">
            <svg className="w-12 h-12 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v18M15 3v18M3 9h18M3 15h18" />
            </svg>
          </div>
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-1">EMBEDDED HARDWARE CORE</span>
          <p className="text-slate-400 text-xs max-w-xs font-mono">
            ESP32 Tensilica Dual-Core Architecture • I2C / SPI / UART Sensor Grid Active
          </p>
        </div>
      )}

      {/* Futuristic HUD Overlay Controls */}
      <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between pointer-events-none gap-2">
        {/* Left Telemetry Stamp */}
        <div className="flex items-center space-x-2 glass-panel px-3 py-1.5 rounded text-[11px] font-mono text-slate-300 border border-cyan-500/20 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300">ESP32-ORBITAL-V3</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 hidden sm:inline">DRAG TO INSPECT</span>
        </div>

        {/* Right Inspection Mode Switcher */}
        <div className="flex items-center space-x-1 glass-panel p-1 rounded border border-cyan-500/20 pointer-events-auto">
          {[
            { id: 'normal', label: 'DEFAULT' },
            { id: 'bus', label: 'BUS TOPOLOGY' },
            { id: 'wireframe', label: 'X-RAY' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setViewMode(mode.id);
                sound.click();
              }}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all ${
                viewMode === mode.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-space-800'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Corner Accents */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />
    </div>
  );
}
