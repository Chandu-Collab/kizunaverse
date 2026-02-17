// Modular hospital rooms for Hospital3D
import React from "react";
import { Text } from "@react-three/drei";

export function ReceptionRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Reception Desk */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 1, 1]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      {/* Reception Sign */}
      <Text position={[0, 1.2, 0.6]} fontSize={0.3} color="#1976d2">Reception</Text>
      {/* Waiting Chairs */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-1.5 + i, 0.3, -1.2]}>
          <boxGeometry args={[0.7, 0.3, 0.5]} />
          <meshStandardMaterial color="#90caf9" />
        </mesh>
      ))}
    </group>
  );
}

export function WardRoom({ position = [0, 0, 0], beds = 4 }: { position?: [number, number, number], beds?: number }) {
  return (
    <group position={position}>
      {/* Ward Sign */}
      <Text position={[0, 1.2, 2.5]} fontSize={0.3} color="#388e3c">Ward</Text>
      {/* Beds */}
      {[...Array(beds)].map((_, i) => (
        <group key={i} position={[-2 + i * 1.3, 0, 0]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[1, 0.3, 2]} />
            <meshStandardMaterial color="#fffde7" />
          </mesh>
          {/* Pillow */}
          <mesh position={[0, 0.5, 0.7]}>
            <boxGeometry args={[0.7, 0.1, 0.5]} />
            <meshStandardMaterial color="#b3e5fc" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function OperationTheater({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Operation Table */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.4, 0.8]} />
        <meshStandardMaterial color="#cfd8dc" />
      </mesh>
      {/* Overhead Light */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={0.7} />
      </mesh>
      {/* OT Sign */}
      <Text position={[0, 1.2, 1.2]} fontSize={0.3} color="#d32f2f">Operation Theater</Text>
    </group>
  );
}

export function PharmacyRoom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pharmacy Counter */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#a5d6a7" />
      </mesh>
      {/* Pharmacy Sign */}
      <Text position={[0, 1.2, 0.6]} fontSize={0.3} color="#388e3c">Pharmacy</Text>
      {/* Shelves */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-0.8 + i * 0.8, 1, -0.7]}>
          <boxGeometry args={[0.6, 1, 0.2]} />
          <meshStandardMaterial color="#fffde7" />
        </mesh>
      ))}
    </group>
  );
}
