import { CatmullRomCurve3, Vector3 } from 'three';
import { useMemo } from 'react';

export function getMainRoadCurve() {
  // Enhanced main road that connects to all areas
  return new CatmullRomCurve3([
    new Vector3(0, 0.01, -15),   // Extended start
    new Vector3(-2, 0.01, -10),  // Back curve left
    new Vector3(0, 0.01, -6),    // Back center
    new Vector3(2, 0.01, -2),    // Middle right
    new Vector3(0, 0.01, 0),     // Center intersection
    new Vector3(-1.5, 0.01, 3),  // Front left curve
    new Vector3(0, 0.01, 6),     // Front center
    new Vector3(1.5, 0.01, 10),  // Far front curve
    new Vector3(0, 0.01, 15),    // Extended end
  ]);
}

export function getBranchRoadCurves() {
  // Enhanced road system connecting all 8 houses properly
  const housePositions = [
    [-10, 0.01, 8],   // left front
    [10, 0.01, 8],    // right front
    [-10, 0.01, -8],  // left back
    [10, 0.01, -8],   // right back
    [-6, 0.01, 12],   // left far
    [6, 0.01, 12],    // right far
    [-6, 0.01, -12],  // left far back
    [6, 0.01, -12],   // right far back
  ];

  // Create proper branching roads from strategic points on main road
  return housePositions.map((pos, index) => {
    let mainRoadConnection;
    
    // Connect houses to appropriate points on the main road curve
    switch(index) {
      case 0: // left front house
        mainRoadConnection = [-1.5, 0.01, 6];
        break;
      case 1: // right front house
        mainRoadConnection = [1.5, 0.01, 6];
        break;
      case 2: // left back house
        mainRoadConnection = [-1.5, 0.01, -6];
        break;
      case 3: // right back house
        mainRoadConnection = [1.5, 0.01, -6];
        break;
      case 4: // left far house
        mainRoadConnection = [-1, 0.01, 10];
        break;
      case 5: // right far house
        mainRoadConnection = [1, 0.01, 10];
        break;
      case 6: // left far back house
        mainRoadConnection = [-1, 0.01, -10];
        break;
      case 7: // right far back house
        mainRoadConnection = [1, 0.01, -10];
        break;
      default:
        mainRoadConnection = [0, 0.01, 0];
    }

    return new CatmullRomCurve3([
      new Vector3(mainRoadConnection[0], mainRoadConnection[1], mainRoadConnection[2]),
      new Vector3(pos[0] * 0.6, pos[1], pos[2] * 0.7), // curved intermediate point
      new Vector3(pos[0] * 0.85, pos[1], pos[2] * 0.9), // closer intermediate point
      new Vector3(...pos),
    ]);
  });
}

export function getRoadPointAndTangent(curve: CatmullRomCurve3, t: number) {
  // t in [0,1]
  const point = curve.getPoint(t);
  const tangent = curve.getTangent(t);
  return { point, tangent };
}
