import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  X,
  Camera,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Sun,
  Sunset,
  Eye,
  Info,
  Calendar,
  Compass,
  Download,
  CheckCircle2,
  HelpCircle,
  Move,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { TourItem } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface ArTemplePreviewModalProps {
  isOpen: boolean;
  tour: TourItem | null;
  onClose: () => void;
  onBookTour?: (tour: TourItem) => void;
}

type ModelType = 'karnak-hall' | 'nefertari-shrine' | 'royal-balloon' | 'nile-felucca';

interface ModelInfo {
  id: ModelType;
  name: string;
  arabicName: string;
  category: string;
  realHeight: string;
  material: string;
  period: string;
  description: string;
}

const AR_MODELS: Record<ModelType, ModelInfo> = {
  'karnak-hall': {
    id: 'karnak-hall',
    name: 'Karnak Great Hypostyle Hall',
    arabicName: 'صالة الأعمدة الكبرى بالكرنك',
    category: 'Sacred Architecture',
    realHeight: '21 meters (69 ft)',
    material: 'Nubian Sandstone & Gold Electrum',
    period: '19th Dynasty • Pharaoh Seti I & Ramses II',
    description: '134 colossal sandstone columns arranged in 16 rows, representing the primeval papyrus marsh at creation.',
  },
  'nefertari-shrine': {
    id: 'nefertari-shrine',
    name: 'Nefertari Valley of Queens Sanctuary',
    arabicName: 'مقصورة الملكة نفرتاري الملكية',
    category: 'Royal Tomb Architecture',
    realHeight: '4.8 meters (15.7 ft)',
    material: 'Carved Limestone, Stucco & Egyptian Gold',
    period: '19th Dynasty • c. 1255 BC',
    description: 'Vivid vaulted ceiling of celestial stars with protective Anubis guardians and Hathor column reliefs.',
  },
  'royal-balloon': {
    id: 'royal-balloon',
    name: 'Royal Theban Hot Air Balloon',
    arabicName: 'منطاد طيبة الملكي الطائر',
    category: 'Aerial Exploration',
    realHeight: '26 meters (85 ft)',
    material: 'Ripstop Aeronautic Fabric & Rattan Basket',
    period: 'Modern Theban Sunrise Expedition',
    description: 'Scale 3D hot air balloon with active burner illumination and royal hieroglyphic chevron envelope.',
  },
  'nile-felucca': {
    id: 'nile-felucca',
    name: 'Sacred Nile Felucca & Lateen Sail',
    arabicName: 'فلوكة النيل الملكية ذات الشراع',
    category: 'Nile Navigation',
    realHeight: '14 meters mast (46 ft)',
    material: 'Egyptian Teak Wood & Natural Cotton Canvas',
    period: 'Eternal Pharaonic River Tradition',
    description: 'Traditional Egyptian sailing vessel that has navigated the Nile since the reign of the Pharaohs.',
  },
};

