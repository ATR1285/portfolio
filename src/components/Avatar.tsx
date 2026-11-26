import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Volume2, VolumeX } from 'lucide-react';
import * as THREE from 'three';
import { voiceService } from '../services/voiceService';

const guidedFlow = [
  { id: 'hero', title: 'Home' },
  { id: 'objective', title: 'Career Objective' },
  { id: 'about', title: 'About' },
  { id: 'capabilities', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'work', title: 'Projects' },
  { id: 'education', title: 'Education' },
  { id: 'contact', title: 'Contact' }
];

// GPU-efficient particle swarm with visual pulse when speaking
const ParticleSwarm = ({ count = 3500, activeSection, isActive }: { count?: number; activeSection: string; isActive: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.6 + Math.random() * 1.2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const targetColor = useMemo(() => new THREE.Color(
    isActive ? '#d1ff52' :
    activeSection === 'hero' ? '#d1ff52' :
    activeSection === 'objective' ? '#b4f038' :
    activeSection === 'about' ? '#97bbb0' :
    activeSection === 'capabilities' ? '#e9dfca' :
    activeSection === 'experience' ? '#b6d7a8' :
    activeSection === 'work' ? '#c7ea51' :
    activeSection === 'education' ? '#d9ead3' :
    activeSection === 'contact' ? '#f5f4ef' : '#d1ff52'
  ), [activeSection, isActive]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const speedMult = isActive ? 2.5 : 1.0;
      pointsRef.current.rotation.y += delta * 0.2 * speedMult;
      pointsRef.current.rotation.x += delta * 0.1 * speedMult;
      
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.color.lerp(targetColor, 0.08);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isActive ? 0.045 : 0.035}
        color="#d1ff52"
        transparent
        opacity={isActive ? 0.85 : 0.65}
        sizeAttenuation
      />
    </points>
  );
};

const AvatarMesh = ({ activeSection, isActive }: { activeSection: string; isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const targetColor = new THREE.Color(
    isActive ? '#d1ff52' :
    activeSection === 'hero' ? '#d1ff52' :
    activeSection === 'objective' ? '#b4f038' :
    activeSection === 'about' ? '#97bbb0' :
    activeSection === 'capabilities' ? '#e9dfca' :
    activeSection === 'experience' ? '#b6d7a8' :
    activeSection === 'work' ? '#c7ea51' :
    activeSection === 'education' ? '#d9ead3' :
    activeSection === 'contact' ? '#f5f4ef' : '#d1ff52'
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      const speedMult = isActive ? 2.2 : 1.0;
      meshRef.current.rotation.x += delta * 0.2 * speedMult;
      meshRef.current.rotation.y += delta * 0.3 * speedMult;
      
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(targetColor, 0.08);
    }
  });

  return (
    <Float speed={isActive ? 4 : 2} rotationIntensity={isActive ? 2 : 1} floatIntensity={isActive ? 2 : 1}>
      <Sphere ref={meshRef} args={[1.2, 32, 32]}>
        <MeshDistortMaterial
          color="#d1ff52"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.25}
          roughness={0.35}
          distort={isActive ? 0.65 : 0.45}
          speed={isActive ? 6 : 3}
        />
      </Sphere>
    </Float>
  );
};

export default function Avatar({ activeSection }: { activeSection: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const handleExplainClick = async () => {
    // Single Stream Guarantee: If currently speaking, stop immediately and return to idle
    if (isSpeaking) {
      voiceService.stopSpeech();
      setIsSpeaking(false);
      setIsProcessing(false);
      return;
    }

    voiceService.stopSpeech();

    // Determine target section index in guided flow
    let nextIdx = 0;
    if (stepIndex === null) {
      const currIdx = guidedFlow.findIndex(item => item.id === activeSection);
      nextIdx = currIdx >= 0 ? currIdx : 0;
    } else {
      nextIdx = (stepIndex + 1) % guidedFlow.length;
    }

    setStepIndex(nextIdx);
    const targetItem = guidedFlow[nextIdx];
    setIsProcessing(true);

    // 1. Identify section & smoothly scroll
    const targetElement = document.getElementById(targetItem.id) || document.querySelector(`[data-section="${targetItem.id}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 2. Wait for scrolling to settle before starting voice explanation
    setTimeout(async () => {
      await voiceService.speakSection(targetItem.id, {
        onStart: () => {
          setIsSpeaking(true);
          setIsProcessing(false);
        },
        onEnd: () => {
          setIsSpeaking(false);
          setIsProcessing(false);
          // Do NOT automatically advance to next section!
        },
        onError: () => {
          setIsSpeaking(false);
          setIsProcessing(false);
        }
      });
    }, 850);
  };

  useEffect(() => {
    return () => {
      voiceService.stopSpeech();
    };
  }, []);

  const buttonText = isSpeaking ? 'STOP' : stepIndex !== null ? 'EXPLAIN NEXT' : 'EXPLAIN';

  return (
    <div className="avatar-container">
      <div className="avatar-canvas">
        <Canvas camera={{ position: [0, 0, 4.5] }} dpr={[1, 2]}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <AvatarMesh activeSection={activeSection} isActive={isSpeaking || isProcessing} />
          <ParticleSwarm activeSection={activeSection} count={3500} isActive={isSpeaking || isProcessing} />
        </Canvas>
      </div>
      <button 
        className={`speak-button ${isSpeaking ? 'speaking' : ''}`} 
        onClick={handleExplainClick}
        aria-label={buttonText}
      >
        {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
        <span>{buttonText}</span>
      </button>
    </div>
  );
}
