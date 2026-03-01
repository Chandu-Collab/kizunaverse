// BirthdayZone cleaned up for new implementation


import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
const Hospital3D = dynamic(() => import("@/components/3d/Hospital3D"), { ssr: false });
const HospitalInterior3D = dynamic(() => import("@/components/3d/HospitalInterior3D"), { ssr: false });

import Scene from "@/components/3d/Scene";
import ParticleBackground from "@/components/ui/ParticleBackground";
import WeatherControls from "@/components/ui/WeatherControls";
import WeatherSystem from "@/components/3d/weather/WeatherSystem";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { hospitalRoomMeanings } from "@/data/hospital-room-meanings";
import { Text } from '@react-three/drei';

type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'monsoon' | 'winter';
type HospitalRoomKey =
  | 'reception'
  | 'waiting'
  | 'consultation'
  | 'ward'
  | 'operation'
  | 'pharmacy'
  | 'store'
  | 'generator'
  | 'staffRest'
  | 'exterior'
  | 'icu'
  | 'recovery'
  | 'emergency'
  | 'laboratory'
  | 'radiology'
  | 'maternity'
  | 'pediatric'
  | 'isolation'
  | 'nurseStations'
  | 'bathroomRestroom'
  | 'cafeteriaCanteen'
  | 'administrativeOffices'
  | 'ambulanceBayEntrance'
  | 'physiotherapyRehab'
  | 'bloodBank'
  | 'mortuary'
  | 'chapelPrayerRoom';

const roomMeaningKeyMap: Record<HospitalRoomKey, keyof typeof hospitalRoomMeanings> = {
  exterior: 'exterior',
  reception: 'reception',
  waiting: 'waitingArea',
  consultation: 'consultation',
  ward: 'ward',
  operation: 'operationTheatre',
  pharmacy: 'pharmacy',
  store: 'storeRoom',
  generator: 'generatorRoom',
  staffRest: 'restroom',
  icu: 'icu',
  recovery: 'recoveryRoom',
  emergency: 'emergency',
  laboratory: 'laboratory',
  radiology: 'radiology',
  maternity: 'ward',
  pediatric: 'pediatric',
  isolation: 'isolationRoom',
  nurseStations: 'nurseStation',
  bathroomRestroom: 'restroom',
  cafeteriaCanteen: 'cafeteria',
  administrativeOffices: 'adminOffice',
  ambulanceBayEntrance: 'ambulanceBay',
  physiotherapyRehab: 'physiotherapy',
  bloodBank: 'bloodBank',
  mortuary: 'mortuary',
  chapelPrayerRoom: 'chapel',
};

const roomLabels: Record<HospitalRoomKey, string> = {
  reception: 'Reception',
  waiting: 'Waiting Area',
  consultation: 'Consultation',
  ward: 'Ward',
  operation: 'Operation',
  pharmacy: 'Pharmacy',
  store: 'Store',
  generator: 'Generator',
  staffRest: 'Staff Rest',
  exterior: 'Exterior',
  icu: 'ICU',
  recovery: 'Recovery',
  emergency: 'Emergency',
  laboratory: 'Laboratory',
  radiology: 'Radiology',
  maternity: 'Maternity',
  pediatric: 'Pediatric',
  isolation: 'Isolation',
  nurseStations: 'Nurse Station',
  bathroomRestroom: 'Bathroom/Restroom',
  cafeteriaCanteen: 'Cafeteria/Canteen',
  administrativeOffices: 'Admin Offices',
  ambulanceBayEntrance: 'Ambulance Bay',
  physiotherapyRehab: 'Physiotherapy/Rehab',
  bloodBank: 'Blood Bank',
  mortuary: 'Mortuary',
  chapelPrayerRoom: 'Chapel/Prayer Room',
};

