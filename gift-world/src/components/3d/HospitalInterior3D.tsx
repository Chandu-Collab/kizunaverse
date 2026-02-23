
import { FC } from "react";
import { ReceptionRoom, WaitingAreaRoom, ConsultationRoom, WardRoom, OperationTheater, EmergencyRoom, ICURoom, PreOpPostOpRoom, LaboratoryRoom, PharmacyRoom, RadiologyRoom, MaternityDeliveryRoom } from "./HospitalRooms";
import { Sky, Environment } from "@react-three/drei";

interface HospitalInterior3DProps {
  position?: [number, number, number];
  currentRoom?: string;
  viewMode?: string;
  isNight?: boolean;
}

const HospitalInterior3D: FC<HospitalInterior3DProps> = ({
  position = [0, 0, 0],
  currentRoom = "exterior",
  viewMode = "exterior",
  isNight = false,
}) => {
  // Cleaned up for redesign
  return (
    <group position={position}>
      {/* Realistic lighting and environment */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Sky sunPosition={[100, 20, 100]} inclination={0.6} azimuth={0.25} distance={1000} />
      {/* Optionally, add Environment for HDR lighting */}
      {/* <Environment preset="city" /> */}

      {/* Simple floor for context */}
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <boxGeometry args={[12, 0.02, 12]} />
        <meshStandardMaterial color="#e3eafc" />
      </mesh>

      {/* Render rooms based on currentRoom prop */}
      {currentRoom === "reception" && <ReceptionRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "waiting" && <WaitingAreaRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "consultation" && <ConsultationRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "ward" && <WardRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "operation" && <OperationTheater position={[0, 0, 0]} />}
      {currentRoom === "emergency" && <EmergencyRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "icu" && <ICURoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "recovery" && <PreOpPostOpRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "laboratory" && <LaboratoryRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "pharmacy" && <PharmacyRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "radiology" && <RadiologyRoom position={[0, 0, 0]} isNight={isNight} />}
      {currentRoom === "maternity" && <MaternityDeliveryRoom position={[0, 0, 0]} isNight={isNight} />}
      {/* Add more rooms here as you build them */}
    </group>
  );
};

export default HospitalInterior3D;