export const ArTemplePreviewModal: React.FC<ArTemplePreviewModalProps> = ({
  isOpen,
  tour,
  onClose,
  onBookTour,
}) => {
  const { language } = useI18n();
  const isRtl = language === 'ar';

  // Video and WebGL canvas refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // AR States
  const [activeModel, setActiveModel] = useState<ModelType>('karnak-hall');
  const [cameraState, setCameraState] = useState<'requesting' | 'active' | 'denied' | 'simulated'>('requesting');
  const [placementState, setPlacementState] = useState<'scanning' | 'detected' | 'placed'>('scanning');
  const [scale, setScale] = useState<number>(1.0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [sunMode, setSunMode] = useState<'dawn' | 'noon' | 'sunset'>('sunset');
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [snapshotTaken, setSnapshotTaken] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  // Interactive mouse/touch drag rotation
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map incoming tour to model
  useEffect(() => {
    if (!tour) return;
    const tourId = tour.id.toLowerCase();
    if (tourId.includes('balloon')) {
      setActiveModel('royal-balloon');
    } else if (tourId.includes('nefertari') || tourId.includes('tomb') || tourId.includes('kings')) {
      setActiveModel('nefertari-shrine');
    } else if (tourId.includes('felucca') || tourId.includes('nile') || tourId.includes('dahabiya')) {
      setActiveModel('nile-felucca');
    } else {
      setActiveModel('karnak-hall');
    }
  }, [tour]);

  // Audio ambiance (procedural gentle ambient pad & desert breeze)
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startAudio = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gainNodeRef.current = gain;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(144, ctx.currentTime); // D3 ancient resonant frequency
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setAudioActive(true);
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setAudioActive(false);
  }, []);

  // Initialize camera stream
  const initCamera = useCallback(async (desiredFacing: 'environment' | 'user') => {
    setCameraState('requesting');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraState('simulated');
        return;
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: desiredFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }
      setCameraState('active');
    } catch {
      // Permission denied or environment camera not found, fallback to simulated room
      setCameraState('simulated');
    }
  }, []);

  // Setup / teardown camera when modal opens
  useEffect(() => {
    if (isOpen) {
      initCamera(facingMode);
      // Simulate surface detection progress
      const detectTimer = setTimeout(() => {
        setPlacementState('detected');
      }, 1800);

      return () => {
        clearTimeout(detectTimer);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        stopAudio();
      };
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      stopAudio();
    }
  }, [isOpen, facingMode, initCamera, stopAudio]);

  // Model creation helpers
  const buildKarnakHypostyleHall = useCallback((wireframe: boolean): THREE.Group => {
    const group = new THREE.Group();

    // Materials
    const stoneColor = wireframe ? 0xd6ad60 : 0xdfcbb2;
    const stoneMat = new THREE.MeshStandardMaterial({
      color: stoneColor,
      roughness: 0.85,
      metalness: 0.1,
      wireframe,
    });

    const hieroglyphMat = new THREE.MeshStandardMaterial({
      color: wireframe ? 0xf59e0b : 0xc7aa8a,
      roughness: 0.7,
      metalness: 0.15,
      wireframe,
    });

    const goldElectrumMat = new THREE.MeshStandardMaterial({
      color: 0xf5c042,
      roughness: 0.25,
      metalness: 0.85,
      wireframe,
    });

    // Base Temple Terrace / Pylon Foundation with stepped entrance
    const baseGeo = new THREE.BoxGeometry(6.2, 0.35, 7.5);
    const baseMesh = new THREE.Mesh(baseGeo, stoneMat);
    baseMesh.position.y = 0.175;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    // Front Pylon Entrance Gate
    const pylonLeftGeo = new THREE.BoxGeometry(2.0, 3.2, 0.7);
    const pylonLeft = new THREE.Mesh(pylonLeftGeo, stoneMat);
    pylonLeft.position.set(-1.8, 1.8, 3.2);
    pylonLeft.castShadow = true;
    group.add(pylonLeft);

    const pylonRight = pylonLeft.clone();
    pylonRight.position.set(1.8, 1.8, 3.2);
    group.add(pylonRight);

    // Entrance Portal Lintel
    const portalLintelGeo = new THREE.BoxGeometry(2.4, 0.4, 0.8);
    const portalLintel = new THREE.Mesh(portalLintelGeo, hieroglyphMat);
    portalLintel.position.set(0, 3.1, 3.2);
    group.add(portalLintel);

    // Twin Gilded Obelisks flanking pylon
    const obeliskGeo = new THREE.CylinderGeometry(0.08, 0.18, 4.4, 4);
    const pyramidionGeo = new THREE.ConeGeometry(0.12, 0.45, 4);

    [-1.0, 1.0].forEach((xPos) => {
      const obeliskMesh = new THREE.Mesh(obeliskGeo, stoneMat);
      obeliskMesh.position.set(xPos, 2.4, 4.1);
      obeliskMesh.rotation.y = Math.PI / 4;
      obeliskMesh.castShadow = true;

      const pyramidion = new THREE.Mesh(pyramidionGeo, goldElectrumMat);
      pyramidion.position.set(xPos, 4.75, 4.1);
      pyramidion.rotation.y = Math.PI / 4;
      pyramidion.castShadow = true;

      group.add(obeliskMesh);
      group.add(pyramidion);
    });

    // 12 Grand Central Hypostyle Columns (Papyrus Calyx Capitals)
    const columnBaseGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.25, 16);
    const columnShaftGeo = new THREE.CylinderGeometry(0.32, 0.36, 2.8, 20);
    const capitalBudGeo = new THREE.CylinderGeometry(0.6, 0.32, 0.65, 20);
    const abacusGeo = new THREE.BoxGeometry(0.9, 0.2, 0.9);

    const rows = [-2.2, -1.1, 0, 1.1, 2.2];
    const cols = [-1.4, -0.5, 0.5, 1.4];

    rows.forEach((z) => {
      cols.forEach((x) => {
        const colGroup = new THREE.Group();
        colGroup.position.set(x, 0.35, z);

        const colBase = new THREE.Mesh(columnBaseGeo, stoneMat);
        colBase.position.y = 0.125;
        colGroup.add(colBase);

        const colShaft = new THREE.Mesh(columnShaftGeo, hieroglyphMat);
        colShaft.position.y = 1.6;
        colShaft.castShadow = true;
        colGroup.add(colShaft);

        const colCapital = new THREE.Mesh(capitalBudGeo, hieroglyphMat);
        colCapital.position.y = 3.25;
        colCapital.castShadow = true;
        colGroup.add(colCapital);

        const colAbacus = new THREE.Mesh(abacusGeo, stoneMat);
        colAbacus.position.y = 3.65;
        colGroup.add(colAbacus);

        group.add(colGroup);
      });
    });

    // Massive Architraves connecting the columns
    cols.forEach((x) => {
      const beamGeo = new THREE.BoxGeometry(0.8, 0.35, 5.2);
      const beam = new THREE.Mesh(beamGeo, stoneMat);
      beam.position.set(x, 4.15, 0);
      beam.castShadow = true;
      group.add(beam);
    });

    // Cross Lintel slabs
    [-1.65, 0, 1.65].forEach((z) => {
      const crossBeamGeo = new THREE.BoxGeometry(3.6, 0.3, 0.8);
      const crossBeam = new THREE.Mesh(crossBeamGeo, hieroglyphMat);
      crossBeam.position.set(0, 4.45, z);
      crossBeam.castShadow = true;
      group.add(crossBeam);
    });

    // Sanctuary Altar with Ra solar disc
    const altarGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.7, 8);
    const altar = new THREE.Mesh(altarGeo, stoneMat);
    altar.position.set(0, 0.7, -2.5);
    group.add(altar);

    const discGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
    const disc = new THREE.Mesh(discGeo, goldElectrumMat);
    disc.position.set(0, 1.45, -2.5);
    disc.rotation.x = Math.PI / 2;
    group.add(disc);

    return group;
  }, []);

  const buildNefertariShrine = useCallback((wireframe: boolean): THREE.Group => {
    const group = new THREE.Group();

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdaa520,
      roughness: 0.3,
      metalness: 0.8,
      wireframe,
    });

    const royalBlueMat = new THREE.MeshStandardMaterial({
      color: wireframe ? 0x60a5fa : 0x1e3a8a,
      roughness: 0.5,
      metalness: 0.2,
      wireframe,
    });

    const alabasterMat = new THREE.MeshStandardMaterial({
      color: wireframe ? 0xd4d4d8 : 0xf4f1ea,
      roughness: 0.4,
      metalness: 0.1,
      wireframe,
    });

    // Sanctuary Plinth
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.3, 4.5), alabasterMat);
    plinth.position.y = 0.15;
    group.add(plinth);

    // Gilded Shrine Outer Ark
    const arkGeo = new THREE.BoxGeometry(3.0, 2.8, 3.4);
    const ark = new THREE.Mesh(arkGeo, goldMat);
    ark.position.set(0, 1.7, 0);
    ark.castShadow = true;
    group.add(ark);

    // Sloped Cavetto Cornice Roof
    const roofGeo = new THREE.ConeGeometry(2.3, 0.9, 4);
    const roof = new THREE.Mesh(roofGeo, goldMat);
    roof.position.set(0, 3.55, 0);
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    // Sanctuary Doorway / Recessed Niche
    const doorGeo = new THREE.BoxGeometry(1.4, 2.2, 0.4);
    const door = new THREE.Mesh(doorGeo, royalBlueMat);
    door.position.set(0, 1.4, 1.55);
    group.add(door);

    // Twin Guardian Anubis statues on plinths
    [-1.7, 1.7].forEach((xPos) => {
      const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 1.1), alabasterMat);
      pedestal.position.set(xPos, 0.7, 1.4);
      group.add(pedestal);

      const jackalBody = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.9), goldMat);
      jackalBody.position.set(xPos, 1.3, 1.4);
      group.add(jackalBody);

      const jackalHead = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 4), goldMat);
      jackalHead.position.set(xPos, 1.6, 1.9);
      jackalHead.rotation.x = -Math.PI / 3;
      group.add(jackalHead);
    });

    // Golden Hathor Pillars
    [-1.1, 1.1].forEach((xPos) => {
      const hathorCol = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 2.2, 16), goldMat);
      hathorCol.position.set(xPos, 1.4, 1.6);
      group.add(hathorCol);
    });

    return group;
  }, []);

  const buildRoyalBalloon = useCallback((wireframe: boolean): THREE.Group => {
    const group = new THREE.Group();

    const balloonMat = new THREE.MeshStandardMaterial({
      color: wireframe ? 0xd97706 : 0xd6ad60,
      roughness: 0.5,
      metalness: 0.1,
      wireframe,
    });

    const navyMat = new THREE.MeshStandardMaterial({
      color: wireframe ? 0x38bdf8 : 0x101d2b,
      roughness: 0.6,
      metalness: 0.1,
      wireframe,
    });

    const basketMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.9,
      metalness: 0.0,
      wireframe,
    });

    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      wireframe,
    });

    // Aerostatic Teardrop Envelope (Combined Sphere + Inverted Cone)
    const upperGeo = new THREE.SphereGeometry(1.8, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.65);
    const upperBalloon = new THREE.Mesh(upperGeo, balloonMat);
    upperBalloon.position.set(0, 4.4, 0);
    upperBalloon.castShadow = true;
    group.add(upperBalloon);

    const lowerGeo = new THREE.ConeGeometry(1.65, 2.0, 24, 1, true);
    const lowerBalloon = new THREE.Mesh(lowerGeo, navyMat);
    lowerBalloon.position.set(0, 3.4, 0);
    lowerBalloon.rotation.x = Math.PI;
    lowerBalloon.castShadow = true;
    group.add(lowerBalloon);

    // Decorative Pharaonic Band
    const bandGeo = new THREE.CylinderGeometry(1.82, 1.82, 0.35, 24, 1, true);
    const band = new THREE.Mesh(bandGeo, balloonMat);
    band.position.set(0, 4.2, 0);
    group.add(band);

    // Burner and Flame
    const burnerRing = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 16), basketMat);
    burnerRing.position.set(0, 2.2, 0);
    burnerRing.rotation.x = Math.PI / 2;
    group.add(burnerRing);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 8), flameMat);
    flame.position.set(0, 2.35, 0);
    group.add(flame);

    // Dynamic Burner Point Light
    const burnerLight = new THREE.PointLight(0xff7700, 2.5, 6);
    burnerLight.position.set(0, 2.4, 0);
    group.add(burnerLight);

    // Suspension Cables
    [-0.5, 0.5].forEach((x) => {
      [-0.5, 0.5].forEach((z) => {
        const cableGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.3);
        const cable = new THREE.Mesh(cableGeo, basketMat);
        cable.position.set(x * 0.8, 1.55, z * 0.8);
        group.add(cable);
      });
    });

    // Rattan Gondola Basket
    const basket = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 1.1), basketMat);
    basket.position.set(0, 0.8, 0);
    basket.castShadow = true;
    group.add(basket);

    return group;
  }, []);

  const buildNileFelucca = useCallback((wireframe: boolean): THREE.Group => {
    const group = new THREE.Group();

    const woodMat = new THREE.MeshStandardMaterial({
      color: wireframe ? 0xb45309 : 0x6e4720,
      roughness: 0.7,
      metalness: 0.1,
      wireframe,
    });

    const sailMat = new THREE.MeshStandardMaterial({
      color: wireframe ? 0xfef08a : 0xfcfaf2,
      roughness: 0.8,
      metalness: 0.05,
      side: THREE.DoubleSide,
      wireframe,
    });

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x10283c,
      roughness: 0.15,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
      wireframe,
    });

    // Nile Reflective Water Disc Base
    const waterBase = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.1, 32), waterMat);
    waterBase.position.y = 0.05;
    group.add(waterBase);

    // Hull (Streamlined Wooden Shape)
    const hullGroup = new THREE.Group();
    const hullMid = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.65, 3.6), woodMat);
    hullMid.position.y = 0.35;
    hullGroup.add(hullMid);

    // Bow (Prow)
    const bow = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.4, 4), woodMat);
    bow.position.set(0, 0.35, 2.4);
    bow.rotation.x = Math.PI / 2;
    hullGroup.add(bow);

    // Stern
    const stern = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.8), woodMat);
    stern.position.set(0, 0.38, -2.1);
    hullGroup.add(stern);

    group.add(hullGroup);

    // Wooden Mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 4.2), woodMat);
    mast.position.set(0, 2.3, 0.4);
    mast.rotation.x = -0.12; // Classical raked Egyptian mast angle
    group.add(mast);

    // Lateen Yard Boom (angled 50 degrees)
    const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 5.2), woodMat);
    yard.position.set(0, 2.6, 0.4);
    yard.rotation.x = 0.75;
    group.add(yard);

    // Triangular Billowing Canvas Sail
    const sailShape = new THREE.Shape();
    sailShape.moveTo(0, 0);
    sailShape.lineTo(0, 4.5);
    sailShape.lineTo(2.2, 0.6);
    sailShape.closePath();

    const sailGeo = new THREE.ShapeGeometry(sailShape);
    const sail = new THREE.Mesh(sailGeo, sailMat);
    sail.position.set(0.05, 0.7, -1.2);
    sail.rotation.y = Math.PI / 2;
    group.add(sail);

    return group;
  }, []);

  // Update active model in scene
  const switchModel = useCallback(
    (modelKey: ModelType) => {
      if (!sceneRef.current) return;
      setActiveModel(modelKey);

      // Remove existing model
      if (modelGroupRef.current) {
        sceneRef.current.remove(modelGroupRef.current);
      }

      let newGroup: THREE.Group;
      switch (modelKey) {
        case 'nefertari-shrine':
          newGroup = buildNefertariShrine(isWireframe);
          break;
        case 'royal-balloon':
          newGroup = buildRoyalBalloon(isWireframe);
          break;
        case 'nile-felucca':
          newGroup = buildNileFelucca(isWireframe);
          break;
        case 'karnak-hall':
        default:
          newGroup = buildKarnakHypostyleHall(isWireframe);
          break;
      }

      newGroup.scale.set(scale, scale, scale);
      modelGroupRef.current = newGroup;
      sceneRef.current.add(newGroup);
    },
    [buildKarnakHypostyleHall, buildNefertariShrine, buildRoyalBalloon, buildNileFelucca, isWireframe, scale]
  );

  // Lighting updater for Dawn / Noon / Sunset
  const updateSunLighting = useCallback((mode: 'dawn' | 'noon' | 'sunset') => {
    setSunMode(mode);
    if (!dirLightRef.current || !ambientLightRef.current) return;

    if (mode === 'dawn') {
      // Golden sunrise lighting
      dirLightRef.current.color.setHex(0xffaa44);
      dirLightRef.current.intensity = 2.2;
      dirLightRef.current.position.set(-6, 3, 5);
      ambientLightRef.current.color.setHex(0x334466);
      ambientLightRef.current.intensity = 0.9;
    } else if (mode === 'noon') {
      // High bright noon Ra sunlight
      dirLightRef.current.color.setHex(0xfff7e6);
      dirLightRef.current.intensity = 2.8;
      dirLightRef.current.position.set(2, 9, 3);
      ambientLightRef.current.color.setHex(0x556677);
      ambientLightRef.current.intensity = 1.1;
    } else {
      // Golden Hour Sunset over West Bank
      dirLightRef.current.color.setHex(0xff7722);
      dirLightRef.current.intensity = 2.4;
      dirLightRef.current.position.set(6, 2.5, 4);
      ambientLightRef.current.color.setHex(0x221133);
      ambientLightRef.current.intensity = 0.85;
    }
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!isOpen || !canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // Renderer with transparent canvas so camera feed shows through
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Ambient & Directional Sun Lights
    const ambientLight = new THREE.AmbientLight(0x3a4b5c, 0.9);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xffaa44, 2.4);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Soft Shadow Contact Ground Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(14, 14);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Initial Model
    const modelGroup = buildKarnakHypostyleHall(isWireframe);
    modelGroup.scale.set(scale, scale, scale);
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Set initial sunset lighting
    updateSunLighting('sunset');

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (modelGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          modelGroupRef.current.rotation.y += delta * 0.25;
        }

        // Gentle floating bob if balloon model
        if (activeModel === 'royal-balloon') {
          modelGroupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
        } else if (activeModel === 'nile-felucca') {
          modelGroupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.2) * 0.03;
        } else {
          modelGroupRef.current.position.y = 0;
          modelGroupRef.current.rotation.z = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, [isOpen, buildKarnakHypostyleHall, isWireframe, scale, updateSunLighting, autoRotate, activeModel]);

  // Handle Model Change
  useEffect(() => {
    if (isOpen) {
      switchModel(activeModel);
    }
  }, [activeModel, isOpen, switchModel]);

  // Handle Scale Change
  useEffect(() => {
    if (modelGroupRef.current) {
      modelGroupRef.current.scale.set(scale, scale, scale);
    }
  }, [scale]);

  // Handle Wireframe toggle
  useEffect(() => {
    if (isOpen) {
      switchModel(activeModel);
    }
  }, [isWireframe, isOpen, switchModel, activeModel]);

  // Drag rotation handlers for touch & mouse
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;
    const deltaX = e.clientX - previousPointerPositionRef.current.x;
    const deltaY = e.clientY - previousPointerPositionRef.current.y;

    modelGroupRef.current.rotation.y += deltaX * 0.01;

    // Slight tilt on X axis
    const newRotX = modelGroupRef.current.rotation.x + deltaY * 0.005;
    modelGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, newRotX));

    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Place object on detected surface
  const handlePlaceModel = () => {
    setPlacementState('placed');
  };

  // Reset placement / relocate
  const handleRelocate = () => {
    setPlacementState('scanning');
    setTimeout(() => {
      setPlacementState('detected');
    }, 1200);
  };

  // Snapshot photo capture
  const handleTakeSnapshot = () => {
    if (!rendererRef.current) return;

    // Merge simulated background or camera if possible via a canvas
    const snapCanvas = document.createElement('canvas');
    const width = rendererRef.current.domElement.width;
    const height = rendererRef.current.domElement.height;
    snapCanvas.width = width;
    snapCanvas.height = height;
    const ctx = snapCanvas.getContext('2d');

    if (ctx) {
      // 1. Draw video feed or simulated room background
      if (cameraState === 'active' && videoRef.current) {
        try {
          ctx.drawImage(videoRef.current, 0, 0, width, height);
        } catch {
          // Cross-origin fallback
          ctx.fillStyle = '#101D2B';
          ctx.fillRect(0, 0, width, height);
        }
      } else {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#101D2B');
        grad.addColorStop(0.5, '#16273b');
        grad.addColorStop(1, '#0c1622');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Draw Three.js WebGL canvas
      ctx.drawImage(rendererRef.current.domElement, 0, 0);

      // 3. Draw Watermark & Info Header
      ctx.fillStyle = 'rgba(10, 11, 14, 0.75)';
      ctx.fillRect(20, height - 85, width - 40, 65);

      ctx.fillStyle = '#D6AD60';
      ctx.font = 'bold 22px Cinzel, serif';
      ctx.fillText('GO VOYAGE • AR EXPEDITION', 40, height - 50);

      ctx.fillStyle = '#E9D8B5';
      ctx.font = '14px sans-serif';
      ctx.fillText(
        `${AR_MODELS[activeModel].name} • Scale: ${(scale * 100).toFixed(0)}%`,
        40,
        height - 30
      );

      const dataUrl = snapCanvas.toDataURL('image/jpeg', 0.95);
      setSnapshotTaken(dataUrl);
    }
  };

  const handleDownloadSnapshot = () => {
    if (!snapshotTaken) return;
    const link = document.createElement('a');
    link.download = `luxor-vip-ar-${activeModel}-${Date.now()}.jpg`;
    link.href = snapshotTaken;
    link.click();
  };

  // Flip camera
  const handleToggleCameraFacing = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    initCamera(nextFacing);
  };

  if (!isOpen) return null;

  const currentModelData = AR_MODELS[activeModel];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fadeIn">
      {/* Container / Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full h-full max-w-full max-h-full overflow-hidden select-none touch-none bg-stone-950 flex flex-col justify-between"
      >
        {/* Layer 0: Camera Feed (Live Video) */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
            cameraState === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Layer 0 Fallback: Simulated Ambient Room & Spatial Floor Grid */}
        {cameraState !== 'active' && (
          <div className="absolute inset-0 z-0 bg-radial from-[#182c42] via-[#101D2B] to-[#0A0B0E] flex items-center justify-center pointer-events-none">
            {/* Atmospheric room lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(214,173,96,0.18),transparent_65%)]" />

            {/* Simulated 3D Floor Perspective Grid */}
            <div
              className="absolute bottom-0 w-full h-[55%] opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(214, 173, 96, 0.25) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(214, 173, 96, 0.25) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
                transform: 'perspective(600px) rotateX(68deg)',
                transformOrigin: 'bottom center',
              }}
            />

            {/* Concentric Placement Rings */}
            <div className="absolute bottom-[20%] w-96 h-96 rounded-full border border-[#D6AD60]/30 animate-pulse pointer-events-none flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-dashed border-[#D6AD60]/40" />
            </div>
          </div>
        )}

        {/* Layer 1: Three.js Interactive 3D Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
        />

        {/* Layer 2: AR Reticle & Placement Target HUD (Before placed) */}
        {placementState !== 'placed' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none p-4">
            <div className="relative flex flex-col items-center text-center max-w-sm">
              {/* Reticle Graphic */}
              <div
                className={`relative w-44 h-44 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  placementState === 'detected'
                    ? 'border-[#D6AD60] bg-[#D6AD60]/10 scale-105 shadow-[0_0_40px_rgba(214,173,96,0.4)]'
                    : 'border-white/30 border-dashed animate-spin'
                }`}
              >
                {/* Crosshairs */}
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#D6AD60] to-transparent" />
                <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-[#D6AD60] to-transparent" />
                <div className="w-8 h-8 rounded-full border border-[#D6AD60] animate-ping" />
              </div>

              {/* Status Message */}
              <div className="mt-6 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-[#D6AD60]/50 text-white shadow-2xl">
                <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
                  {placementState === 'scanning' ? (
                    <>
                      <Sparkles className="w-4 h-4 text-[#D6AD60] animate-spin" />
                      <span>{isRtl ? 'جاري مسح الأرضية والسطح...' : 'Scanning floor surface... move device slowly'}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[#E9D8B5] font-semibold">
                        {isRtl ? 'تم اكتشاف السطح المستوي! انقر للتثبيت' : 'Flat Surface Detected! Tap button below to place'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Button to Place */}
              {placementState === 'detected' && (
                <button
                  onClick={handlePlaceModel}
                  className="pointer-events-auto mt-4 px-6 py-3 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#101D2B]" />
                  <span>{isRtl ? 'تثبيت المعلم في مكانك' : 'Place Monument In Your Space'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Layer 3: Top Navigation Bar */}
        <header className="relative z-30 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto">
          {/* Brand & Active Model Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#101D2B]/90 border border-[#D6AD60]/60 flex items-center justify-center text-[#D6AD60] shadow-lg">
              <Sparkles className="w-5 h-5 text-[#D6AD60]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6AD60]">
                  GO VOYAGE • AR 3D VIEWER
                </span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                    cameraState === 'active'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {cameraState === 'active' ? 'Live Camera' : 'Simulated Room'}
                </span>
              </div>
              <h2 className="text-white font-cinzel text-base sm:text-lg font-bold leading-tight">
                {isRtl ? currentModelData.arabicName : currentModelData.name}
              </h2>
            </div>
          </div>

          {/* Top Actions: Camera mode, Audio, Close */}
          <div className="flex items-center gap-2">
            {/* Audio Ambiance toggle */}
            <button
              onClick={() => (audioActive ? stopAudio() : startAudio())}
              title="Temple Ambiance Sound"
              className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
                audioActive
                  ? 'bg-[#D6AD60] text-[#101D2B] border-[#D6AD60]'
                  : 'bg-black/60 text-stone-300 border-stone-800 hover:text-white'
              }`}
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Toggle Camera Mode / Facing */}
            <button
              onClick={handleToggleCameraFacing}
              title="Flip Camera or Toggle Source"
              className="p-2.5 rounded-xl bg-black/60 text-stone-300 border border-stone-800 hover:text-white hover:border-[#D6AD60]/50 backdrop-blur-md transition-all"
            >
              <Camera className="w-4 h-4 text-[#D6AD60]" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close AR Preview"
              className="p-2.5 rounded-xl bg-black/70 text-stone-300 border border-stone-700 hover:text-white hover:border-[#D6AD60] backdrop-blur-md transition-all"
            >
              <X className="w-5 h-5 text-stone-200 hover:text-[#D6AD60]" />
            </button>
          </div>
        </header>

        {/* Layer 3: Model Carousel Tabs (Middle / Upper) */}
        <div className="relative z-30 px-4 sm:px-6 pointer-events-auto flex items-center justify-center">
          <div className="flex items-center gap-1.5 p-1 bg-black/70 backdrop-blur-md border border-[#D6AD60]/40 rounded-xl overflow-x-auto max-w-full shadow-2xl">
            {(Object.keys(AR_MODELS) as ModelType[]).map((mKey) => (
              <button
                key={mKey}
                onClick={() => switchModel(mKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeModel === mKey
                    ? 'bg-[#D6AD60] text-[#101D2B] font-bold shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {AR_MODELS[mKey].name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Layer 3: Bottom Control Bar & Info HUD */}
        <footer className="relative z-30 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/85 to-transparent pointer-events-auto flex flex-col gap-3">
          {/* Architectural Dossier Card (Collapsible) */}
          {showInfo && (
            <div className="bg-[#142334]/85 backdrop-blur-md border border-[#D6AD60]/40 rounded-2xl p-4 text-xs shadow-2xl max-w-3xl mx-auto w-full">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D6AD60] font-bold uppercase tracking-wider text-[10px]">
                      {currentModelData.category}
                    </span>
                    <span className="text-stone-500">·</span>
                    <span className="text-stone-300">{currentModelData.period}</span>
                  </div>
                  <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                    {currentModelData.description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-stone-400 text-[11px] pt-1">
                    <span>
                      <strong className="text-stone-200">Scale:</strong> {currentModelData.realHeight}
                    </span>
                    <span>
                      <strong className="text-stone-200">Material:</strong> {currentModelData.material}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowInfo(false)}
                  className="text-stone-400 hover:text-white p-1"
                  title="Hide Info"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Main Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 max-w-5xl mx-auto w-full">
            {/* Left Controls: Scale Slider, Lighting, Wireframe */}
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-stone-800 rounded-xl px-3 py-2">
              {/* Scale Control */}
              <div className="flex items-center gap-2 text-stone-300 text-xs pr-2 border-r border-stone-800">
                <span className="text-[10px] uppercase font-bold text-[#D6AD60]">Size</span>
                <input
                  type="range"
                  min="0.4"
                  max="2.5"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-20 accent-[#D6AD60] cursor-pointer"
                  title="Monument Scale"
                />
                <span className="text-[11px] text-stone-300 w-8">{(scale * 100).toFixed(0)}%</span>
              </div>

              {/* Sun Lighting Modes */}
              <div className="flex items-center gap-1 border-r border-stone-800 pr-2">
                <button
                  onClick={() => updateSunLighting('dawn')}
                  title="Dawn Golden Hour Light"
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    sunMode === 'dawn' ? 'bg-[#D6AD60] text-[#101D2B]' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => updateSunLighting('noon')}
                  title="Noon Ra Light"
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    sunMode === 'noon' ? 'bg-[#D6AD60] text-[#101D2B]' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <button
                  onClick={() => updateSunLighting('sunset')}
                  title="Sunset Nile Dusk Light"
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    sunMode === 'sunset' ? 'bg-[#D6AD60] text-[#101D2B]' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Wireframe / LiDAR Scan toggle */}
              <button
                onClick={() => setIsWireframe(!isWireframe)}
                title="Archaeological Wireframe LiDAR Scan"
                className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                  isWireframe ? 'bg-[#D6AD60] text-[#101D2B] font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">LiDAR</span>
              </button>

              {/* Auto Rotate Toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle 360 Turntable Orbit"
                className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                  autoRotate ? 'text-[#D6AD60]' : 'text-stone-500 hover:text-white'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Relocate Surface */}
              <button
                onClick={handleRelocate}
                title="Reposition Surface"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white"
              >
                <Move className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Controls: Snapshot & Booking CTA */}
            <div className="flex items-center gap-2">
              {/* Snapshot Button */}
              <button
                onClick={handleTakeSnapshot}
                title="Take AR Photo"
                className="p-2.5 rounded-xl bg-stone-900 border border-[#D6AD60]/50 text-[#D6AD60] hover:bg-[#D6AD60] hover:text-[#101D2B] transition-all shadow-lg flex items-center gap-1.5 text-xs font-semibold"
              >
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Snapshot</span>
              </button>

              {/* Toggle Info HUD */}
              {!showInfo && (
                <button
                  onClick={() => setShowInfo(true)}
                  title="Show Monument Details"
                  className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}

              {/* Reserve Tour Link */}
              {tour && onBookTour && (
                <button
                  onClick={() => {
                    onClose();
                    onBookTour(tour);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:opacity-95 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#101D2B]" />
                  <span>{isRtl ? 'حجز هذه الرحلة' : 'Book Real Site Tour'}</span>
                </button>
              )}
            </div>
          </div>
        </footer>

        {/* Snapshot Preview Modal Dialog */}
        {snapshotTaken && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#101D2B] border border-[#D6AD60] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-scaleUp">
              <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D6AD60]" />
                  <span className="font-cinzel text-white font-bold text-sm">
                    {isRtl ? 'لقطة الواقع المعزز جاهزة' : 'AR Expedition Snapshot'}
                  </span>
                </div>
                <button
                  onClick={() => setSnapshotTaken(null)}
                  className="text-stone-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <img
                  src={snapshotTaken}
                  alt="Luxor AR Snapshot"
                  className="w-full h-auto rounded-xl border border-stone-800 shadow"
                />
              </div>

              <div className="p-4 bg-stone-950/60 border-t border-stone-800 flex items-center justify-between">
                <button
                  onClick={() => setSnapshotTaken(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-300 hover:text-white"
                >
                  {isRtl ? 'إغلاق' : 'Discard'}
                </button>
                <button
                  onClick={handleDownloadSnapshot}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow hover:opacity-95"
                >
                  <Download className="w-4 h-4" />
                  <span>{isRtl ? 'تحميل الصورة' : 'Save AR Photo'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
