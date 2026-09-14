import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';

export default function Hero3D() {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('normal'); // 'normal' | 'bus' | 'wireframe'
  const [activePart, setActivePart] = useState('all'); // 'all', 'esp32', 'solar', 'antenna', 'thrusters'
  const [isDragging, setIsDragging] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Simple explanations for common people
  const partExplanations = {
    all: "Full Satellite Assembly: A complete orbital spacecraft featuring solar panels, communications, and an embedded flight computer.",
    esp32: "ESP32 Embedded Computer: The main 'brain' of the satellite. It runs the software code and processes all sensor readings.",
    solar: "Solar Power Wings: Two large folding solar panels that absorb sunlight to generate continuous clean electricity in orbit.",
    antenna: "High-Gain Dish Antenna: Points toward Earth to send telemetry, sensor data, and pictures back to mission control.",
    thrusters: "Steering Thruster Nozzles: Tiny gas jets mounted on the corners that gently steer and balance the satellite in space."
  };

  // References to three.js objects for live updates
  const sceneRef = useRef(null);
  const materialsRef = useRef({});
  const satelliteGroupRef = useRef(null);
  const partsRefs = useRef({});

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
    camera.position.set(0, 0.2, 7.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f243e, 2.0);
    scene.add(ambientLight);

    const mainSunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainSunLight.position.set(5, 4, 5);
    scene.add(mainSunLight);

    const cyanRimLight = new THREE.PointLight(0x00e5ff, 4, 18);
    cyanRimLight.position.set(4, 2, 3);
    scene.add(cyanRimLight);

    const purpleBackLight = new THREE.PointLight(0x8b5cf6, 3, 18);
    purpleBackLight.position.set(-4, -3, 2);
    scene.add(purpleBackLight);

    const bottomReflector = new THREE.DirectionalLight(0x0284c7, 0.8);
    bottomReflector.position.set(0, -5, -2);
    scene.add(bottomReflector);

    // 4. Main Satellite Group
    const satelliteGroup = new THREE.Group();
    satelliteGroupRef.current = satelliteGroup;
    scene.add(satelliteGroup);

    // --- High-Detail Materials ---
    const materials = {
      goldFoil: new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.85,
        roughness: 0.25,
      }),
      darkBody: new THREE.MeshStandardMaterial({
        color: 0x0c192c,
        metalness: 0.7,
        roughness: 0.35,
      }),
      titaniumMetal: new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.9,
        roughness: 0.2,
      }),
      pcbSubstrate: new THREE.MeshStandardMaterial({
        color: 0x061427,
        metalness: 0.5,
        roughness: 0.3,
      }),
      copperTraces: new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x0099bb,
        emissiveIntensity: 0.7,
        roughness: 0.2,
      }),
      chipShield: new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.95,
        roughness: 0.15,
      }),
      goldPins: new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.1,
      }),
      silverCan: new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.1,
      }),
      solarCell: new THREE.MeshStandardMaterial({
        color: 0x081e3a,
        roughness: 0.15,
        metalness: 0.8,
      }),
      solarFrame: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.4,
      }),
      dishReflector: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.25,
        side: THREE.DoubleSide
      }),
      dishGoldMesh: new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: true,
      }),
      thrusterNozzle: new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.85,
        roughness: 0.3,
      }),
      glowingCyan: new THREE.MeshBasicMaterial({ color: 0x00e5ff }),
      glowingGreen: new THREE.MeshBasicMaterial({ color: 0x10b981 }),
      glowingAmber: new THREE.MeshBasicMaterial({ color: 0xf59e0b }),
      glowingPurple: new THREE.MeshBasicMaterial({ color: 0xa855f7 }),
      orbitalRings: new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    };
    materialsRef.current = materials;

    // ==========================================
    // 1. SATELLITE MAIN OCTAGONAL BUS CHASSIS
    // ==========================================
    const busRadius = 1.1;
    const busHeight = 1.4;
    const busGeo = new THREE.CylinderGeometry(busRadius, busRadius, busHeight, 8);
    const busMesh = new THREE.Mesh(busGeo, materials.darkBody);
    satelliteGroup.add(busMesh);

    // Gold Multi-Layer Insulation (MLI) Thermal Blanket Panels on alternate facets
    const foilPanelGeo = new THREE.PlaneGeometry(0.8, 1.25);
    for (let f = 0; f < 8; f++) {
      if (f % 2 === 0) {
        const foilPanel = new THREE.Mesh(foilPanelGeo, materials.goldFoil);
        const angle = (f / 8) * Math.PI * 2;
        foilPanel.position.set(Math.sin(angle) * (busRadius + 0.01), 0, Math.cos(angle) * (busRadius + 0.01));
        foilPanel.rotation.y = angle;
        satelliteGroup.add(foilPanel);
      }
    }

    // Top and Bottom Structural Deck Rings (Anodized Titanium)
    const deckRingGeo = new THREE.CylinderGeometry(busRadius + 0.06, busRadius + 0.06, 0.08, 16);
    const topDeck = new THREE.Mesh(deckRingGeo, materials.titaniumMetal);
    topDeck.position.y = busHeight / 2;
    satelliteGroup.add(topDeck);

    const bottomDeck = new THREE.Mesh(deckRingGeo, materials.titaniumMetal);
    bottomDeck.position.y = -busHeight / 2;
    satelliteGroup.add(bottomDeck);

    // ==========================================
    // 2. EMBEDDED FLIGHT COMPUTER & PCB ON FRONT DECK
    // ==========================================
    const esp32Group = new THREE.Group();
    partsRefs.current.esp32 = esp32Group;

    // Motherboard PCB Substrate
    const pcbGeo = new THREE.BoxGeometry(1.5, 1.1, 0.05);
    const pcbMesh = new THREE.Mesh(pcbGeo, materials.pcbSubstrate);
    esp32Group.add(pcbMesh);

    // Golden Edge Strip
    const pcbEdgeGeo = new THREE.BoxGeometry(1.54, 1.14, 0.02);
    const pcbEdge = new THREE.Mesh(pcbEdgeGeo, materials.goldPins);
    esp32Group.add(pcbEdge);

    // ESP32 SoC Main Package
    const mcuGeo = new THREE.BoxGeometry(0.75, 0.55, 0.09);
    const mcuMesh = new THREE.Mesh(mcuGeo, materials.titaniumMetal);
    mcuMesh.position.set(-0.25, 0.05, 0.06);
    esp32Group.add(mcuMesh);

    // Metallic Stamped RF Shield Can (ESP32-WROOM-32)
    const shieldGeo = new THREE.BoxGeometry(0.55, 0.42, 0.1);
    const shieldMesh = new THREE.Mesh(shieldGeo, materials.chipShield);
    shieldMesh.position.set(-0.25, 0.05, 0.07);
    esp32Group.add(shieldMesh);

    // Golden QFN Pins around the ESP32 chip
    const pinGeo = new THREE.BoxGeometry(0.03, 0.07, 0.02);
    for (let p = -3; p <= 3; p++) {
      const topPin = new THREE.Mesh(pinGeo, materials.goldPins);
      topPin.position.set(-0.25 + p * 0.08, 0.35, 0.05);
      esp32Group.add(topPin);

      const botPin = new THREE.Mesh(pinGeo, materials.goldPins);
      botPin.position.set(-0.25 + p * 0.08, -0.25, 0.05);
      esp32Group.add(botPin);
    }

    // Cylindrical Quartz Crystal Oscillator Can (32.768 kHz / 40 MHz)
    const crystalGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 12);
    crystalGeo.rotateZ(Math.PI / 2);
    const crystalMesh = new THREE.Mesh(crystalGeo, materials.silverCan);
    crystalMesh.position.set(0.22, 0.28, 0.06);
    esp32Group.add(crystalMesh);

    // SMD Ceramic Capacitors and Resistor Arrays
    const smdGeo = new THREE.BoxGeometry(0.06, 0.04, 0.04);
    const smdPositions = [
      [0.2, 0.12], [0.3, 0.12], [0.4, 0.12],
      [0.2, -0.05], [0.3, -0.05], [0.4, -0.05],
      [0.2, -0.2], [0.3, -0.2], [0.4, -0.2]
    ];
    smdPositions.forEach(([x, y]) => {
      const smd = new THREE.Mesh(smdGeo, materials.silverCan);
      smd.position.set(x, y, 0.05);
      esp32Group.add(smd);
    });

    // Dual-Row Gold Pin Header (I2C / SPI / UART Breakout)
    const headerBaseGeo = new THREE.BoxGeometry(0.12, 0.85, 0.08);
    const headerBase = new THREE.Mesh(headerBaseGeo, materials.darkBody);
    headerBase.position.set(0.62, 0, 0.06);
    esp32Group.add(headerBase);

    for (let h = -4; h <= 4; h++) {
      const pinStick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.14), materials.goldPins);
      pinStick.position.set(0.62, h * 0.09, 0.12);
      esp32Group.add(pinStick);
    }

    // Glowing Circuit Bus Traces (I2C / SPI / Power Lines)
    const traceCoords = [
      [-0.25, 0.35, 0.04], [0.05, 0.35, 0.04], [0.05, 0.12, 0.04], [0.18, 0.12, 0.04],
      [-0.25, -0.25, 0.04], [0.05, -0.25, 0.04], [0.05, -0.05, 0.04], [0.18, -0.05, 0.04],
      [0.45, 0.12, 0.04], [0.55, 0.12, 0.04], [0.55, 0.25, 0.04], [0.62, 0.25, 0.04],
      [0.45, -0.05, 0.04], [0.55, -0.05, 0.04], [0.55, -0.15, 0.04], [0.62, -0.15, 0.04],
    ];
    for (let t = 0; t < traceCoords.length; t += 2) {
      const p1 = new THREE.Vector3(...traceCoords[t]);
      const p2 = new THREE.Vector3(...traceCoords[t + 1]);
      const lineCurve = new THREE.LineCurve3(p1, p2);
      const tubeGeo = new THREE.TubeGeometry(lineCurve, 1, 0.012, 6, false);
      const traceMesh = new THREE.Mesh(tubeGeo, materials.copperTraces);
      esp32Group.add(traceMesh);
    }

    // Status Indicator LEDs (TX, RX, PWR, LINK)
    const ledGeo = new THREE.BoxGeometry(0.05, 0.06, 0.03);
    const txLed = new THREE.Mesh(ledGeo, materials.glowingCyan);
    txLed.position.set(-0.55, 0.32, 0.05);
    esp32Group.add(txLed);

    const rxLed = new THREE.Mesh(ledGeo, materials.glowingGreen);
    rxLed.position.set(-0.55, 0.2, 0.05);
    esp32Group.add(rxLed);

    const pwrLed = new THREE.Mesh(ledGeo, materials.glowingAmber);
    pwrLed.position.set(-0.55, 0.08, 0.05);
    esp32Group.add(pwrLed);

    const wifiLed = new THREE.Mesh(ledGeo, materials.glowingPurple);
    wifiLed.position.set(-0.55, -0.04, 0.05);
    esp32Group.add(wifiLed);

    // Position ESP32 equipment deck on the front of the bus
    esp32Group.position.set(0, 0, busRadius + 0.05);
    satelliteGroup.add(esp32Group);

    // ==========================================
    // 3. ARTICULATING SOLAR ARRAY WINGS (LEFT & RIGHT)
    // ==========================================
    const solarGroup = new THREE.Group();
    partsRefs.current.solar = solarGroup;

    const createSolarWing = (isLeft) => {
      const wingGroup = new THREE.Group();
      const dir = isLeft ? -1 : 1;

      // Connecting Swivel Arm & Hinge Bracket
      const hingeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 12);
      const hingeMesh = new THREE.Mesh(hingeGeo, materials.titaniumMetal);
      hingeMesh.position.set(dir * 1.15, 0, 0);
      wingGroup.add(hingeMesh);

      const boomGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
      boomGeo.rotateZ(Math.PI / 2);
      const boomMesh = new THREE.Mesh(boomGeo, materials.titaniumMetal);
      boomMesh.position.set(dir * 1.55, 0, 0);
      wingGroup.add(boomMesh);

      // Panel 1 (Inner Segment)
      const panelFrameGeo = new THREE.BoxGeometry(1.3, 1.1, 0.04);
      const panelFrame1 = new THREE.Mesh(panelFrameGeo, materials.solarFrame);
      panelFrame1.position.set(dir * 2.5, 0, 0);
      wingGroup.add(panelFrame1);

      const panelCellsGeo = new THREE.BoxGeometry(1.22, 1.02, 0.05);
      const panelCells1 = new THREE.Mesh(panelCellsGeo, materials.solarCell);
      panelCells1.position.set(dir * 2.5, 0, 0);
      wingGroup.add(panelCells1);

      // Panel 2 (Outer Folding Segment)
      const panelFrame2 = new THREE.Mesh(panelFrameGeo, materials.solarFrame);
      panelFrame2.position.set(dir * 3.9, 0, 0);
      wingGroup.add(panelFrame2);

      const panelCells2 = new THREE.Mesh(panelCellsGeo, materials.solarCell);
      panelCells2.position.set(dir * 3.9, 0, 0);
      wingGroup.add(panelCells2);

      // Inter-panel gold hinge joint
      const interHinge = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.15, 8), materials.goldPins);
      interHinge.position.set(dir * 3.2, 0, 0);
      wingGroup.add(interHinge);

      // Silver Busbar Wireframe Grid Lines on Solar Cells
      const wireGridGeo = new THREE.WireframeGeometry(new THREE.PlaneGeometry(1.2, 1.0, 5, 4));
      const wireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.5 });
      
      const gridLine1 = new THREE.LineSegments(wireGridGeo, wireMat);
      gridLine1.position.set(dir * 2.5, 0, 0.03);
      wingGroup.add(gridLine1);

      const gridLine2 = new THREE.LineSegments(wireGridGeo, wireMat);
      gridLine2.position.set(dir * 3.9, 0, 0.03);
      wingGroup.add(gridLine2);

      return wingGroup;
    };

    const leftWing = createSolarWing(true);
    const rightWing = createSolarWing(false);
    solarGroup.add(leftWing);
    solarGroup.add(rightWing);
    satelliteGroup.add(solarGroup);

    // ==========================================
    // 4. HIGH-GAIN PARABOLIC DISH ANTENNA (TOP DECK)
    // ==========================================
    const antennaGroup = new THREE.Group();
    partsRefs.current.antenna = antennaGroup;

    // Gimbal Steering Joint Base
    const gimbalBaseGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.2, 12);
    const gimbalBase = new THREE.Mesh(gimbalBaseGeo, materials.titaniumMetal);
    gimbalBase.position.set(0, busHeight / 2 + 0.1, -0.3);
    antennaGroup.add(gimbalBase);

    // Parabolic Dish Reflector
    const dishRadius = 0.55;
    const dishGeo = new THREE.SphereGeometry(dishRadius, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const dishMesh = new THREE.Mesh(dishGeo, materials.dishReflector);
    dishMesh.rotation.x = -Math.PI / 3.5;
    dishMesh.position.set(0, busHeight / 2 + 0.45, -0.2);
    antennaGroup.add(dishMesh);

    // Gold Mesh Interior Lining
    const dishMeshLining = new THREE.Mesh(dishGeo, materials.dishGoldMesh);
    dishMeshLining.rotation.x = -Math.PI / 3.5;
    dishMeshLining.position.set(0, busHeight / 2 + 0.455, -0.198);
    antennaGroup.add(dishMeshLining);

    // Tripod Sub-reflector Feed Struts & Horn Probe
    const feedProbeGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.4, 8);
    const feedProbe = new THREE.Mesh(feedProbeGeo, materials.glowingCyan);
    feedProbe.rotation.x = -Math.PI / 3.5;
    feedProbe.position.set(0, busHeight / 2 + 0.65, -0.05);
    antennaGroup.add(feedProbe);

    satelliteGroup.add(antennaGroup);

    // ==========================================
    // 5. ATTITUDE CONTROL (RCS) THRUSTER PODS
    // ==========================================
    const thrustersGroup = new THREE.Group();
    partsRefs.current.thrusters = thrustersGroup;

    const cornerAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    cornerAngles.forEach((ang) => {
      const podBox = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.18, 0.15), materials.darkBody);
      const x = Math.sin(ang) * (busRadius + 0.04);
      const z = Math.cos(ang) * (busRadius + 0.04);
      podBox.position.set(x, -busHeight / 2 + 0.2, z);
      podBox.rotation.y = ang;
      thrustersGroup.add(podBox);

      // Conical Titanium Nozzles pointing outward and down
      const nozzleGeo = new THREE.ConeGeometry(0.045, 0.12, 10, 1, true);
      const nozzleMesh = new THREE.Mesh(nozzleGeo, materials.thrusterNozzle);
      nozzleMesh.position.set(x * 1.08, -busHeight / 2 + 0.15, z * 1.08);
      nozzleMesh.rotation.x = Math.PI;
      thrustersGroup.add(nozzleMesh);
    });
    satelliteGroup.add(thrustersGroup);

    // ==========================================
    // 6. OPTICAL STAR TRACKERS & HORIZON SENSORS
    // ==========================================
    const starTrackerGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.2, 12);
    const starTracker1 = new THREE.Mesh(starTrackerGeo, materials.titaniumMetal);
    starTracker1.position.set(0.45, busHeight / 2 + 0.1, 0.35);
    starTracker1.rotation.z = -0.3;
    satelliteGroup.add(starTracker1);

    const starTracker2 = new THREE.Mesh(starTrackerGeo, materials.titaniumMetal);
    starTracker2.position.set(-0.45, busHeight / 2 + 0.1, 0.35);
    starTracker2.rotation.z = 0.3;
    satelliteGroup.add(starTracker2);

    // ==========================================
    // 7. ORBITAL GYROSCOPE RINGS & PARTICLE HALO
    // ==========================================
    const ringGeo1 = new THREE.RingGeometry(3.6, 3.63, 64);
    const ringMesh1 = new THREE.Mesh(ringGeo1, materials.orbitalRings);
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(4.1, 4.13, 64);
    const ringMesh2 = new THREE.Mesh(ringGeo2, new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    }));
    ringMesh2.rotation.x = Math.PI / 3;
    scene.add(ringMesh2);

    // Halo Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const r = 3.2 + Math.random() * 2.0;
      particlePositions[i] = r * Math.cos(theta) * Math.cos(phi);
      particlePositions[i + 1] = r * Math.sin(phi);
      particlePositions[i + 2] = r * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // --- Interaction & Mouse Parallax ---
    let targetRotationX = 0.18;
    let targetRotationY = -0.35;
    let currentRotationX = 0.18;
    let currentRotationY = -0.35;
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
        targetRotationY += 0.0035;
        targetRotationX = 0.18 + Math.sin(elapsedTime * 0.6) * 0.08 + mouseY * 0.15;
        targetRotationY += mouseX * 0.002;
      }

      // Smooth lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      satelliteGroup.rotation.x = currentRotationX;
      satelliteGroup.rotation.y = currentRotationY;
      satelliteGroup.position.y = Math.sin(elapsedTime * 1.3) * 0.12;

      // Pulsate Status LEDs
      materials.glowingCyan.color.setHSL(0.52, 1, 0.45 + Math.sin(elapsedTime * 8) * 0.25);
      materials.glowingGreen.color.setHSL(0.38, 1, 0.45 + Math.cos(elapsedTime * 6) * 0.25);
      materials.glowingAmber.color.setHSL(0.1, 1, 0.5 + Math.sin(elapsedTime * 4) * 0.2);
      materials.glowingPurple.color.setHSL(0.78, 1, 0.5 + Math.cos(elapsedTime * 5) * 0.2);

      // Rotate orbital rings
      ringMesh1.rotation.z = elapsedTime * 0.08;
      ringMesh2.rotation.z = -elapsedTime * 0.12;

      // Slow particle halo rotation
      particlePoints.rotation.y = -elapsedTime * 0.04;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

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
    if (!materials || !materials.darkBody) return;

    if (viewMode === 'wireframe') {
      materials.darkBody.wireframe = true;
      materials.goldFoil.wireframe = true;
      materials.solarCell.wireframe = true;
      materials.pcbSubstrate.wireframe = true;
      materials.copperTraces.emissiveIntensity = 1.0;
    } else if (viewMode === 'bus') {
      materials.darkBody.wireframe = false;
      materials.goldFoil.wireframe = false;
      materials.solarCell.wireframe = false;
      materials.pcbSubstrate.wireframe = false;
      materials.copperTraces.emissiveIntensity = 2.2;
    } else {
      // Normal
      materials.darkBody.wireframe = false;
      materials.goldFoil.wireframe = false;
      materials.solarCell.wireframe = false;
      materials.pcbSubstrate.wireframe = false;
      materials.copperTraces.emissiveIntensity = 0.7;
    }
  }, [viewMode]);

  // Handle component focus highlights
  useEffect(() => {
    const parts = partsRefs.current;
    if (!parts.esp32) return;

    // Reset scales
    if (parts.esp32) parts.esp32.scale.set(1, 1, 1);
    if (parts.solar) parts.solar.scale.set(1, 1, 1);
    if (parts.antenna) parts.antenna.scale.set(1, 1, 1);
    if (parts.thrusters) parts.thrusters.scale.set(1, 1, 1);

    if (activePart === 'esp32' && parts.esp32) {
      parts.esp32.scale.set(1.15, 1.15, 1.15);
    } else if (activePart === 'solar' && parts.solar) {
      parts.solar.scale.set(1.08, 1.08, 1.08);
    } else if (activePart === 'antenna' && parts.antenna) {
      parts.antenna.scale.set(1.2, 1.2, 1.2);
    } else if (activePart === 'thrusters' && parts.thrusters) {
      parts.thrusters.scale.set(1.2, 1.2, 1.2);
    }
  }, [activePart]);

  return (
    <div className="relative w-full h-[520px] lg:h-[640px] flex flex-col items-center justify-between select-none">
      
      {/* 3D Canvas Container */}
      <div className="relative w-full flex-1">
        {webGLSupported ? (
          <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl">
            <div className="w-20 h-20 rounded-full border-2 border-cyan-400/50 flex items-center justify-center mb-3 text-cyan-300">
              <span className="font-mono text-xl">🛰️</span>
            </div>
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-1">
              ORBITAL SATELLITE WITH ESP32
            </span>
            <p className="text-slate-400 text-xs max-w-xs font-mono">
              Equipped with Dual Solar Panels, Parabolic Radio Antenna, and Real-time Sensor Systems.
            </p>
          </div>
        )}

        {/* Floating Top Part Explorer Buttons (Simple everyday labels) */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="glass-panel px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-cyan-500/20 pointer-events-auto">
            <span>EXPLORE SATELLITE PARTS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1 glass-panel p-1 rounded-lg border border-cyan-500/20 pointer-events-auto">
            {[
              { id: 'all', label: 'ALL' },
              { id: 'esp32', label: 'ESP32 COMPUTER' },
              { id: 'solar', label: 'SOLAR WINGS' },
              { id: 'antenna', label: 'DISH ANTENNA' },
              { id: 'thrusters', label: 'THRUSTERS' }
            ].map((part) => (
              <button
                key={part.id}
                onClick={() => {
                  setActivePart(part.id);
                  sound.click();
                }}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
                  activePart === part.id
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-space-800'
                }`}
              >
                {part.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drag Hint Tag */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400 bg-space-950/70 px-2.5 py-1 rounded border border-cyan-500/20 pointer-events-none">
          👆 Click & Drag to Rotate 360°
        </div>
      </div>

      {/* Clear Plain-English Satellite Info Card at Bottom */}
      <div className="w-full px-3 py-2.5 bg-space-950/80 border-t border-cyan-500/20 rounded-b-2xl">
        <div className="flex items-start space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1 animate-pulse" />
          <p className="text-slate-200 text-xs font-sans leading-relaxed">
            <strong className="text-cyan-300 font-mono uppercase mr-1">
              {activePart.toUpperCase()}:
            </strong>
            {partExplanations[activePart]}
          </p>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />
    </div>
  );
}
