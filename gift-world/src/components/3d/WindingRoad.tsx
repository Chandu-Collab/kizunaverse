import { CatmullRomCurve3 } from 'three';
import { getMainRoadCurve, getBranchRoadCurves } from './roadUtils';
import { useMemo } from 'react';

function RoadMesh({ curve, color = '#9B8365', width = 1.2 }) {
  const roadPoints = useMemo(() => curve.getPoints(100), [curve]);
  const vertices = useMemo(() => {
    const verts = [];
    for (let i = 0; i < roadPoints.length; i++) {
      const p = roadPoints[i];
      verts.push(p.x - width / 2, p.y, p.z);
      verts.push(p.x + width / 2, p.y, p.z);
    }
    return verts;
  }, [roadPoints, width]);
  const indices = useMemo(() => {
    return Array.from({ length: roadPoints.length - 1 }, (_, i) => [
      i * 2, i * 2 + 1, i * 2 + 2,
      i * 2 + 1, i * 2 + 3, i * 2 + 2,
    ]).flat();
  }, [roadPoints]);
  return (
    <mesh position={[0, 0, 0]} receiveShadow>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          count={indices.length}
          array={new Uint16Array(indices)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

export default function WindingRoad({ color = '#9B8365', width = 1.2 }) {
  const mainCurve = useMemo(() => getMainRoadCurve(), []);
  const branchCurves = useMemo(() => getBranchRoadCurves(), []);
  return (
    <group>
      <RoadMesh curve={mainCurve} color={color} width={width} />
      {branchCurves.map((curve, i) => (
        <RoadMesh key={i} curve={curve} color={color} width={width * 0.8} />
      ))}
      {/* Signal at intersection */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0.25, 0.12]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0.25, -0.12]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#2ecc40" emissive="#2ecc40" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}
