'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

type Vec3 = [number, number, number];

// Acoustic Foam Panel Component - Pyramid foam texture
function AcousticFoamPanel({ position, rotation = [0, 0, 0], size = [1.0, 1.0] }: { position: Vec3, rotation?: Vec3, size?: [number, number] }) {
  const pyramids = useMemo(() => {
    const items = [];
    const cols = Math.floor(size[0] * 8);
    const rows = Math.floor(size[1] * 8);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        items.push({
          x: (i / cols - 0.5) * size[0],
          y: (j / rows - 0.5) * size[1],
        });
      }
    }
    return items;
  }, [size]);

  return (
    <group position={position} rotation={rotation}>
      {/* Base panel */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size[0], size[1], 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Pyramid foam texture */}
      {pyramids.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, 0.06]} castShadow>
          <coneGeometry args={[0.03, 0.08, 4]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// Professional Mixing Console Component
function MixingConsole({ position }: { position: Vec3 }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <group position={position}>
      {/* Main console body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.15, 1.2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Angled surface */}
      <mesh position={[0, 0.6, -0.2]} rotation={[-0.3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Channel strips - 16 channels */}
      {Array.from({ length: 16 }).map((_, i) => {
        const x = (i - 7.5) * 0.2;
        return (
          <group key={`channel-${i}`} position={[x, 0.65, -0.2]} rotation={[-0.3, 0, 0]}>
            {/* Fader */}
            <mesh position={[0, 0.2, 0.02]} castShadow>
              <boxGeometry args={[0.04, 0.25, 0.01]} />
              <meshStandardMaterial color="#ff4444" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Fader track */}
            <mesh position={[0, 0.2, 0.01]} castShadow>
              <boxGeometry args={[0.06, 0.3, 0.005]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
            </mesh>
            {/* Rotary knobs */}
            {[0.05, -0.05, -0.15].map((y, idx) => (
              <mesh key={idx} position={[0, y, 0.02]} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} />
                <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.6} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Master faders section */}
      <group position={[1.4, 0.65, -0.2]} rotation={[-0.3, 0, 0]}>
        {[-0.1, 0.1].map((x, idx) => (
          <mesh key={idx} position={[x, 0.2, 0.02]} castShadow>
            <boxGeometry args={[0.06, 0.3, 0.015]} />
            <meshStandardMaterial color="#ffaa00" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* VU meters */}
      <mesh position={[0, 0.9, -0.15]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[2.0, 0.2, 0.02]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={0.3} roughness={0.2} />
      </mesh>

      {/* Interaction hotspot */}
      <mesh
        position={[0, 0.7, -0.2]}
        onClick={() => setShowInfo(!showInfo)}
        visible={false}
      >
        <boxGeometry args={[3.0, 0.8, 0.5]} />
      </mesh>

      {showInfo && (
        <Html position={[0, 1.5, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            border: '1px solid #ff4444',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>SSL-Style Mixing Console</div>
            <div style={{ fontSize: '11px', color: '#aaa' }}>16 channels | Pro studio grade</div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowInfo(false); }}
              style={{
                marginTop: '8px',
                background: '#ff4444',
                color: '#fff',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

// Studio Monitor Speaker with realistic cone/tweeter
function StudioMonitor({ position, rotation = [0, 0, 0] }: { position: Vec3, rotation?: Vec3 }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Speaker cabinet */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.35, 0.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
      </mesh>
      
      {/* Woofer cone (large driver) */}
      <mesh position={[0, -0.08, 0.16]} castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.05, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.08, 0.18]} castShadow>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.8} />
      </mesh>
      
      {/* Tweeter (high frequency driver) */}
      <mesh position={[0, 0.12, 0.16]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.03, 32]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.12, 0.175]} castShadow>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Port (bass reflex) */}
      <mesh position={[0, -0.2, 0.16]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.04, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
      </mesh>

      {/* Brand logo plate */}
      <mesh position={[0, 0.2, 0.16]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.01]} />
        <meshStandardMaterial color="#ff4444" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

// Electric Guitar on Stand
function ElectricGuitar({ position }: { position: Vec3 }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <group position={position}>
      {/* Stand base */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Stand pole */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
        <meshStandardMaterial color="#555555" roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Guitar body */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#8b0000" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[0.1, 1.2, 0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.15, 0.18, 0.05]} />
        <meshStandardMaterial color="#8b0000" roughness={0.2} metalness={0.7} />
      </mesh>
      
      {/* Guitar neck */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.06, 0.7, 0.03]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.3} />
      </mesh>
      
      {/* Headstock */}
      <mesh position={[0, 2.0, 0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      
      {/* Pickups */}
      {[1.1, 1.25].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.03]} rotation={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.15, 0.04, 0.015]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
        </mesh>
      ))}

      {/* Strings */}
      {Array.from({ length: 6 }).map((_, i) => {
        const offset = (i - 2.5) * 0.008;
        return (
          <mesh key={i} position={[offset, 1.55, 0.03]} rotation={[0, 0, 0.1]} castShadow>
            <cylinderGeometry args={[0.0005, 0.0005, 0.9, 8]} />
            <meshStandardMaterial color="#cccccc" roughness={0.2} metalness={0.9} />
          </mesh>
        );
      })}

      {/* Interaction hotspot */}
      <mesh
        position={[0, 1.4, 0]}
        onClick={() => setShowInfo(!showInfo)}
        visible={false}
      >
        <boxGeometry args={[0.4, 0.8, 0.2]} />
      </mesh>

      {showInfo && (
        <Html position={[0.4, 1.6, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            border: '1px solid #8b0000',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Stratocaster-Style Guitar</div>
            <div style={{ fontSize: '11px', color: '#aaa' }}>Vintage sunburst finish</div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowInfo(false); }}
              style={{
                marginTop: '8px',
                background: '#8b0000',
                color: '#fff',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

// Professional Microphone with shock mount
function ProfessionalMic({ position, type = 'condenser' }: { position: Vec3, type?: 'condenser' | 'dynamic' }) {
  return (
    <group position={position}>
      {/* Mic stand base */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Stand pole */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 1.2, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Boom arm */}
      <mesh position={[0.3, 1.3, 0]} rotation={[0, 0, -Math.PI / 3]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Shock mount */}
      <group position={[0.55, 1.45, 0]}>
        {[0, Math.PI / 2].map((angle, idx) => (
          <mesh key={idx} rotation={[angle, 0, 0]} castShadow>
            <torusGeometry args={[0.08, 0.006, 8, 24]} />
            <meshStandardMaterial color="#444444" roughness={0.4} metalness={0.6} />
          </mesh>
        ))}
        
        {/* Microphone capsule */}
        {type === 'condenser' ? (
          <>
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.15, 16]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.08, 0]} castShadow>
              <sphereGeometry args={[0.032, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.028, 0.028, 0.16, 16]} />
              <meshStandardMaterial color="#4a4a4a" roughness={0.8} opacity={0.3} transparent />
            </mesh>
          </>
        ) : (
          <>
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <capsuleGeometry args={[0.025, 0.12, 8, 16]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.08]} castShadow>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial color="#3a3a3a" roughness={0.6} />
            </mesh>
          </>
        )}
      </group>

      {/* XLR cable */}
      <mesh position={[0.4, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.8, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
    </group>
  );
}

// MIDI Keyboard Controller
function MIDIKeyboard({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Keyboard body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.5} />
      </mesh>
      
      {/* White keys */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`white-${i}`} position={[(i - 6.5) * 0.08, 0.05, 0.05]} castShadow>
          <boxGeometry args={[0.07, 0.02, 0.2]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
        </mesh>
      ))}
      
      {/* Black keys */}
      {Array.from({ length: 10 }).map((_, i) => {
        const skip = i % 7 === 2 || i % 7 === 6;
        if (skip) return null;
        return (
          <mesh key={`black-${i}`} position={[(i - 4.5) * 0.08, 0.07, 0.1]} castShadow>
            <boxGeometry args={[0.04, 0.02, 0.12]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.2} />
          </mesh>
        );
      })}

      {/* Control knobs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`knob-${i}`} position={[(i - 3.5) * 0.12, 0.05, -0.12]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 16]} />
          <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.6} />
        </mesh>
      ))}

      {/* Pitch bend wheel */}
      <mesh position={[-0.5, 0.05, 0.05]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.06, 16]} />
        <meshStandardMaterial color="#ff4444" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

// Computer Workstation with dual monitors
function ComputerWorkstation({ position }: { position: Vec3 }) {
  const { isNight } = useTheme();
  
  return (
    <group position={position}>
      {/* Desk surface */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.5} />
      </mesh>
      
      {/* Monitor stands */}
      {[-0.35, 0.35].map((x, idx) => (
        <group key={idx} position={[x, 0, 0]}>
          {/* Stand base */}
          <mesh position={[0, 0.73, -0.1]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.01, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Stand pole */}
          <mesh position={[0, 0.95, -0.1]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Monitor */}
          <mesh position={[0, 1.15, -0.1]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.3, 0.03]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 1.15, -0.085]}>
            <planeGeometry args={[0.45, 0.25]} />
            <meshStandardMaterial 
              color={isNight ? "#2a5a3a" : "#3a6a4a"} 
              emissive="#00ff44" 
              emissiveIntensity={isNight ? 0.8 : 0.5}
              roughness={0.1} 
            />
          </mesh>
          {/* Screen glow light */}
          <pointLight 
            position={[0, 1.15, 0]} 
            color="#00ff44" 
            intensity={isNight ? 1.5 : 1.0} 
            distance={1.5} 
          />
        </group>
      ))}

      {/* Keyboard */}
      <mesh position={[0, 0.73, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.02, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.35, 0.74, 0.25]} castShadow>
        <boxGeometry args={[0.05, 0.02, 0.08]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[-0.6, 0.76, 0.2]} castShadow>
        <cylinderGeometry args={[0.035, 0.03, 0.08, 16]} />
        <meshStandardMaterial color="#8b4513" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Gold Record Wall Display
function GoldRecord({ position, rotation = [0, 0, 0] }: { position: Vec3, rotation?: Vec3 }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.5, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Gold disc */}
      <mesh position={[0, 0.05, 0.02]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.005, 32]} />
        <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Center hole */}
      <mesh position={[0, 0.05, 0.025]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      {/* Plaque */}
      <mesh position={[0, -0.15, 0.02]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.005]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

// Recording indicator light
function RecordingLight({ position }: { position: Vec3 }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const [isRecording, setIsRecording] = useState(false);

  useFrame(({ clock }) => {
    if (lightRef.current && isRecording) {
      lightRef.current.intensity = 2 + Math.sin(clock.getElapsedTime() * 3) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Light box */}
      <mesh castShadow onClick={() => setIsRecording(!isRecording)}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial 
          color={isRecording ? "#ff0000" : "#3a0000"} 
          emissive="#ff0000" 
          emissiveIntensity={isRecording ? 0.8 : 0.1}
          roughness={0.3} 
        />
      </mesh>
      {isRecording && (
        <pointLight ref={lightRef} position={[0, 0, 0.1]} color="#ff0000" intensity={2} distance={3} />
      )}
      {isRecording && (
        <Html position={[0, 0.15, 0]} center>
          <div style={{
            background: '#ff0000',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 'bold',
            animation: 'pulse 1s infinite',
          }}>
            ● RECORDING
          </div>
        </Html>
      )}
    </group>
  );
}

// Studio Soundscape Audio Component
function StudioSoundscape() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isNight } = useTheme();

  useEffect(() => {
    // In a real app, you'd have studio ambience audio file
    // For now, we'll just set up the audio element structure
    const audio = new Audio();
    // audio.src = '/audio/studio-ambience.mp3'; // Uncomment when file exists
    audio.loop = true;
    audio.volume = isNight ? 0.2 : 0.3;
    audioRef.current = audio;

    // Uncomment to play audio when file exists:
    // audio.play().catch(() => console.log('Audio autoplay prevented'));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isNight ? 0.2 : 0.3;
    }
  }, [isNight]);

  return null;
}

// Cable management - visible XLR/instrument cables
function StudioCables() {
  const cables = useMemo(() => [
    { start: [-2.5, 0.1, 1.5], end: [-1.0, 0.7, 0.5], color: '#1a1a1a' },
    { start: [-0.5, 0.1, 2.0], end: [0.5, 0.7, 0.5], color: '#1a1a1a' },
    { start: [2.0, 0.1, 1.5], end: [1.5, 0.7, 0.5], color: '#1a1a1a' },
  ], []);

  return (
    <>
      {cables.map((cable, idx) => {
        const start = new THREE.Vector3(...cable.start);
        const end = new THREE.Vector3(...cable.end);
        const mid = new THREE.Vector3(
          (start.x + end.x) / 2,
          Math.min(start.y, end.y) - 0.2,
          (start.z + end.z) / 2
        );
        
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(20);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: cable.color });
        const line = new THREE.Line(geometry, material);

        return <primitive key={idx} object={line} />;
      })}
    </>
  );
}

// Main Studio Component
export function MusicRecordingStudio() {
  const groupRef = useRef<THREE.Group>(null);
  const { isNight } = useTheme();

  return (
    <group ref={groupRef}>
      {/* Ambient Audio */}
      <StudioSoundscape />

      {/* Professional Lighting - Enhanced for visibility */}
      <ambientLight intensity={isNight ? 1.5 : 2.0} />
      <hemisphereLight 
        args={['#ffffff', '#666666', isNight ? 1.2 : 1.5]} 
        position={[0, 5, 0]} 
      />
      
      {/* Main directional light */}
      <directionalLight 
        position={[3, 5, 2]} 
        intensity={isNight ? 1.5 : 2.0} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Additional directional lights for better coverage */}
      <directionalLight position={[-3, 5, 2]} intensity={isNight ? 1.2 : 1.5} />
      <directionalLight position={[0, 5, -3]} intensity={isNight ? 1.0 : 1.3} />
      <directionalLight position={[0, 4, 3]} intensity={isNight ? 0.8 : 1.0} />
      
      {/* Ceiling area lights for even illumination */}
      <pointLight position={[-3, 3.2, 0]} intensity={isNight ? 2.5 : 3.0} distance={8} color="#ffffff" />
      <pointLight position={[3, 3.2, 0]} intensity={isNight ? 2.5 : 3.0} distance={8} color="#ffffff" />
      <pointLight position={[0, 3.2, 2]} intensity={isNight ? 2.0 : 2.5} distance={7} color="#ffffff" />
      <pointLight position={[0, 3.2, -2]} intensity={isNight ? 2.0 : 2.5} distance={7} color="#ffffff" />
      
      {/* Corner fill lights */}
      <pointLight position={[-5, 2.5, -3]} intensity={isNight ? 1.5 : 2.0} distance={6} color="#ffa500" />
      <pointLight position={[5, 2.5, -3]} intensity={isNight ? 1.5 : 2.0} distance={6} color="#ffa500" />
      <pointLight position={[-5, 2.5, 3]} intensity={isNight ? 1.5 : 2.0} distance={6} color="#ffa500" />
      <pointLight position={[5, 2.5, 3]} intensity={isNight ? 1.5 : 2.0} distance={6} color="#ffa500" />

      {/* Studio LED accent strips - Enhanced */}
      <mesh position={[0, 3.4, -3.9]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff4444" 
          emissiveIntensity={isNight ? 0.8 : 0.5}
        />
      </mesh>
      <pointLight position={[0, 3.4, -3.8]} color="#ff4444" intensity={isNight ? 3.0 : 2.0} distance={8} />
      
      {/* Additional LED strip on front */}
      <mesh position={[0, 3.4, 3.9]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={isNight ? 0.6 : 0.4}
        />
      </mesh>
      <pointLight position={[0, 3.4, 3.8]} color="#00ffff" intensity={isNight ? 2.5 : 1.5} distance={8} />

      {/* FLOOR - Wood effect - Brightened */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.6} />
      </mesh>
      {/* Floor boards effect */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[-6 + i * 0.8, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.75, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#6a5a4a" : "#5a4a3a"} roughness={0.6} />
        </mesh>
      ))}

      {/* WALLS with acoustic treatment - Brightened */}
      {/* Left wall */}
      <mesh position={[-6, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
      </mesh>
      {/* Right wall */}
      <mesh position={[6, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 3.6, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 1.8, -4]} castShadow receiveShadow>
        <boxGeometry args={[12, 3.6, 0.2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
      </mesh>

      {/* CEILING with panels - Brightened */}
      <mesh position={[0, 3.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 0.1, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
      </mesh>

      {/* ACOUSTIC FOAM PANELS - Walls */}
      <AcousticFoamPanel position={[-5.85, 2.0, -2]} rotation={[0, Math.PI / 2, 0]} size={[1.2, 1.2]} />
      <AcousticFoamPanel position={[-5.85, 2.0, 0]} rotation={[0, Math.PI / 2, 0]} size={[1.2, 1.2]} />
      <AcousticFoamPanel position={[-5.85, 2.0, 2]} rotation={[0, Math.PI / 2, 0]} size={[1.2, 1.2]} />
      
      <AcousticFoamPanel position={[5.85, 2.0, -2]} rotation={[0, -Math.PI / 2, 0]} size={[1.2, 1.2]} />
      <AcousticFoamPanel position={[5.85, 2.0, 0]} rotation={[0, -Math.PI / 2, 0]} size={[1.2, 1.2]} />
      <AcousticFoamPanel position={[5.85, 2.0, 2]} rotation={[0, -Math.PI / 2, 0]} size={[1.2, 1.2]} />
      
      <AcousticFoamPanel position={[-3, 2.0, -3.85]} rotation={[0, 0, 0]} size={[1.5, 1.2]} />
      <AcousticFoamPanel position={[0, 2.0, -3.85]} rotation={[0, 0, 0]} size={[1.5, 1.2]} />
      <AcousticFoamPanel position={[3, 2.0, -3.85]} rotation={[0, 0, 0]} size={[1.5, 1.2]} />

      {/* Bass traps in corners */}
      {[
        [-5.8, 1.8, -3.8],
        [5.8, 1.8, -3.8],
        [-5.8, 1.8, 3.8],
        [5.8, 1.8, 3.8],
      ].map((pos, idx) => (
        <mesh key={`trap-${idx}`} position={pos as Vec3} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 3.6, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      ))}

      {/* CONTROL ROOM SECTION (Right side) */}
      <group position={[2.5, 0, 0.5]}>
        {/* Producer desk */}
        <mesh position={[0, 0.68, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.06, 1.5]} />
          <meshStandardMaterial color="#4a3a2a" roughness={0.5} />
        </mesh>
        
        {/* Mixing Console */}
        <MixingConsole position={[0, 0.7, 0.2]} />
        
        {/* Studio Monitors on desk */}
        <StudioMonitor position={[-0.8, 1.3, -0.3]} rotation={[0, -0.3, 0]} />
        <StudioMonitor position={[0.8, 1.3, -0.3]} rotation={[0, 0.3, 0]} />
        
        {/* Computer Workstation */}
        <ComputerWorkstation position={[1.8, 0, 0]} />
        
        {/* Desk lamps for additional control room lighting */}
        {[-1.2, 1.2].map((x, idx) => (
          <group key={`desk-lamp-${idx}`} position={[x, 0.7, -0.5]}>
            {/* Lamp base */}
            <mesh position={[0, 0.03, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.06, 16]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* Lamp arm */}
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Lamp shade */}
            <mesh position={[0, 0.37, 0]} rotation={[0, 0, 0]} castShadow>
              <coneGeometry args={[0.08, 0.12, 16, 1, true]} />
              <meshStandardMaterial 
                color="#ffa500" 
                emissive="#ffa500"
                emissiveIntensity={isNight ? 0.5 : 0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Lamp light */}
            <pointLight 
              position={[0, 0.35, 0]} 
              color="#ffa500" 
              intensity={isNight ? 2.5 : 1.5} 
              distance={2.5} 
            />
          </group>
        ))}
        
        {/* Producer chair */}
        <group position={[0, 0, 0.8]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.55, -0.15]} castShadow>
            <boxGeometry args={[0.4, 0.4, 0.08]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* RECORDING ROOM SECTION (Left side) */}
      <group position={[-2.5, 0, 1]}>
        {/* Professional Microphones */}
        <ProfessionalMic position={[-1.5, 0, 0]} type="condenser" />
        <ProfessionalMic position={[0, 0, 0.5]} type="condenser" />
        <ProfessionalMic position={[1.5, 0, 0]} type="dynamic" />
        
        {/* Electric Guitar on stand */}
        <ElectricGuitar position={[-1.0, 0, -1.2]} />
        
        {/* Music stand */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0.02, 0]} receiveShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.01, 0.01, 1.2, 8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 1.3, 0]} castShadow>
            <boxGeometry args={[0.35, 0.4, 0.02]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
          </mesh>
        </group>
        
        {/* Headphones on stand */}
        <group position={[1.0, 0, -1.0]}>
          <mesh position={[0, 0.02, 0]} receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.008, 0.008, 0.6, 8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Headphones */}
          <group position={[0, 0.55, 0]}>
            <mesh castShadow>
              <torusGeometry args={[0.08, 0.015, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
            </mesh>
            {[-0.08, 0.08].map((x, idx) => (
              <mesh key={idx} position={[x, -0.02, 0]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* MIDI Keyboard on stand */}
      <group position={[0.5, 0, -2]}>
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[1.3, 0.02, 0.5]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
        </mesh>
        <MIDIKeyboard position={[0, 0.82, 0]} />
      </group>

      {/* RACK EQUIPMENT - Professional gear */}
      <group position={[5.5, 0, 0]}>
        {/* Rack frame */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 2.4, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
        
        {/* Rack units - 8U of equipment */}
        {Array.from({ length: 8 }).map((_, i) => (
          <group key={`rack-unit-${i}`} position={[0, 0.4 + i * 0.2, 0.26]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.18, 0.45]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
            </mesh>
            {/* LED indicators */}
            {[0, 1, 2].map((j) => (
              <mesh key={j} position={[-0.15 + j * 0.05, 0, 0.23]}>
                <cylinderGeometry args={[0.008, 0.008, 0.01, 8]} />
                <meshStandardMaterial 
                  color={j === 0 ? "#00ff00" : j === 1 ? "#ff0000" : "#0000ff"} 
                  emissive={j === 0 ? "#00ff00" : j === 1 ? "#ff0000" : "#0000ff"}
                  emissiveIntensity={0.5}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* GOLD RECORDS on walls */}
      <GoldRecord position={[-5.85, 2.5, 3]} rotation={[0, Math.PI / 2, 0]} />
      <GoldRecord position={[5.85, 2.5, 3]} rotation={[0, -Math.PI / 2, 0]} />
      
      {/* Band posters */}
      {[-2, 0, 2].map((x, idx) => (
        <mesh key={`poster-${idx}`} position={[x, 2.2, -3.85]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.02]} />
          <meshStandardMaterial 
            color={['#4a0000', '#00004a', '#004a00'][idx]} 
            roughness={0.4} 
          />
        </mesh>
      ))}

      {/* Recording indicator light */}
      <RecordingLight position={[0, 3.2, -3.8]} />

      {/* Studio plant (adds life) */}
      <group position={[-5, 0, 3]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.15, 0.6, 16]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh 
              key={i} 
              position={[Math.cos(angle) * 0.15, 0.65, Math.sin(angle) * 0.15]} 
              rotation={[0, angle, 0.5]}
              castShadow
            >
              <coneGeometry args={[0.08, 0.3, 8]} />
              <meshStandardMaterial color="#2a5a2a" roughness={0.7} />
            </mesh>
          );
        })}
      </group>

      {/* Lounge couch (back of room) */}
      <group position={[0, 0, 3.2]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.5, 0.6]} />
          <meshStandardMaterial color="#2a2a3a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.65, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.4, 0.1]} />
          <meshStandardMaterial color="#2a2a3a" roughness={0.7} />
        </mesh>
        {/* Cushions */}
        {[-0.5, 0, 0.5].map((x, idx) => (
          <mesh key={idx} position={[x, 0.6, 0]} castShadow>
            <boxGeometry args={[0.35, 0.08, 0.35]} />
            <meshStandardMaterial color="#3a3a4a" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Studio Cables */}
      <StudioCables />

      {/* Track lighting - Significantly enhanced */}
      {[-3, -1, 1, 3].map((x, idx) => (
        <group key={`track-light-${idx}`} position={[x, 3.5, 1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.08, 0.2, 16]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              emissive="#ffa500" 
              emissiveIntensity={0.3}
              roughness={0.3} 
              metalness={0.6} 
            />
          </mesh>
          <spotLight
            position={[0, 0, 0]}
            angle={0.6}
            penumbra={0.4}
            intensity={isNight ? 4.0 : 3.0}
            castShadow
            color="#ffffff"
            distance={8}
            target-position={[x, 0, 1]}
          />
          <pointLight position={[0, -0.1, 0]} intensity={isNight ? 1.5 : 1.0} distance={3} color="#ffa500" />
        </group>
      ))}
      
      {/* Additional track lights for recording area */}
      {[-2, 0, 2].map((x, idx) => (
        <group key={`track-light-rec-${idx}`} position={[x - 2.5, 3.5, 1.5]}>
          <spotLight
            position={[0, 0, 0]}
            angle={0.5}
            penumbra={0.5}
            intensity={isNight ? 3.5 : 2.5}
            color="#ffffff"
            distance={7}
            target-position={[x - 2.5, 0, 1.5]}
          />
        </group>
      ))}
    </group>
  );
}
