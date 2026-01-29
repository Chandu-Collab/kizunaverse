import { CatmullRomCurve3, Vector3 } from 'three';
import { useMemo } from 'react';

export function getMainRoadCurve() {
  // Main winding road
  return new CatmullRomCurve3([
    new Vector3(0, 0.01, -12),
    new Vector3(-2, 0.01, -6),
    new Vector3(0, 0.01, 0),
    new Vector3(2, 0.01, 6),
    new Vector3(0, 0.01, 12),
  ]);
}

export function getBranchRoadCurves() {
  // Match house positions in HomeWorld (read from HomeWorld.tsx)
  // Example house positions (adjust as needed):
  const housePositions = [
    [-8, 0.01, 6],   // left front
    [8, 0.01, 6],    // right front
    [-8, 0.01, -6],  // left back
    [8, 0.01, -6],   // right back
  ];
  return housePositions.map((pos) =>
    new CatmullRomCurve3([
      new Vector3(0, 0.01, 0),
      new Vector3(...pos),
    ])
  );
}

export function getRoadPointAndTangent(curve, t) {
  // t in [0,1]
  const point = curve.getPoint(t);
  const tangent = curve.getTangent(t);
  return { point, tangent };
}
