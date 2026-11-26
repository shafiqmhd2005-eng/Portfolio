import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';

/* ------------------------------------------------------------------
   Interactive 3D model of my ESP32 AI Voice Assistant.
   Textured enclosure + every internal module (ESP32 DevKit, INMP441
   mic, MAX98357A amp, SH1106 OLED, speaker, LED, wake button) wired
   exactly as in the circuit diagram, with live signal pulses.
------------------------------------------------------------------- */

const PARTS = [
  { id: 'all', label: 'ALL' },
  { id: 'esp32', label: 'ESP32' },
  { id: 'oled', label: 'OLED' },
  { id: 'mic', label: 'MIC' },
  { id: 'amp', label: 'AMP' },
  { id: 'speaker', label: 'SPEAKER' },
  { id: 'button', label: 'BUTTON' },
];

const PART_INFO = {
  all: 'AI Voice Assistant: a hand-built ESP32 smart speaker. Microphone in, Wi-Fi to the AI service, reply out through the amp and speaker, status on the OLED.',
  esp32: 'ESP32 DevKit (30-pin, WROOM): the brain. It runs the XiaoZhi firmware I compiled with ESP-IDF v6.1, records the mic over I²S, talks to the AI over Wi-Fi and streams the reply to the amp.',
  oled: 'SH1106 128×64 OLED over I²C (SDA → GPIO4, SCL → GPIO15). It shows the assistant face and status. I fixed a firmware bug that was loading the wrong SSD1306 driver.',
  mic: 'INMP441 digital MEMS microphone over I²S (SD → GPIO32, SCK → GPIO26, WS → GPIO25, L/R → GND). It captures your voice as clean digital audio.',
  amp: 'MAX98357A I²S class-D amplifier (LRC → GPIO33, DIN → GPIO27, BCLK → GPIO14). It turns the ESP32 digital audio straight into speaker power.',
  speaker: 'Full-range speaker driver wired only to the amplifier SPK+ / SPK− outputs. This is where the assistant’s voice comes out.',
  button: 'Side wake button on GPIO19 plus the front status LED on GPIO18 (through a 220 Ω resistor). Press to wake the assistant.',
};

const STATES = [
  { id: 'standby', label: 'STANDBY', dur: 2.6, caption: 'Waiting for the wake button…' },
  { id: 'listening', label: 'LISTENING', dur: 3.2, caption: 'Mic → ESP32 over I²S' },
  { id: 'thinking', label: 'THINKING', dur: 1.8, caption: 'ESP32 ⇄ AI service over Wi-Fi' },
  { id: 'speaking', label: 'SPEAKING', dur: 3.6, caption: 'ESP32 → MAX98357A → speaker' },
];
const CYCLE = STATES.reduce((a, s) => a + s.dur, 0);

const stateAt = (t) => {
  let x = t % CYCLE;
  for (let i = 0; i < STATES.length; i++) {
    if (x < STATES[i].dur) return { idx: i, local: x / STATES[i].dur };
    x -= STATES[i].dur;
  }
  return { idx: 0, local: 0 };
};

// Small procedural textures
const makeLeatherTexture = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#141416';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 5200; i++) {
    const v = 10 + Math.random() * 38;
    g.fillStyle = `rgb(${v},${v},${v + 2})`;
    const r = Math.random() * 2.4 + 0.4;
    g.beginPath();
    g.arc(Math.random() * 256, Math.random() * 256, r, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
};

