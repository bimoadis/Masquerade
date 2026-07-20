'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function TrenchParticles(props) {
  const ref = useRef();
  
  // Custom random generator to avoid external dependencies like maath
  const [positions] = useState(() => {
    const arr = new Float32Array(900);
    for (let i = 0; i < 900; i += 3) {
      // Generate coordinates inside a sphere of radius 1.5
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.5;
      
      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 22;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#B01010"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function TrenchWaves() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const position = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // Simulating simple wave motion representing the abyss bottom
        const z = Math.sin(x * 1.5 + time * 0.4) * 0.15 + 
                  Math.cos(y * 1.2 + time * 0.3) * 0.12;
                  
        position.setZ(i, z);
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -0.8, -0.5]}>
      <planeGeometry args={[10, 6, 24, 24]} />
      <meshBasicMaterial 
        color="#6B0000" 
        wireframe 
        transparent 
        opacity={0.35} 
      />
    </mesh>
  );
}

export default function TrenchCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 -z-10 bg-void-deeper overflow-hidden pointer-events-none">
      {/* Background Gradient overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(13, 0, 0, 0) 20%, rgba(13, 0, 0, 0.8) 100%)',
        }}
      />
      <Canvas camera={{ position: [0, 0, 1.2] }}>
        <ambientLight intensity={0.5} />
        <TrenchParticles />
        <TrenchWaves />
      </Canvas>
    </div>
  );
}