const interiorRooms: Array<{ key: HospitalRoomKey; label: string }> = [
  { key: 'reception', label: 'Reception' },
  { key: 'waiting', label: 'Waiting Area' },
  { key: 'consultation', label: 'Consultation' },
  { key: 'ward', label: 'Ward' },
  { key: 'operation', label: 'Operation' },
  { key: 'pharmacy', label: 'Pharmacy' },
  { key: 'store', label: 'Store' },
  { key: 'generator', label: 'Generator' },
  { key: 'staffRest', label: 'Staff Rest' },
  { key: 'icu', label: 'ICU' },
  { key: 'recovery', label: 'Recovery' },
  { key: 'emergency', label: 'Emergency' },
  { key: 'laboratory', label: 'Laboratory' },
  { key: 'radiology', label: 'Radiology' },
  { key: 'maternity', label: 'Maternity' },
  { key: 'pediatric', label: 'Pediatric' },
  { key: 'isolation', label: 'Isolation' },
  { key: 'nurseStations', label: 'Nurse Station' },
  { key: 'bathroomRestroom', label: 'Bathroom/Restroom' },
  { key: 'cafeteriaCanteen', label: 'Cafeteria/Canteen' },
  { key: 'administrativeOffices', label: 'Admin Offices' },
  { key: 'ambulanceBayEntrance', label: 'Ambulance Bay' },
  { key: 'physiotherapyRehab', label: 'Physiotherapy/Rehab' },
  { key: 'bloodBank', label: 'Blood Bank' },
  { key: 'mortuary', label: 'Mortuary' },
  { key: 'chapelPrayerRoom', label: 'Chapel/Prayer Room' },
];