const makePerfboardTexture = () => {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 384;
  const g = c.getContext('2d');
  g.fillStyle = '#1f5f3f';
  g.fillRect(0, 0, 256, 384);
  for (let x = 6; x < 256; x += 12) {
    for (let y = 6; y < 384; y += 12) {
      g.fillStyle = '#c58a3a';
      g.beginPath();
      g.arc(x, y, 3.6, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#0b1a12';
      g.beginPath();
      g.arc(x, y, 1.4, 0, Math.PI * 2);
      g.fill();
    }
  }
  return new THREE.CanvasTexture(c);
};

export default function VoiceAssistant3D({ heightClass = 'h-[520px] lg:h-[640px]' }) {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('xray'); // 'assembled' | 'xray' | 'exploded'
  const [activePart, setActivePart] = useState('all');
  const [assistantState, setAssistantState] = useState(0);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const viewModeRef = useRef(viewMode);
  const activePartRef = useRef(activePart);
  const selectPartRef = useRef(() => {});

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);
  useEffect(() => {
    activePartRef.current = activePart;
  }, [activePart]);

  selectPartRef.current = (id) => {
    setActivePart(id);
    if (id !== 'all' && id !== 'button' && viewModeRef.current === 'assembled') setViewMode('xray');
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    const disposables = [];
    const track = (o) => {
      disposables.push(o);
      return o;
    };

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lighting (same palette as the rest of the site)
    scene.add(new THREE.AmbientLight(0x1a2d4a, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 5, 6);
    scene.add(key);
    const cyanRim = new THREE.PointLight(0x00e5ff, 5, 18);
    cyanRim.position.set(4, 2, 3);
    scene.add(cyanRim);
    const purpleBack = new THREE.PointLight(0x8b5cf6, 4, 18);
    purpleBack.position.set(-4, -3, 2);
    scene.add(purpleBack);
    const bottom = new THREE.DirectionalLight(0x0284c7, 0.8);
    bottom.position.set(0, -5, -2);
    scene.add(bottom);

    const product = new THREE.Group();
    scene.add(product);

    // ---------- Materials ----------
    const leather = track(makeLeatherTexture());
    const perfTex = track(makePerfboardTexture());
    const M = {
      shell: new THREE.MeshStandardMaterial({ color: 0xffffff, map: leather, bumpMap: leather, bumpScale: 0.025, roughness: 0.85, metalness: 0.15, transparent: true }),
      trim: new THREE.MeshStandardMaterial({ color: 0xc9dced, roughness: 0.35, metalness: 0.35, emissive: 0x1d4f7a, emissiveIntensity: 0.25, transparent: true }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x1b1c1f, roughness: 0.55, metalness: 0.2 }),
      cone: new THREE.MeshStandardMaterial({ color: 0x2a2c31, roughness: 0.45, metalness: 0.35, side: THREE.DoubleSide }),
      magnet: new THREE.MeshStandardMaterial({ color: 0x8a94a6, roughness: 0.25, metalness: 0.9 }),
      perf: new THREE.MeshStandardMaterial({ map: perfTex, roughness: 0.6, metalness: 0.1 }),
      espPcb: new THREE.MeshStandardMaterial({ color: 0x0b2547, roughness: 0.4, metalness: 0.3 }),
      oledPcb: new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4, metalness: 0.25 }),
      micPcb: new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.4, metalness: 0.25 }),
      ampPcb: new THREE.MeshStandardMaterial({ color: 0x6d28d9, roughness: 0.4, metalness: 0.25 }),
      shield: new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.15, metalness: 0.95 }),
      chip: new THREE.MeshStandardMaterial({ color: 0x0f1115, roughness: 0.35, metalness: 0.5 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xffd34d, roughness: 0.15, metalness: 0.95 }),
      header: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 }),
      terminal: new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.5 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x05070a, roughness: 0.05, metalness: 0.6 }),
      ledAmber: new THREE.MeshBasicMaterial({ color: 0xffc847 }),
      espLed: new THREE.MeshBasicMaterial({ color: 0xff3b3b }),
      pulse: new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true }),
      edge: new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0 }),
      waveRing: new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
      micRing: new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
    };
    Object.values(M).forEach(track);

    const box = (w, h, d, mat) => new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), mat);
    const cyl = (rt, rb, h, mat, seg = 24) => new THREE.Mesh(track(new THREE.CylinderGeometry(rt, rb, h, seg)), mat);

    // ---------- Dimensions ----------
    const W = 1.6, H = 2.4, D = 1.3, T = 0.07;
    const SPK = { x: -0.24, y: -0.5, r: 0.5 };
    const OLED = { x: 0.06, y: 0.5, w: 0.66, h: 0.48 };
    const LED = { x: -0.06, y: 0.02 };

    const partGroups = {};
    const shellPanels = [];
    const edgeLines = [];

    const makePanel = (geo, basePos, explodeDir) => {
      const g = new THREE.Group();
      const mesh = new THREE.Mesh(geo, M.shell);
      g.add(mesh);
      const edges = new THREE.LineSegments(track(new THREE.EdgesGeometry(geo, 30)), M.edge);
      g.add(edges);
      edgeLines.push(edges);
      g.position.copy(basePos);
      g.userData = { base: basePos.clone(), dir: explodeDir };
      shellPanels.push(g);
      product.add(g);
      return g;
    };

    // Front panel with cut-outs for OLED window, speaker and LED
    const frontShape = new THREE.Shape();
    frontShape.moveTo(-W / 2, -H / 2);
    frontShape.lineTo(W / 2, -H / 2);
    frontShape.lineTo(W / 2, H / 2);
    frontShape.lineTo(-W / 2, H / 2);
    frontShape.lineTo(-W / 2, -H / 2);
    const oledHole = new THREE.Path();
    oledHole.moveTo(OLED.x - OLED.w / 2, OLED.y - OLED.h / 2);
    oledHole.lineTo(OLED.x + OLED.w / 2, OLED.y - OLED.h / 2);
    oledHole.lineTo(OLED.x + OLED.w / 2, OLED.y + OLED.h / 2);
    oledHole.lineTo(OLED.x - OLED.w / 2, OLED.y + OLED.h / 2);
    oledHole.lineTo(OLED.x - OLED.w / 2, OLED.y - OLED.h / 2);
    const spkHole = new THREE.Path();
    spkHole.absarc(SPK.x, SPK.y, SPK.r - 0.04, 0, Math.PI * 2, true);
    const ledHole = new THREE.Path();
    ledHole.moveTo(LED.x - 0.05, LED.y - 0.05);
    ledHole.lineTo(LED.x + 0.05, LED.y - 0.05);
    ledHole.lineTo(LED.x + 0.05, LED.y + 0.05);
    ledHole.lineTo(LED.x - 0.05, LED.y + 0.05);
    ledHole.lineTo(LED.x - 0.05, LED.y - 0.05);
    frontShape.holes.push(oledHole, spkHole, ledHole);
    const frontGeo = track(new THREE.ExtrudeGeometry(frontShape, { depth: T, bevelEnabled: false, curveSegments: 48 }));
    frontGeo.translate(0, 0, -T / 2);
    const front = makePanel(frontGeo, new THREE.Vector3(0, 0, D / 2 - T / 2), new THREE.Vector3(0, 0.15, 1.35));
    makePanel(track(new THREE.BoxGeometry(W, H, T)), new THREE.Vector3(0, 0, -D / 2 + T / 2), new THREE.Vector3(0, 0, -1.1));
    makePanel(track(new THREE.BoxGeometry(T, H, D - 2 * T)), new THREE.Vector3(-W / 2 + T / 2, 0, 0), new THREE.Vector3(-1.0, 0, 0));
    const right = makePanel(track(new THREE.BoxGeometry(T, H, D - 2 * T)), new THREE.Vector3(W / 2 - T / 2, 0, 0), new THREE.Vector3(1.0, 0, 0));
    const top = makePanel(track(new THREE.BoxGeometry(W + 0.04, T + 0.02, D + 0.04)), new THREE.Vector3(0, H / 2 + 0.01, 0), new THREE.Vector3(0, 1.0, 0));
    makePanel(track(new THREE.BoxGeometry(W - 2 * T, T, D - 2 * T)), new THREE.Vector3(0, -H / 2 + T / 2, 0), new THREE.Vector3(0, -1.0, 0));

    // Blue-white trim bands (like the real enclosure seams)
    const trimBand = (parent, y) => {
      const f = box(W + 0.03, 0.045, 0.03, M.trim);
      f.position.set(0, y, T / 2 + 0.012);
      parent.add(f);
    };
    trimBand(front, H / 2 - 0.06);
    trimBand(front, -H / 2 + 0.06);
    [-1, 1].forEach((s) => {
      const v = box(0.035, H - 0.1, 0.035, M.trim);
      v.position.set(s * (W / 2 + 0.005), 0, T / 2 + 0.005);
      front.add(v);
    });
    const topTrim = box(W + 0.07, 0.03, D + 0.07, M.trim);
    topTrim.position.y = -T / 2;
    top.add(topTrim);

    // ---------- Speaker ----------
    const speaker = new THREE.Group();
    speaker.userData.part = 'speaker';
    const flange = new THREE.Mesh(track(new THREE.TorusGeometry(SPK.r - 0.02, 0.06, 16, 64)), M.rubber);
    flange.position.z = 0.02;
    speaker.add(flange);
    const surround = new THREE.Mesh(track(new THREE.TorusGeometry(SPK.r - 0.11, 0.045, 16, 64)), M.rubber);
    surround.position.z = -0.03;
    speaker.add(surround);
    const coneProfile = [];
    for (let i = 0; i <= 12; i++) {
      const r = 0.08 + (SPK.r - 0.2) * (i / 12);
      coneProfile.push(new THREE.Vector2(r, -0.22 + 0.2 * Math.pow(i / 12, 0.7)));
    }
    const coneGeo = track(new THREE.LatheGeometry(coneProfile, 48));
    coneGeo.rotateX(Math.PI / 2);
    const cone = new THREE.Mesh(coneGeo, M.cone);
    const coneGroup = new THREE.Group();
    coneGroup.add(cone);
    const dust = new THREE.Mesh(track(new THREE.SphereGeometry(0.1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2)), M.cone);
    dust.rotation.x = Math.PI / 2;
    dust.position.z = -0.21;
    coneGroup.add(dust);
    speaker.add(coneGroup);
    const basketMat = track(new THREE.MeshStandardMaterial({ color: 0x0f1115, roughness: 0.4, metalness: 0.5, side: THREE.DoubleSide }));
    const basket = new THREE.Mesh(track(new THREE.CylinderGeometry(SPK.r - 0.1, 0.2, 0.22, 32, 1, true)), basketMat);
    basket.rotation.x = Math.PI / 2;
    basket.position.z = -0.15;
    speaker.add(basket);
    const magnet = cyl(0.2, 0.2, 0.16, M.magnet, 32);
    magnet.rotation.x = Math.PI / 2;
    magnet.position.z = -0.34;
    speaker.add(magnet);
    speaker.userData.base = new THREE.Vector3(SPK.x, SPK.y, D / 2);
    speaker.userData.dir = new THREE.Vector3(-0.1, -0.15, 0.8);
    speaker.position.copy(speaker.userData.base);
    product.add(speaker);
    partGroups.speaker = speaker;

    // Sound wave rings during "speaking"
    const waveRings = [0, 1, 2].map(() => {
      const m = new THREE.Mesh(track(new THREE.RingGeometry(0.46, 0.5, 64)), M.waveRing.clone());
      track(m.material);
      speaker.add(m);
      return m;
    });

    // ---------- OLED module ----------
    const oledCanvas = document.createElement('canvas');
    oledCanvas.width = 256;
    oledCanvas.height = 128;
    const og = oledCanvas.getContext('2d');
    const oledTex = track(new THREE.CanvasTexture(oledCanvas));
    const oledScreenMat = track(new THREE.MeshBasicMaterial({ map: oledTex }));

    const oled = new THREE.Group();
    oled.userData.part = 'oled';
    const oPcb = box(0.74, 0.62, 0.03, M.oledPcb);
    oled.add(oPcb);
    const oGlass = box(0.66, 0.4, 0.03, M.glass);
    oGlass.position.set(0, -0.02, 0.03);
    oled.add(oGlass);
    const oScreen = new THREE.Mesh(track(new THREE.PlaneGeometry(0.6, 0.3)), oledScreenMat);
    oScreen.position.set(0, -0.02, 0.047);
    oled.add(oScreen);
    for (let i = 0; i < 4; i++) {
      const pin = box(0.03, 0.03, 0.08, M.gold);
      pin.position.set(-0.12 + i * 0.08, 0.27, -0.05);
      oled.add(pin);
    }
    oled.userData.base = new THREE.Vector3(OLED.x, OLED.y, D / 2 - T - 0.05);
    oled.userData.dir = new THREE.Vector3(0, 0.25, 0.65);
    oled.position.copy(oled.userData.base);
    product.add(oled);
    partGroups.oled = oled;

    // Front status LED
    const ledGroup = new THREE.Group();
    const ledMesh = box(0.08, 0.08, 0.06, M.ledAmber);
    ledGroup.add(ledMesh);
    const ledLight = new THREE.PointLight(0xffc847, 0.6, 1.2);
    ledLight.position.z = 0.15;
    ledGroup.add(ledLight);
    ledGroup.userData.base = new THREE.Vector3(LED.x, LED.y, D / 2 - T / 2);
    ledGroup.userData.dir = new THREE.Vector3(0, 0, 0.5);
    ledGroup.position.copy(ledGroup.userData.base);
    product.add(ledGroup);

    // ---------- Internal perfboard + modules ----------
    const board = new THREE.Group();
    const perf = box(1.36, 2.1, 0.04, M.perf);
    board.add(perf);
    board.userData.base = new THREE.Vector3(0, -0.02, -0.33);
    board.userData.dir = new THREE.Vector3(0, 0, -0.35);
    board.position.copy(board.userData.base);
    product.add(board);

    // ESP32 DevKit
    const esp = new THREE.Group();
    esp.userData.part = 'esp32';
    esp.add(box(0.52, 1.16, 0.04, M.espPcb));
    const antenna = box(0.38, 0.16, 0.045, M.espPcb);
    antenna.position.set(0, 0.47, 0.03);
    esp.add(antenna);
    const shieldCan = box(0.36, 0.42, 0.06, M.shield);
    shieldCan.position.set(0, 0.17, 0.05);
    esp.add(shieldCan);
    for (let i = 0; i < 6; i++) {
      const tr = box(0.02, 0.1, 0.005, M.gold);
      tr.position.set(-0.15 + i * 0.06, 0.47, 0.055);
      esp.add(tr);
    }
    const usb = box(0.16, 0.1, 0.06, M.shield);
    usb.position.set(0, -0.56, 0.05);
    esp.add(usb);
    const cp2102 = box(0.12, 0.12, 0.03, M.chip);
    cp2102.position.set(0, -0.3, 0.035);
    esp.add(cp2102);
    [-0.13, 0.13].forEach((x) => {
      const btn = box(0.07, 0.05, 0.04, M.shield);
      btn.position.set(x, -0.48, 0.04);
      esp.add(btn);
    });
    const espLed = box(0.03, 0.03, 0.02, M.espLed);
    espLed.position.set(0.15, -0.2, 0.035);
    esp.add(espLed);
    const pinY = (i) => 0.46 - i * 0.065;
    [-0.22, 0.22].forEach((x) => {
      const strip = box(0.06, 0.98, 0.06, M.header);
      strip.position.set(x, -0.0, 0.05);
      esp.add(strip);
      for (let i = 0; i < 15; i++) {
        const p = box(0.016, 0.016, 0.1, M.gold);
        p.position.set(x, pinY(i), 0.1);
        esp.add(p);
      }
    });
    esp.userData.base = new THREE.Vector3(0.32, 0.12, 0.08);
    esp.userData.dir = new THREE.Vector3(0.15, 0, 0.25);
    esp.position.copy(esp.userData.base);
    board.add(esp);
    partGroups.esp32 = esp;

    // INMP441 microphone
    const mic = new THREE.Group();
    mic.userData.part = 'mic';
    const micPcb = cyl(0.15, 0.15, 0.03, M.micPcb, 32);
    micPcb.rotation.x = Math.PI / 2;
    mic.add(micPcb);
    const micCan = box(0.1, 0.07, 0.04, M.shield);
    micCan.position.z = 0.03;
    mic.add(micCan);
    for (let i = 0; i < 3; i++) {
      const p = box(0.02, 0.02, 0.06, M.gold);
      p.position.set(-0.06 + i * 0.06, -0.11, 0.03);
      mic.add(p);
    }
    const micRings = [0, 1].map(() => {
      const m = new THREE.Mesh(track(new THREE.RingGeometry(0.1, 0.12, 48)), M.micRing.clone());
      track(m.material);
      m.position.z = 0.05;
      mic.add(m);
      return m;
    });
    mic.userData.base = new THREE.Vector3(-0.38, 0.72, 0.05);
    mic.userData.dir = new THREE.Vector3(-0.2, 0.15, 0.4);
    mic.position.copy(mic.userData.base);
    board.add(mic);
    partGroups.mic = mic;

    // MAX98357A amplifier
    const amp = new THREE.Group();
    amp.userData.part = 'amp';
    amp.add(box(0.34, 0.32, 0.03, M.ampPcb));
    const ampChip = box(0.1, 0.1, 0.03, M.chip);
    ampChip.position.set(0, 0.03, 0.03);
    amp.add(ampChip);
    const term = box(0.22, 0.09, 0.1, M.terminal);
    term.position.set(0, -0.11, 0.06);
    amp.add(term);
    for (let i = 0; i < 7; i++) {
      const p = box(0.018, 0.018, 0.06, M.gold);
      p.position.set(-0.135 + i * 0.045, 0.13, 0.035);
      amp.add(p);
    }
    amp.userData.base = new THREE.Vector3(-0.36, 0.2, 0.05);
    amp.userData.dir = new THREE.Vector3(-0.25, 0, 0.35);
    amp.position.copy(amp.userData.base);
    board.add(amp);
    partGroups.amp = amp;

    // Side wake button (mounted on right panel)
    const buttonGroup = new THREE.Group();
    buttonGroup.userData.part = 'button';
    const bBase = box(0.05, 0.22, 0.22, M.chip);
    buttonGroup.add(bBase);
    const bRing = box(0.03, 0.17, 0.17, M.gold);
    bRing.position.x = 0.03;
    buttonGroup.add(bRing);
    const bCap = cyl(0.065, 0.065, 0.08, M.rubber, 24);
    bCap.rotation.z = Math.PI / 2;
    bCap.position.x = 0.07;
    buttonGroup.add(bCap);
    buttonGroup.position.set(T / 2 + 0.02, 0.5, 0.1);
    right.add(buttonGroup);
    partGroups.button = buttonGroup;
    // LED is part of the "button" (user I/O) group for highlighting
    ledGroup.userData.part = 'button';

    // ---------- Wires (from the circuit diagram) ----------
    // anchor = [group, localOffset]
    const espPin = (side, i) => [esp, new THREE.Vector3(side === 'L' ? -0.22 : 0.22, pinY(i), 0.15)];
    const A = {
      e3v3: espPin('L', 0), eGnd: espPin('L', 1), e15: espPin('L', 2), e4: espPin('L', 3),
      e14: espPin('L', 7), e27: espPin('L', 8), e26: espPin('L', 9), e25: espPin('L', 10),
      e33: espPin('L', 11), e32: espPin('L', 12), e19: espPin('R', 7), e18: espPin('R', 8),
      oVcc: [oled, new THREE.Vector3(-0.12, 0.27, -0.09)], oGnd: [oled, new THREE.Vector3(-0.04, 0.27, -0.09)],
      oScl: [oled, new THREE.Vector3(0.04, 0.27, -0.09)], oSda: [oled, new THREE.Vector3(0.12, 0.27, -0.09)],
      mSd: [mic, new THREE.Vector3(-0.06, -0.11, 0.06)], mSck: [mic, new THREE.Vector3(0, -0.11, 0.06)], mWs: [mic, new THREE.Vector3(0.06, -0.11, 0.06)],
      aLrc: [amp, new THREE.Vector3(-0.135, 0.13, 0.065)], aBclk: [amp, new THREE.Vector3(-0.09, 0.13, 0.065)], aDin: [amp, new THREE.Vector3(-0.045, 0.13, 0.065)],
      aVin: [amp, new THREE.Vector3(0.09, 0.13, 0.065)], aGnd: [amp, new THREE.Vector3(0.135, 0.13, 0.065)],
      aSpkP: [amp, new THREE.Vector3(-0.06, -0.11, 0.11)], aSpkN: [amp, new THREE.Vector3(0.06, -0.11, 0.11)],
      sP: [speaker, new THREE.Vector3(-0.08, 0.12, -0.38)], sN: [speaker, new THREE.Vector3(0.08, 0.12, -0.38)],
      led: [ledGroup, new THREE.Vector3(0, 0, -0.05)],
      btn: [buttonGroup, new THREE.Vector3(-0.03, 0, 0)],
    };
    const RED = 0xef4444, GRAY = 0x64748b, YEL = 0xf5b942, BLUE = 0x3b82f6, GRN = 0x10b981, PUR = 0xa855f7, ORG = 0xfb923c;
    const wireDefs = [
      // OLED (I²C) — signals ESP → OLED
      { a: 'e4', b: 'oSda', c: BLUE, part: 'oled', sig: true, st: [0, 1, 2, 3] },
      { a: 'e15', b: 'oScl', c: YEL, part: 'oled', sig: true, st: [0, 1, 2, 3] },
      { a: 'e3v3', b: 'oVcc', c: RED, part: 'oled' },
      { a: 'eGnd', b: 'oGnd', c: GRAY, part: 'oled' },
      // Mic (I²S in) — signal Mic → ESP
      { a: 'mSd', b: 'e32', c: YEL, part: 'mic', sig: true, st: [1] },
      { a: 'e26', b: 'mSck', c: BLUE, part: 'mic', sig: true, st: [1] },
      { a: 'e25', b: 'mWs', c: GRN, part: 'mic', sig: true, st: [1] },
      // Amp (I²S out) — ESP → Amp
      { a: 'e33', b: 'aLrc', c: PUR, part: 'amp', sig: true, st: [3] },
      { a: 'e27', b: 'aDin', c: GRN, part: 'amp', sig: true, st: [3] },
      { a: 'e14', b: 'aBclk', c: BLUE, part: 'amp', sig: true, st: [3] },
      { a: 'e3v3', b: 'aVin', c: RED, part: 'amp' },
      { a: 'eGnd', b: 'aGnd', c: GRAY, part: 'amp' },
      // Speaker — Amp → Speaker
      { a: 'aSpkP', b: 'sP', c: RED, part: 'speaker', sig: true, st: [3] },
      { a: 'aSpkN', b: 'sN', c: GRAY, part: 'speaker' },
      // LED and button
      { a: 'e18', b: 'led', c: ORG, part: 'button', sig: true, st: [0, 1, 2, 3] },
      { a: 'btn', b: 'e19', c: PUR, part: 'button', sig: true, st: [0] },
    ];

    const anchorPos = ([grp, off]) => {
      // Compose matrices from grp up to product
      const p = off.clone();
      let o = grp;
      while (o && o !== product) {
        o.updateMatrix();
        p.applyMatrix4(o.matrix);
        o = o.parent;
      }
      return p;
    };

    const pulseGeo = track(new THREE.SphereGeometry(0.028, 10, 8));
    const wires = wireDefs.map((w, i) => {
      const mat = track(new THREE.MeshStandardMaterial({ color: w.c, roughness: 0.45, metalness: 0.1, emissive: w.c, emissiveIntensity: 0.15 }));
      const mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
      product.add(mesh);
      const pulses = [];
      if (w.sig) {
        for (let k = 0; k < 2; k++) {
          const pm = track(M.pulse.clone());
          pm.color.setHex(w.c).lerp(new THREE.Color(0xffffff), 0.45);
          const s = new THREE.Mesh(pulseGeo, pm);
          s.visible = false;
          product.add(s);
          pulses.push(s);
        }
      }
      return { ...w, mesh, mat, pulses, curve: null, seed: i * 0.37 };
    });

    const rebuildWires = () => {
      wires.forEach((w) => {
        const a = anchorPos(A[w.a]);
        const b = anchorPos(A[w.b]);
        const mid = a.clone().lerp(b, 0.5);
        const lift = 0.14 + (w.seed % 0.12);
        mid.z = Math.max(a.z, b.z) + lift;
        mid.x += Math.sin(w.seed * 7) * 0.06;
        const curve = new THREE.CatmullRomCurve3([
          a,
          a.clone().add(new THREE.Vector3(0, 0, 0.08)),
          mid,
          b.clone().add(new THREE.Vector3(0, 0, 0.08)),
          b,
        ], false, 'centripetal');
        w.curve = curve;
        if (w.mesh.geometry) w.mesh.geometry.dispose();
        w.mesh.geometry = new THREE.TubeGeometry(curve, 32, 0.012, 6, false);
      });
    };

    // ---------- Highlight frame ----------
    const selBox = new THREE.Box3Helper(new THREE.Box3(), 0x00e5ff);
    selBox.material.transparent = true;
    selBox.material.opacity = 0.9;
    scene.add(selBox);
    track(selBox.geometry);
    track(selBox.material);

    // ---------- Orbital rings + particle halo (same as previous hero) ----------
    const ringMat1 = track(new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.25 }));
    const ring1 = new THREE.Mesh(track(new THREE.RingGeometry(2.6, 2.63, 64)), ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    scene.add(ring1);
    const ringMat2 = track(new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.25 }));
    const ring2 = new THREE.Mesh(track(new THREE.RingGeometry(3.0, 3.03, 64)), ringMat2);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    const particleCount = 140;
    const particleGeo = track(new THREE.BufferGeometry());
    const pp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * Math.PI;
      const r = 2.6 + Math.random() * 1.8;
      pp[i] = r * Math.cos(th) * Math.cos(ph);
      pp[i + 1] = r * Math.sin(ph);
      pp[i + 2] = r * Math.sin(th) * Math.cos(ph);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    const particleMat = track(new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.04, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending }));
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---------- OLED drawing ----------
    const drawOled = (t, sIdx, local) => {
      const fg = '#c9f6ff';
      og.fillStyle = '#000';
      og.fillRect(0, 0, 256, 128);
      og.fillStyle = fg;
      og.strokeStyle = fg;
      og.font = 'bold 14px monospace';
      og.textBaseline = 'top';
      og.fillText(STATES[sIdx].label, 6, 4);
      // wifi icon
      og.lineWidth = 2;
      for (let i = 1; i <= 3; i++) {
        og.beginPath();
        og.arc(236, 20, i * 5, Math.PI * 1.25, Math.PI * 1.75);
        og.stroke();
      }
      og.fillRect(206, 8, 3, 12);
      og.fillRect(201, 12, 3, 8);
      og.fillRect(211, 4, 3, 16);
      og.fillRect(0, 24, 256, 2);

      if (sIdx === 0) {
        // Face with blinking eyes
        const blink = (t % 2.4) < 0.12 ? 3 : 26;
        og.fillRect(72, 66 - blink / 2, 30, blink);
        og.fillRect(154, 66 - blink / 2, 30, blink);
        og.beginPath();
        og.arc(128, 96, 14, 0.15 * Math.PI, 0.85 * Math.PI);
        og.stroke();
      } else if (sIdx === 1) {
        // Mic level bars
        for (let i = 0; i < 24; i++) {
          const h = 6 + Math.abs(Math.sin(t * 9 + i * 0.7) * Math.cos(t * 3.3 + i * 0.3)) * 70;
          og.fillRect(14 + i * 10, 80 - h / 2, 6, h);
        }
      } else if (sIdx === 2) {
        // Thinking dots
        for (let i = 0; i < 3; i++) {
          const a = Math.max(0, Math.sin(t * 6 - i * 0.9));
          const r = 7 + a * 6;
          og.beginPath();
          og.arc(92 + i * 36, 74, r, 0, Math.PI * 2);
          og.fill();
        }
      } else {
        // Speaking waveform + eyes
        og.fillRect(78, 42, 26, 16);
        og.fillRect(152, 42, 26, 16);
        og.beginPath();
        for (let x = 0; x <= 256; x += 4) {
          const y = 96 + Math.sin(x * 0.08 + t * 14) * 14 * Math.sin(x * 0.012 + t * 2) * (0.6 + 0.4 * Math.sin(t * 5));
          if (x === 0) og.moveTo(x, y);
          else og.lineTo(x, y);
        }
        og.stroke();
      }
      // progress bar
      og.fillRect(0, 124, 256 * local, 3);
      oledTex.needsUpdate = true;
    };

    // ---------- Interaction ----------
    let targetRX = 0.15, targetRY = -0.55, curRX = 0.15, curRY = -0.55;
    let mouseX = 0, mouseY = 0, lastX = 0, lastY = 0, downX = 0, downY = 0;
    let dragging = false;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    const onDown = (e) => {
      dragging = true;
      lastX = downX = e.clientX;
      lastY = downY = e.clientY;
    };
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (dragging) {
        targetRY += (e.clientX - lastX) * 0.01;
        targetRX += (e.clientY - lastY) * 0.01;
        targetRX = Math.max(-1.2, Math.min(1.2, targetRX));
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onUp = (e) => {
      if (!dragging) return;
      dragging = false;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 5) {
        const rect = container.getBoundingClientRect();
        ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -(((e.clientY - rect.top) / rect.height) * 2 - 1));
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(product.children, true);
        const shellOpaque = viewModeRef.current === 'assembled';
        for (const h of hits) {
          let o = h.object;
          if (o.type === 'LineSegments' || !o.visible) continue;
          let part = null;
          while (o && o !== product) {
            if (o.userData.part) { part = o.userData.part; break; }
            o = o.parent;
          }
          const isShell = h.object.material === M.shell || h.object.material === M.trim;
          if (isShell && !shellOpaque) continue; // see-through shell: click passes through
          sound.click();
          selectPartRef.current(part || 'all');
          return;
        }
        sound.click();
        selectPartRef.current('all');
      }
    };
    container.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ---------- Animation ----------
    const clock = new THREE.Clock();
    let animId;
    let explode = 0, lastExplode = -1, shellOpacity = 1, lastStateIdx = -1, frame = 0;
    const lastScales = {};
    const allMoving = [...shellPanels, speaker, oled, ledGroup, board, esp, mic, amp];

    const animate = () => {
      const t = clock.getElapsedTime();
      frame++;
      const mode = viewModeRef.current;
      const part = activePartRef.current;

      if (!dragging) {
        targetRY += 0.003 + mouseX * 0.002;
        targetRX += ((0.15 + Math.sin(t * 0.6) * 0.08 + mouseY * 0.15) - targetRX) * 0.02;
      }
      curRX += (targetRX - curRX) * 0.06;
      curRY += (targetRY - curRY) * 0.06;
      product.rotation.x = curRX;
      product.rotation.y = curRY;
      product.position.y = Math.sin(t * 1.3) * 0.1;

      // Explode / x-ray transitions
      const targetExplode = mode === 'exploded' ? 1 : 0;
      explode += (targetExplode - explode) * 0.07;
      if (Math.abs(targetExplode - explode) < 0.0005) explode = targetExplode;
      const targetOpacity = mode === 'assembled' ? 1 : mode === 'xray' ? 0.13 : 0.32;
      shellOpacity += (targetOpacity - shellOpacity) * 0.08;
      M.shell.opacity = shellOpacity;
      M.trim.opacity = Math.min(1, shellOpacity + 0.2);
      M.shell.depthWrite = shellOpacity > 0.9;
      M.trim.depthWrite = shellOpacity > 0.9;
      M.edge.opacity = (1 - shellOpacity) * 0.7;

      allMoving.forEach((g) => {
        if (!g.userData.base) return;
        g.position.copy(g.userData.base).addScaledVector(g.userData.dir, explode);
      });

      // Part highlight scale
      let scalesChanged = false;
      Object.entries(partGroups).forEach(([id, g]) => {
        const target = part === id ? 1.12 : 1;
        const cur = g.scale.x + (target - g.scale.x) * 0.15;
        g.scale.setScalar(cur);
        if (Math.abs((lastScales[id] || 1) - cur) > 0.0005) scalesChanged = true;
        lastScales[id] = cur;
      });

      // Assistant state machine
      const { idx: sIdx, local } = stateAt(t);
      if (sIdx !== lastStateIdx) {
        lastStateIdx = sIdx;
        setAssistantState(sIdx);
      }

      if (Math.abs(explode - lastExplode) > 0.0005 || scalesChanged || frame < 3) {
        rebuildWires();
        lastExplode = explode;
      }

      // Signal pulses along active wires
      wires.forEach((w) => {
        const active = w.st && w.st.includes(sIdx);
        const focus = part === 'all' || part === w.part;
        w.mat.emissiveIntensity = part === w.part ? 0.8 : active ? 0.35 : 0.12;
        w.pulses.forEach((p, k) => {
          p.visible = !!(active && focus && w.curve);
          if (!p.visible) return;
          const speed = sIdx === 3 || sIdx === 1 ? 0.9 : 0.4;
          const u = (t * speed + k * 0.5 + w.seed) % 1;
          p.position.copy(w.curve.getPointAt(u));
        });
      });

      // Speaker cone + sound waves
      const speaking = sIdx === 3;
      const amp01 = speaking ? Math.abs(Math.sin(t * 22) * Math.sin(t * 3.1)) : 0;
      coneGroup.position.z = amp01 * 0.035;
      waveRings.forEach((r, i) => {
        const ph = (t * 0.9 + i / 3) % 1;
        r.scale.setScalar(1 + ph * 1.4);
        r.position.z = 0.06 + ph * 0.5;
        r.material.opacity = speaking ? (1 - ph) * 0.55 : 0;
      });

      // Mic ripples while listening
      micRings.forEach((r, i) => {
        const ph = (t * 1.2 + i * 0.5) % 1;
        r.scale.setScalar(1 + ph * 2.2);
        r.material.opacity = sIdx === 1 ? (1 - ph) * 0.8 : 0;
      });

      // LED colour by state
      const ledColors = [0xffc847, 0x22c55e, 0xa855f7, 0x00e5ff];
      const pulse = 0.55 + Math.sin(t * (sIdx === 2 ? 12 : 5)) * 0.45;
      M.ledAmber.color.setHex(ledColors[sIdx]).multiplyScalar(0.4 + pulse * 0.6);
      ledLight.color.setHex(ledColors[sIdx]);
      ledLight.intensity = 0.3 + pulse * 0.9;
      M.espLed.color.setHSL(0, 1, 0.35 + Math.sin(t * 8) * 0.15);

      if (frame % 2 === 0) drawOled(t, sIdx, local);

      // Selection frame
      if (part !== 'all' && partGroups[part]) {
        selBox.visible = true;
        selBox.box.setFromObject(partGroups[part]);
        selBox.box.expandByScalar(0.04);
        selBox.material.opacity = 0.6 + Math.sin(t * 6) * 0.3;
      } else {
        selBox.visible = false;
      }

      ring1.rotation.z = t * 0.08;
      ring2.rotation.z = -t * 0.12;
      particles.rotation.y = -t * 0.04;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      container.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      wires.forEach((w) => w.mesh.geometry && w.mesh.geometry.dispose());
      disposables.forEach((d) => d && d.dispose && d.dispose());
      if (renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const st = STATES[assistantState];
  const stColor = ['text-amber-300', 'text-emerald-300', 'text-purple-300', 'text-cyan-300'][assistantState];
  const stDot = ['bg-amber-400', 'bg-emerald-400', 'bg-purple-400', 'bg-cyan-400'][assistantState];

  return (
    <div className={`relative w-full ${heightClass} flex flex-col items-center justify-between select-none`}>
      <div className="relative w-full flex-1">
        {webGLSupported ? (
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <img
              src="/projects/voice-assistant/product.jpg"
              alt="AI Voice Assistant product"
              className="max-h-[80%] rounded-xl border border-cyan-500/30"
            />
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mt-3">
              ESP32 AI VOICE ASSISTANT
            </span>
          </div>
        )}

        {/* Part explorer */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="glass-panel px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-cyan-500/20 pointer-events-auto">
            EXPLORE THE PARTS:
          </div>
          <div className="flex flex-wrap items-center gap-1 glass-panel p-1 rounded-lg border border-cyan-500/20 pointer-events-auto">
            {PARTS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  selectPartRef.current(p.id);
                  sound.click();
                }}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
                  activePart === p.id
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-space-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live assistant state */}
        <div className="absolute top-14 left-3 glass-panel px-3 py-1.5 rounded-lg border border-cyan-500/20 font-mono text-[10px] pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${stDot} animate-pulse`} />
            <span className={`font-bold ${stColor}`}>{st.label}</span>
          </div>
          <div className="text-slate-400 mt-0.5">{st.caption}</div>
        </div>

        {/* View mode */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 glass-panel p-1 rounded-lg border border-cyan-500/20">
          {[
            { id: 'assembled', label: 'PRODUCT' },
            { id: 'xray', label: 'X-RAY' },
            { id: 'exploded', label: 'EXPLODED' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setViewMode(m.id);
                sound.click();
              }}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
                viewMode === m.id
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-space-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400 bg-space-950/70 px-2.5 py-1 rounded border border-cyan-500/20 pointer-events-none hidden sm:block">
          👆 Drag to rotate · Click a part
        </div>
      </div>

      <div className="w-full px-3 py-2.5 bg-space-950/80 border-t border-cyan-500/20 rounded-b-2xl">
        <div className="flex items-start space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1 animate-pulse" />
          <p className="text-slate-200 text-xs font-sans leading-relaxed">
            <strong className="text-cyan-300 font-mono uppercase mr-1">
              {PARTS.find((p) => p.id === activePart)?.label}:
            </strong>
            {PART_INFO[activePart]}
          </p>
        </div>
      </div>

      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />
    </div>
  );
}
