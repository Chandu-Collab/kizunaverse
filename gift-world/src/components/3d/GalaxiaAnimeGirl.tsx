import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';

// FBXLoader from three.js examples
// @ts-ignore
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const MODEL_PATH = '/galaxia-anime-girl/Animated.fbx';
const ANIMATIONS = {
  walk: '/galaxia-anime-girl/walk.fbx',
  sit: '/galaxia-anime-girl/sit.fbx',
  talk: '/galaxia-anime-girl/talk.fbx',
};

export default function GalaxiaAnimeGirl() {
  const { isNight } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [actions, setActions] = useState<{ [key: string]: THREE.AnimationAction }>({});
  const [activeAction, setActiveAction] = useState<string>('walk');
  const [modelLoaded, setModelLoaded] = useState(false);

  // Load model and animations
  useEffect(() => {
    let model: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    const loader = new FBXLoader();
    let mounted = true;

    loader.load(MODEL_PATH, (fbx: THREE.Group) => {
      if (!mounted) return;
      model = fbx as unknown as THREE.Group;
      if (groupRef.current && model) {
        groupRef.current.add(model);
      }
      mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;
      setModelLoaded(true);

      // Load animations
      Object.entries(ANIMATIONS).forEach(([name, path]) => {
        loader.load(path, (anim: THREE.Group) => {
          if (!mounted || !mixer) return;
          // FBXLoader returns a Group, but animations are attached to the object
          const animObj = anim as any;
          if (animObj.animations && animObj.animations.length > 0) {
            const clip = animObj.animations[0];
            const action = mixer.clipAction(clip);
            setActions((prev) => {
              if (!mounted) return prev;
              return { ...prev, [name]: action };
            });
            if (name === 'walk') {
              action.play();
            }
          }
        });
      });
    });
    return () => {
      mounted = false;
      if (mixerRef.current) mixerRef.current.stopAllAction();
      if (groupRef.current && model) groupRef.current.remove(model as THREE.Object3D);
    };
  }, []);

  // Switch actions
  useEffect(() => {
    if (!modelLoaded || !mixerRef.current) return;
    Object.entries(actions).forEach(([name, action]) => {
      if (name === activeAction) {
        action.reset().play();
      } else {
        action.stop();
      }
    });
  }, [activeAction, actions, modelLoaded]);

  useFrame((state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]} scale={[0.08, 0.08, 0.08]}>
      {/* Night lighting for character visibility */}
      {isNight && (
        <group>
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 2, 2]} intensity={0.8} color="#ff69b4" />
          <pointLight position={[-1, 1, -1]} intensity={0.4} color="#9d4edd" />
        </group>
      )}
      {/* Show loading message if model not loaded */}
      {!modelLoaded && (
        <Html center position={[0, 2.5, 0]}>
          <div style={{ color: '#fff', background: '#222', padding: '12px 24px', borderRadius: 12 }}>
            Loading Galaxia model...
          </div>
        </Html>
      )}
      {/* Simple UI for switching actions */}
      <Html center position={[0, 2.5, 0]}>
        <div style={{ display: 'flex', gap: 12 }}>
          {Object.keys(ANIMATIONS).map((name) => (
            <button
              key={name}
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                background: activeAction === name ? '#b83280' : '#222',
                color: '#fff',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                boxShadow: activeAction === name ? '0 2px 8px #b83280' : '0 2px 8px #0002',
              }}
              onClick={() => setActiveAction(name)}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </Html>
    </group>
  );
}