export default function BirthdayZone() {
  // Weather state management (pattern from YourSpace)
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [autoWeather, setAutoWeather] = useState(true);
  const { isNight, toggleTheme } = useTheme();
  const [isAutoCycle, setIsAutoCycle] = useState(true);

  // Hospital view state
  const [viewMode, setViewMode] = useState<'exterior' | 'interior' | 'hospitalSection'>('exterior');
  const [currentRoom, setCurrentRoom] = useState<HospitalRoomKey>('exterior');

  // Handler for WeatherControls
  const handleWeatherChange = (newWeather: WeatherType) => {
    setWeather(newWeather);
    setAutoWeather(false);
  };
  const handleToggleAuto = () => setAutoWeather((prev) => !prev);

  // Floor state for hospital section
  const [sectionFloor, setSectionFloor] = useState<'ground' | 'first' | 'second'>('ground');

  const selectedRoomMeaning = hospitalRoomMeanings[roomMeaningKeyMap[currentRoom]];
  const selectedRoomLabel = roomLabels[currentRoom];

  // Auto day/night cycle every 30s
  React.useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      toggleTheme();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAutoCycle, toggleTheme]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Theme toggle button */}
      <ThemeToggle />

      {/* Day/Night auto-cycle toggle */}
      <div className="absolute top-4 left-24 z-40 bg-black/40 rounded-lg px-4 py-2 flex items-center gap-3 shadow">
        <span className="text-white text-sm">Auto day/night:</span>
        <button
          onClick={() => setIsAutoCycle((prev) => !prev)}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            isAutoCycle
              ? 'bg-emerald-500/30 text-emerald-100 border-emerald-300/40'
              : 'bg-white/10 text-white/70 border-white/20'
          }`}
        >
          {isAutoCycle ? 'On (30s)' : 'Off'}
        </button>
      </div>

      {/* Particle background for ambiance, responds to weather and night */}
      <ParticleBackground weather={weather} isNight={isNight} />

      {/* Weather controls UI */}
      <WeatherControls
        onWeatherChange={handleWeatherChange}
        currentWeather={weather}
        autoWeather={autoWeather}
        onToggleAuto={handleToggleAuto}
      />

      {/* Hospital 3D View Controls */}
      <div className="absolute top-4 left-4 z-40">
        <div className="bg-black/60 rounded-lg p-4 flex flex-col gap-2 shadow">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => {
                setViewMode('exterior');
                setCurrentRoom('exterior');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'exterior'
                  ? 'bg-white/30 text-white border-white/50'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏥 Exterior View
            </button>
            <button
              onClick={() => {
                setViewMode('interior');
                setCurrentRoom('reception');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'interior'
                  ? 'bg-white/30 text-white border-white/50'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏛️ Interior View
            </button>
            <button
              onClick={() => {
                setViewMode('hospitalSection');
              }}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                viewMode === 'hospitalSection'
                  ? 'bg-emerald-500/30 text-white border-emerald-300/40'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              🏢 Hospital Section
            </button>
          </div>
          {/* Floor selector for hospital section */}
          {viewMode === 'hospitalSection' && (
            <div className="flex gap-2 mb-2">
              <span className="text-white text-xs">Floor:</span>
              <button
                onClick={() => setSectionFloor('ground')}
                className={`px-2 py-1 rounded text-xs border transition-colors ${sectionFloor === 'ground' ? 'bg-blue-500/40 text-white border-blue-300' : 'bg-white/10 text-white/70 border-white/20'}`}
              >
                Ground
              </button>
              <button
                onClick={() => setSectionFloor('first')}
                className={`px-2 py-1 rounded text-xs border transition-colors ${sectionFloor === 'first' ? 'bg-blue-500/40 text-white border-blue-300' : 'bg-white/10 text-white/70 border-white/20'}`}
              >
                First
              </button>
              <button
                onClick={() => setSectionFloor('second')}
                className={`px-2 py-1 rounded text-xs border transition-colors ${sectionFloor === 'second' ? 'bg-blue-500/40 text-white border-blue-300' : 'bg-white/10 text-white/70 border-white/20'}`}
              >
                Second
              </button>
            </div>
          )}
          {viewMode === 'interior' && (
            <div className="grid grid-cols-3 gap-1 text-xs">
              {interiorRooms.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCurrentRoom(key)}
                  className={`p-1 rounded ${currentRoom === key ? 'bg-blue-500/50 text-white border border-blue-300' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {viewMode === 'interior' && (
        <div className="room-meaning-wrap absolute top-28 right-4 z-40 max-w-sm">
          <div key={currentRoom} className="room-meaning-card relative p-4">
            <div className="room-meaning-title text-[11px] mb-1">Tagline</div>
            <div className="room-meaning-room text-sm font-semibold mb-2">{selectedRoomLabel}</div>
            <p className="room-meaning-text text-sm">
              {selectedRoomMeaning.split('\n').map((line, index) => (
                <span
                  key={`${currentRoom}-line-${index}`}
                  className="room-meaning-line"
                  style={{ animationDelay: `${180 + index * 90}ms` }}
                >
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}

      {/* 3D Scene with weather system, pass isNight for lighting */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Scene cameraPosition={[0, 12, 32]} enableControls enableShadows>
          {/* Weather system overlays (rain, clouds, sun, etc.) */}
          <WeatherSystem weatherType={weather} autoChange={autoWeather} />
          {viewMode === 'exterior' ? (
            <Hospital3D position={[0, 0, 0]} isNight={isNight} />
          ) : viewMode === 'interior' ? (
            <HospitalInterior3D position={[0, 0, 0]} currentRoom={currentRoom} viewMode={viewMode} isNight={isNight} />
          ) : viewMode === 'hospitalSection' ? (
            <HospitalSectionLayout isNight={isNight} floor={sectionFloor} />
          ) : null}
        </Scene>
      </div>
    </div>
  );
}

// Hospital Section Layout: map ground and first floor rooms
function HospitalSectionLayout({ isNight, floor = 'ground' }: { isNight?: boolean; floor?: 'ground' | 'first' | 'second' }) {
  type Vec3 = [number, number, number];
  type RoomDef = { name: string; room: HospitalRoomKey; position: Vec3; rotation: Vec3 };

  // Define rooms for each floor
  const ROOM_SPACING = 18;
  const ROOM_DEPTH = 18;
  const FLOOR_HEIGHT = 6;
  const CORRIDOR_WIDTH = 6;
  const ROOM_WIDTH = 8;

  // Floor Y positions
  const groundY = 0;
  const firstY = FLOOR_HEIGHT;
  const secondY = FLOOR_HEIGHT * 2;

  // Room definitions
  const groundFloorRooms: RoomDef[] = [
    { name: 'Reception', room: 'reception', position: [0, groundY, 0], rotation: [0, 0, 0] },
    { name: 'Waiting Area', room: 'waiting', position: [ROOM_SPACING, groundY, 0], rotation: [0, 0, 0] },
    { name: 'Emergency', room: 'emergency', position: [-ROOM_SPACING, groundY, 0], rotation: [0, 0, 0] },
    { name: 'Admin Offices', room: 'administrativeOffices', position: [-ROOM_SPACING, groundY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Back Exit', room: 'emergency', position: [0, groundY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Cafeteria', room: 'cafeteriaCanteen', position: [ROOM_SPACING, groundY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];
  const firstFloorRooms: RoomDef[] = [
    { name: 'ICU', room: 'icu', position: [0, firstY, 0], rotation: [0, 0, 0] },
    { name: 'Operation', room: 'operation', position: [ROOM_SPACING, firstY, 0], rotation: [0, 0, 0] },
    { name: 'Ward', room: 'ward', position: [-ROOM_SPACING, firstY, 0], rotation: [0, 0, 0] },
    { name: 'Maternity', room: 'maternity', position: [0, firstY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Pediatric', room: 'pediatric', position: [ROOM_SPACING, firstY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Isolation', room: 'isolation', position: [-ROOM_SPACING, firstY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];
  // Second floor: example rooms, adjust as needed
  const secondFloorRooms: RoomDef[] = [
    { name: 'Radiology', room: 'radiology', position: [0, secondY, 0], rotation: [0, 0, 0] },
    { name: 'Laboratory', room: 'laboratory', position: [ROOM_SPACING, secondY, 0], rotation: [0, 0, 0] },
    { name: 'Blood Bank', room: 'bloodBank', position: [-ROOM_SPACING, secondY, 0], rotation: [0, 0, 0] },
    { name: 'Physiotherapy', room: 'physiotherapyRehab', position: [0, secondY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Staff Rest', room: 'staffRest', position: [ROOM_SPACING, secondY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
    { name: 'Mortuary', room: 'mortuary', position: [-ROOM_SPACING, secondY, -ROOM_DEPTH], rotation: [0, Math.PI, 0] },
  ];

  let rooms: typeof groundFloorRooms = groundFloorRooms;
  if (floor === 'first') rooms = firstFloorRooms;
  if (floor === 'second') rooms = secondFloorRooms;

  const minZ = Math.min(...rooms.map(r => r.position[2]));
  const maxZ = Math.max(...rooms.map(r => r.position[2]));
  const corridorY = floor === 'ground' ? groundY : floor === 'first' ? firstY : secondY;
  const corridorFrontZ = maxZ + ROOM_DEPTH / 2 - CORRIDOR_WIDTH / 2;
  const corridorBackZ = minZ - ROOM_DEPTH / 2 + CORRIDOR_WIDTH / 2;
  const minX = Math.min(...rooms.map(r => r.position[0]));
  const maxX = Math.max(...rooms.map(r => r.position[0]));
  const corridorWidth = Math.abs(maxX - minX) + ROOM_WIDTH;

  function Corridor({ from, to, y = 0 }: { from: Vec3; to: Vec3; y?: number }) {
    const mid: Vec3 = [(from[0] + to[0]) / 2, y, (from[2] + to[2]) / 2];
    const dx = Math.abs(from[0] - to[0]);
    const dz = Math.abs(from[2] - to[2]);
    const corridorScale: Vec3 = [dx > dz ? dx : CORRIDOR_WIDTH, 0.1, dz > dx ? dz : CORRIDOR_WIDTH];
    return (
      <mesh position={mid} scale={corridorScale} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e0e0e0" opacity={0.3} transparent />
      </mesh>
    );
  }

  const ambulanceBay: { name: string; room: HospitalRoomKey; position: Vec3 } = {
    name: 'Ambulance Bay',
    room: 'ambulanceBayEntrance',
    position: [0, groundY, ROOM_SPACING + 4],
  };
  return (
    <group>
      {/* Ambulance Bay at the very front (only on ground floor view) */}
      {floor === 'ground' && (
        <group position={ambulanceBay.position}>
          <HospitalInterior3D currentRoom={ambulanceBay.room} isNight={isNight} position={[0, 0, 0]} />
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.7}
            color="#1976d2"
            anchorX="center"
            anchorY="middle"
          >
            {ambulanceBay.name}
          </Text>
        </group>
      )}
      {/* Corridors between all adjacent rooms */}
      {rooms.map((roomA, i, arr) =>
        arr.slice(i + 1).map((roomB, j) => {
          const isAdjacent = (roomA.position[0] === roomB.position[0] && Math.abs(roomA.position[2] - roomB.position[2]) === ROOM_DEPTH)
            || (roomA.position[2] === roomB.position[2] && Math.abs(roomA.position[0] - roomB.position[0]) === ROOM_SPACING);
          if (!isAdjacent) return null;
          return <Corridor key={roomA.name + '-' + roomB.name} from={roomA.position} to={roomB.position} y={roomA.position[1]} />;
        })
      )}
      {/* Front corridor */}
      <mesh position={[0, corridorY, corridorFrontZ]} scale={[corridorWidth, 0.1, CORRIDOR_WIDTH]} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e0e0e0" opacity={0.3} transparent />
      </mesh>
      {/* Back corridor */}
      <mesh position={[0, corridorY, corridorBackZ]} scale={[corridorWidth, 0.1, CORRIDOR_WIDTH]} visible={true}>
        <boxGeometry />
        <meshStandardMaterial color="#e0e0e0" opacity={0.3} transparent />
      </mesh>
      {/* Render rooms for selected floor */}
      <group>
        {rooms.map(({ name, room, position, rotation }) => (
          <group key={room + name} position={position} rotation={rotation}>
            <HospitalInterior3D currentRoom={room} isNight={isNight} position={[0, 0, 0]} />
            <Text
              position={[0, 2.5, 0]}
              fontSize={0.7}
              color="#1976d2"
              anchorX="center"
              anchorY="middle"
            >
              {name}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}