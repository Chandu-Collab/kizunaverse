// Consultation Room
interface ConsultationRoomProps {
  position?: [number, number, number];
  isNight?: boolean;
}
export const ConsultationRoom: React.FC<ConsultationRoomProps> = ({ position = [0, 0, 0], isNight = false }) => {
  const width = 13;
  const depth = 9.5;
  const height = 4.2;
  // Simple human figure for doctor/patient
  const Human: React.FC<{ position: [number, number, number]; color?: string; height?: number }> = ({ position, color = "#607d8b", height = 1.3 }) => (
    <group position={position}>
      <mesh position={[0, height / 2 - 0.18, 0]}>
        <cylinderGeometry args={[0.16, 0.19, height - 0.3, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, height - 0.18, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
    </group>
  );
  return (
    <group position={position}>
      {/* Enhanced Lighting for realism, dynamic for day/night */}
      <ambientLight intensity={isNight ? 0.22 : 0.45} />
      <ambientLight intensity={isNight ? 0.13 : 0.22} />
      <spotLight
        position={[0, 3.2, 0]}
        angle={Math.PI / 5}
        penumbra={0.5}
        intensity={isNight ? 0.7 : 1.1}
        castShadow
        color={isNight ? "#b3c6ff" : "#fffbe7"}
        distance={9}
      />
      <spotLight
        position={[-1.1, 2.5, -0.7]}
        angle={Math.PI / 7}
        penumbra={0.4}
        intensity={isNight ? 0.4 : 0.7}
        castShadow
        color={isNight ? "#b3c6ff" : "#fffbe7"}
        distance={6}
      />
      <pointLight
        position={[0, 1.5, 1.2]}
        intensity={isNight ? 0.18 : 0.3}
        color={isNight ? "#b3c6ff" : "#b3e5fc"}
        distance={5}
      />
            {/* Ceiling Fan */}
            <group position={[0, height - 0.08, 0]}>
              {/* Fan base */}
              <mesh>
                <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
                <meshStandardMaterial color="#888" />
              </mesh>
              {/* Fan rod */}
              <mesh position={[0, -0.18, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.36, 12]} />
                <meshStandardMaterial color="#888" />
              </mesh>
              {/* Fan blades */}
              {[0, 1, 2].map(i => (
                <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]} position={[0, -0.36, 0]}>
                  <boxGeometry args={[1.1, 0.07, 0.16]} />
                  <meshStandardMaterial color="#444" />
                </mesh>
              ))}
            </group>
            {/* AC Vent (wall-mounted) */}
            <mesh position={[width / 2 - 0.7, height - 0.08, 0]}>
              <boxGeometry args={[0.5, 0.12, 0.18]} />
              <meshStandardMaterial color="#b0bec5" />
            </mesh>
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[width, 0.12, depth]} />
        <meshStandardMaterial color="#e3e0d7" />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, height, 0]} receiveShadow>
        <boxGeometry args={[width, 0.09, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
        <boxGeometry args={[width, height, 0.12]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.12, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.12, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Entry Door */}
      <group position={[0, 1, depth / 2 - 0.06]}>
        <mesh>
          <boxGeometry args={[1, 2, 0.1]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        <mesh position={[0.35, 0, 0.06]}>
          <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      </group>
      {/* Doctor's Desk */}
      <mesh position={[-4.5, 0.55, -2.8]} castShadow>
        <boxGeometry args={[2.8, 0.7, 1.5]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      {/* Doctor's Chair */}
      <mesh position={[-4.5, 0.35, -4.2]} castShadow>
        <boxGeometry args={[1, 0.35, 1]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* Patient's Chair */}
      <mesh position={[-4.5, 0.35, 1.8]} castShadow>
        <boxGeometry args={[1, 0.35, 1]} />
        <meshStandardMaterial color="#ffcc80" />
      </mesh>
      {/* Visitor Chair */}
      <mesh position={[4.5, 0.35, 3.2]} castShadow>
        <boxGeometry args={[1, 0.35, 1]} />
        <meshStandardMaterial color="#ffe082" />
      </mesh>
      {/* Bookshelf */}
      <mesh position={[6, 1.1, -3.8]}>
        <boxGeometry args={[1, 2.8, 1.5]} />
        <meshStandardMaterial color="#a1887f" />
      </mesh>
      {/* Doctor */}
      <Human position={[-4.5, 0.7, -2.8]} color="#1976d2" height={1.25} />
      {/* Patient */}
      <Human position={[-4.5, 0.7, 1.8]} color="#388e3c" height={1.2} />
      {/* Visitor */}
      <Human position={[4.5, 0.7, 3.2]} color="#c62828" height={1.2} />
      <mesh position={[-1.1, 0.75, -0.7]}>
        <boxGeometry args={[0.18, 0.04, 0.13]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[-1.1, 0.78, -0.62]}>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
        <meshStandardMaterial color="#1976d2" />
      </mesh>
      {/* Stethoscope (simple ring) */}
      <mesh position={[-1.3, 0.8, -0.7]}>
        <torusGeometry args={[0.06, 0.012, 8, 24]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      {/* BP Monitor (box + tube) */}
      <mesh position={[-1.4, 0.7, -0.5]}>
        <boxGeometry args={[0.13, 0.06, 0.09]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      <mesh position={[-1.4, 0.73, -0.41]}>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Medical Chart/Clipboard */}
      <mesh position={[-1.25, 0.75, -0.9]}>
        <boxGeometry args={[0.16, 0.02, 0.22]} />
        <meshStandardMaterial color="#ffe082" />
      </mesh>
      {/* Storage Cabinet */}
      <mesh position={[width / 2 - 0.4, 0.7, 0.7]} castShadow>
        <boxGeometry args={[0.5, 1.1, 0.4]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      {/* Shelf with sample medicines/files */}
      <mesh position={[width / 2 - 0.7, 1.5, 0.7]}>
        <boxGeometry args={[0.4, 0.12, 0.18]} />
        <meshStandardMaterial color="#ffe082" />
      </mesh>
      {/* Privacy Curtain */}
      <mesh position={[0.7, 1.1, 0]} rotation={[0, Math.PI / 2.2, 0]}>
        <boxGeometry args={[0.05, 2.2, 1.5]} />
        <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} />
      </mesh>
      {/* Wall Decor: Certificate */}
      <mesh position={[-width / 2 + 0.13, 2.1, -0.7]}>
        <boxGeometry args={[0.5, 0.3, 0.04]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Wall Poster/Health Chart */}
      <mesh position={[-width / 2 + 0.13, 1.5, 0.7]}>
        <boxGeometry args={[0.5, 0.35, 0.04]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* Wall Clock */}
      <mesh position={[width / 2 - 0.7, 2.2, -depth / 2 + 0.09]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 24]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Waste Bin (desk) */}
      <mesh position={[-width / 2 + 0.4, 0.18, 0.5]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.28, 16]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      {/* Waste Bin (exam bed) */}
      <mesh position={[1.7, 0.18, 0.7]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.22, 12]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      {/* Hand Sanitizer (bottle) */}
      <mesh position={[-1.5, 0.7, -0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.18, 12]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* Wall-mounted Hand Sanitizer */}
      <mesh position={[-width / 2 + 0.18, 1.2, 0.7]}>
        <boxGeometry args={[0.09, 0.18, 0.06]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* Sink with Tap */}
      <mesh position={[width / 2 - 0.3, 0.85, -0.7]}>
        <cylinderGeometry args={[0.13, 0.13, 0.09, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[width / 2 - 0.3, 0.95, -0.7]}>
        <cylinderGeometry args={[0.02, 0.02, 0.13, 8]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      {/* AC Vent */}
      <mesh position={[width / 2 - 0.7, height - 0.08, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.18]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      {/* Emergency Call Button */}
      <mesh position={[-width / 2 + 0.18, 1.1, -0.7]}>
        <boxGeometry args={[0.09, 0.09, 0.04]} />
        <meshStandardMaterial color="#d32f2f" />
      </mesh>
      {/* Nameplate/Doctor Sign */}
      <mesh position={[-1.1, 1.7, -1.2]}>
        <boxGeometry args={[0.5, 0.13, 0.04]} />
        <meshStandardMaterial color="#1976d2" />
      </mesh>
      {/* Potted Plant */}
      <mesh position={[width / 2 - 0.4, 0.32, -0.7]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.22, 16]} />
        <meshStandardMaterial color="#8d6748" />
      </mesh>
      <mesh position={[width / 2 - 0.4, 0.5, -0.7]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#3fa34d" />
      </mesh>
      {/* Doctor (seated) */}
      <Human position={[-1.1, 0.7, -1.2]} color="#1976d2" height={1.15} />
      {/* Patient (seated) */}
      <Human position={[0.2, 0.7, -1.2]} color="#c62828" height={1.1} />
    </group>
  );
};
// Waiting Area Room
export function WaitingAreaRoom({ position = [0, 0, 0], isNight = false }: { position?: [number, number, number], isNight?: boolean }) {
      // Fan and AC positions
    // TV position: wall-mounted, visible to all seats
  // Room dimensions
  const width = 12.5;
  const depth = 9.5;
  const height = 4.2;
  // Helper for simple human figure
  function Human({ position, color = "#607d8b", height = 1.3 }: { position: [number, number, number], color?: string, height?: number }) {
    return (
      <group position={position}>
        <mesh position={[0, height / 2 - 0.18, 0]}>
          <cylinderGeometry args={[0.16, 0.19, height - 0.3, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0, height - 0.18, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#ffe0b2" />
        </mesh>
      </group>
    );
  }
  return (
    <group position={position}>
      {/* Enhanced lighting for realism, dynamic for day/night */}
      <ambientLight intensity={isNight ? 0.22 : 0.45} />
      <spotLight
        position={[0, 3.5, 0]}
        angle={Math.PI / 5}
        penumbra={0.5}
        intensity={isNight ? 0.7 : 1.1}
        castShadow
        color={isNight ? "#b3c6ff" : "#fffbe7"}
        distance={10}
      />
      <pointLight
        position={[0, 1.5, 2.2]}
        intensity={isNight ? 0.18 : 0.3}
        color={isNight ? "#b3c6ff" : "#b3e5fc"}
        distance={6}
      />
      {/* Ceiling Fan */}
      <group position={[0, height - 0.08, 0]}>
        {/* Fan base */}
        <mesh>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* Fan rod */}
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.36, 12]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* Fan blades */}
        {[0, 1, 2].map(i => (
          <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]} position={[0, -0.36, 0]}>
            <boxGeometry args={[1.2, 0.07, 0.18]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        ))}
      </group>
      {/* Visible AC unit (wall-mounted) */}
      <group position={[width / 2 - 1.2, height - 0.3, 0]}>
        <mesh>
          <boxGeometry args={[1.1, 0.28, 0.28]} />
          <meshStandardMaterial color="#b0bec5" />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <boxGeometry args={[0.9, 0.08, 0.04]} />
          <meshStandardMaterial color="#90caf9" />
        </mesh>
      </group>
      {/* Additional fill lighting, dynamic for day/night */}
      <ambientLight intensity={isNight ? 0.18 : 0.38} />
      <spotLight position={[0, 3.2, 0]} angle={Math.PI / 6} penumbra={0.5} intensity={isNight ? 0.5 : 0.9} castShadow color={isNight ? "#b3c6ff" : "#fffbe7"} distance={8} />
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[width, 0.13, depth]} />
        <meshStandardMaterial color="#e3e0d7" />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, height, 0]} receiveShadow>
        <boxGeometry args={[width, 0.11, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
        <boxGeometry args={[width, height, 0.13]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.13, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.13, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Entry Door */}
      <group position={[0, 1.1, depth / 2 - 0.07]}>
        <mesh>
          <boxGeometry args={[1.1, 2.1, 0.11]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        <mesh position={[0.4, 0, 0.07]}>
          <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      </group>
      {/* Seating: 2 rows of 3 chairs, but replace one chair with a play mat and toy */}
      {[...Array(2)].map((_, row) => (
        [...Array(3)].map((_, col) => {
          // Replace the middle chair in the front row with a play mat
          if (row === 0 && col === 1) {
            return (
              <group key={`playmat-${row}-${col}`}>
                {/* Play mat */}
                <mesh position={[-2 + col * 2, 0.22, -0.8 + row * 1.3]}>
                  <cylinderGeometry args={[0.5, 0.5, 0.05, 24]} />
                  <meshStandardMaterial color="#ffe082" />
                </mesh>
                {/* Toy (ball) */}
                <mesh position={[-2 + col * 2 + 0.3, 0.32, -0.8 + row * 1.3 + 0.2]}>
                  <sphereGeometry args={[0.12, 16, 16]} />
                  <meshStandardMaterial color="#f06292" />
                </mesh>
              </group>
            );
          }
          return (
            <group key={`chair-${row}-${col}`}>
              <mesh position={[-2 + col * 2, 0.4, -0.8 + row * 1.3]} castShadow>
                <boxGeometry args={[1, 0.4, 0.6]} />
                <meshStandardMaterial color="#b3e5fc" />
              </mesh>
              {/* Human on first and last chair */}
              {(row === 0 && col === 0) && <Human position={[-2 + col * 2, 0.85, -0.8 + row * 1.3]} color="#607d8b" height={1.1} />}
              {(row === 1 && col === 2) && <Human position={[-2 + col * 2, 0.85, -0.8 + row * 1.3]} color="#c62828" height={1.2} />}
            </group>
          );
        })
      ))}
      {/* Magazine Table with charging station */}
      <group position={[0, 0.32, 1.2]}>
        <mesh>
          <boxGeometry args={[1.6, 0.18, 0.7]} />
          <meshStandardMaterial color="#ffe082" />
        </mesh>
        {/* Charging station: small box and cable */}
        <mesh position={[0.6, 0.13, 0.18]}>
          <boxGeometry args={[0.18, 0.08, 0.12]} />
          <meshStandardMaterial color="#bdbdbd" />
        </mesh>
        {/* Cable (visual only) */}
        <mesh position={[0.6, 0.17, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>
            {/* Wall lamp for softer lighting */}
            <group position={[-width / 2 + 0.18, 2.1, 0]}>
              <mesh>
                <cylinderGeometry args={[0.09, 0.09, 0.18, 16]} />
                <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={0.7} />
              </mesh>
              {/* Lamp base */}
              <mesh position={[0, -0.13, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
                <meshStandardMaterial color="#888" />
              </mesh>
            </group>
            {/* Security camera (wall-mounted, visual only) */}
            <mesh position={[width / 2 - 0.18, 2.5, -depth / 2 + 0.3]}>
              <boxGeometry args={[0.18, 0.12, 0.12]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            {/* Extra poster for decor */}
            <mesh position={[-width / 2 + 0.18, 1.2, depth / 2 - 0.3]}>
              <boxGeometry args={[0.5, 0.35, 0.04]} />
              <meshStandardMaterial color="#90caf9" />
            </mesh>
      {/* Water Dispenser */}
      <group position={[width / 2 - 0.6, 0.5, -depth / 2 + 0.7]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.6, 16]} />
          <meshStandardMaterial color="#b3e5fc" />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </group>
      {/* Wall Clock */}
      <mesh position={[width / 2 - 1.1, 2.3, -depth / 2 + 0.09]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Trash Bin */}
      <mesh position={[width / 2 - 0.5, 0.2, -depth / 2 + 0.5]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.35, 16]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      {/* Hand Sanitizer Stand */}
      <mesh position={[-width / 2 + 0.5, 0.5, -depth / 2 + 1.2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* TV/Info Screen (Entertainment) */}
      <mesh position={[0, 1.7, -depth / 2 + 0.18]}>
        <boxGeometry args={[2.2, 1.1, 0.09]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* TV Stand (optional, for realism) */}
      <mesh position={[0, 0.55, -depth / 2 + 0.18]}>
        <boxGeometry args={[2.2, 0.12, 0.18]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* TV label */}
      <Text position={[0, 2.3, -depth / 2 + 0.18]} fontSize={0.18} color="#fff" anchorX="center" anchorY="middle">Television</Text>
      {/* Emergency Exit Sign */}
      <mesh position={[-width / 2 + 0.7, 2.7, depth / 2 - 0.1]}>
        <boxGeometry args={[0.7, 0.18, 0.05]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
      <Text position={[-width / 2 + 0.7, 2.7, depth / 2 - 0.1]} fontSize={0.18} color="#fff" anchorX="center" anchorY="middle">EXIT</Text>
      {/* More diverse human figures */}
      {/* Elderly person */}
      <Human position={[2, 0.85, -0.8]} color="#bdb76b" height={1.05} />
      {/* Child */}
      <Human position={[-2, 0.7, 0.5]} color="#f06292" height={0.8} />
      {/* Wheelchair space (empty chair) */}
      <mesh position={[2, 0.4, 0.5]} castShadow>
        <boxGeometry args={[1, 0.4, 0.6]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      {/* AC Vent */}
      <mesh position={[width / 2 - 1.2, height - 0.06, -depth / 2 + 1.2]}>
        <boxGeometry args={[0.7, 0.12, 0.18]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      {/* Fire Extinguisher */}
      <group position={[-width / 2 + 0.3, 0.5, -depth / 2 + 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.32, 16]} />
          <meshStandardMaterial color="#d32f2f" />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.18, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>
      {/* Window (optional, for open feel) */}
      <mesh position={[width / 2 - 1.5, 1.3, depth / 2 - 0.09]}>
        <boxGeometry args={[1.2, 0.7, 0.06]} />
        <meshStandardMaterial color="#90caf9" transparent opacity={0.5} />
      </mesh>
      {/* Potted Plant */}
      <mesh position={[-width / 2 + 0.5, 0.3, depth / 2 - 0.7]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        <meshStandardMaterial color="#8d6748" />
      </mesh>
      <mesh position={[-width / 2 + 0.5, 0.6, depth / 2 - 0.7]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#3fa34d" />
      </mesh>
      {/* Wall Art */}
      <mesh position={[width / 2 - 0.7, 1.1, -depth / 2 + 0.2]}>
        <boxGeometry args={[0.5, 0.35, 0.04]} />
        <meshStandardMaterial color="#fbc02d" />
      </mesh>
      {/* Digital Queue Display */}
      <mesh position={[0, 2.2, -depth / 2 + 0.09]}>
        <boxGeometry args={[1.1, 0.32, 0.07]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Signage */}
      <Text position={[0, 2.7, depth / 2 - 0.1]} fontSize={0.32} color="#1976d2" anchorX="center" anchorY="middle">Waiting Area</Text>
    </group>
  );
}
// Modular hospital rooms for Hospital3D
import React from "react";
import { Text } from "@react-three/drei";

export function ReceptionRoom({ position = [0, 0, 0], isNight = false }: { position?: [number, number, number], isNight?: boolean }) {
        // Enhanced lighting for realism
        // Soft ambient, warm spot, and subtle fill for night/day
      // Helper for simple human figure
      function Human({ position, color = "#fbc02d", height = 1.5 }: { position: [number, number, number], color?: string, height?: number }) {
        return (
          <group position={position}>
            {/* Body */}
            <mesh position={[0, height / 2 - 0.25, 0]}>
              <cylinderGeometry args={[0.18, 0.22, height - 0.4, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Head */}
            <mesh position={[0, height - 0.25, 0]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color="#ffe0b2" />
            </mesh>
          </group>
        );
      }
      {/* Visitor sitting on first chair */}
    // Entry door dimensions
    const doorWidth = 1.2;
    const doorHeight = 2.2;
  // Room dimensions
  const width = 13;
  const depth = 9.5;
  const height = 4.2;
  return (
    <group position={position}>
      {/* Ambient light for soft fill, dynamic for day/night */}
      <ambientLight intensity={isNight ? 0.22 : 0.45} />
      {/* Warm/cool spot light from ceiling center */}
      <spotLight
        position={[0, 3.5, 0]}
        angle={Math.PI / 5}
        penumbra={0.5}
        intensity={isNight ? 0.7 : 1.1}
        castShadow
        color={isNight ? "#b3c6ff" : "#fffbe7"}
        distance={10}
      />
      {/* Subtle fill from entry for night effect */}
      <pointLight
        position={[0, 1.5, 2.5]}
        intensity={isNight ? 0.18 : 0.3}
        color={isNight ? "#b3c6ff" : "#b3e5fc"}
        distance={6}
      />
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[width, 0.15, depth]} />
        <meshStandardMaterial color="#e3e0d7" />
      </mesh>
      {/* Ceiling (Top Wall) */}
      <mesh position={[0, height, 0]} receiveShadow>
        <boxGeometry args={[width, 0.12, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
            {/* Ceiling Fan */}
            <group position={[0, height - 0.08, 0]}>
              {/* Fan base */}
              <mesh>
                <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
                <meshStandardMaterial color="#888" />
              </mesh>
              {/* Fan rod */}
              <mesh position={[0, -0.18, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.36, 12]} />
                <meshStandardMaterial color="#888" />
              </mesh>
              {/* Fan blades */}
              {[0, 1, 2].map(i => (
                <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]} position={[0, -0.36, 0]}>
                  <boxGeometry args={[1.2, 0.07, 0.18]} />
                  <meshStandardMaterial color="#444" />
                </mesh>
              ))}
            </group>
      {/* Back Wall */}
      <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
        <boxGeometry args={[width, height, 0.15]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.15, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Right Wall */}
      <mesh position={[width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.15, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
        {/* Receptionist standing in front of desk */}
        <Human position={[0, 0.75, -2.2]} color="#1976d2" height={1.3} />
      {/* Reception Desk */}
      <mesh position={[0, 0.6, -1.5]} castShadow>
        <boxGeometry args={[2.5, 1.2, 0.8]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      {/* Computer/Monitor on Desk */}
      <mesh position={[0, 1.2, -1.1]} castShadow>
        <boxGeometry args={[0.7, 0.4, 0.08]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 0.95, -0.8]} castShadow>
        <boxGeometry args={[0.5, 0.07, 0.18]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Telephone/Intercom */}
      <mesh position={[-0.7, 1.05, -1.1]} castShadow>
        <boxGeometry args={[0.18, 0.08, 0.18]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Queue Token Machine */}
      <mesh position={[width / 2 - 0.6, 0.7, depth / 2 - 1.2]} castShadow>
        <boxGeometry args={[0.3, 0.7, 0.3]} />
        <meshStandardMaterial color="#d32f2f" />
      </mesh>
      {/* Wall Clock */}
      <mesh position={[width / 2 - 1.2, 2.3, -depth / 2 + 0.09]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Notice Board */}
      <mesh position={[-width / 2 + 1.1, 1.5, -depth / 2 + 0.09]}>
        <boxGeometry args={[1.2, 0.7, 0.06]} />
        <meshStandardMaterial color="#388e3c" />
      </mesh>
      {/* Hand Sanitizer Stand */}
      <mesh position={[-width / 2 + 0.5, 0.5, -depth / 2 + 1.2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* Wheelchair */}
      <group position={[width / 2 - 1.2, 0.3, depth / 2 - 0.7]}>
        <mesh>
          <boxGeometry args={[0.5, 0.18, 0.5]} />
          <meshStandardMaterial color="#757575" />
        </mesh>
        <mesh position={[0, 0.18, -0.18]}>
          <boxGeometry args={[0.5, 0.18, 0.14]} />
          <meshStandardMaterial color="#90caf9" />
        </mesh>
        <mesh position={[-0.18, -0.09, 0.18]}>
          <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0.18, -0.09, 0.18]}>
          <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>
      {/* Trash Bin */}
      <mesh position={[width / 2 - 0.5, 0.2, -depth / 2 + 0.5]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.35, 16]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      {/* Directional Signage */}
      <Text position={[0, 2.7, depth / 2 - 0.1]} fontSize={0.28} color="#1976d2" anchorX="center" anchorY="middle">Consultation →</Text>
      <Text position={[0, 2.4, depth / 2 - 0.1]} fontSize={0.28} color="#d32f2f" anchorX="center" anchorY="middle">← Emergency</Text>
      {/* Security Camera (visual only) */}
      <mesh position={[width / 2 - 0.3, 2.7, -depth / 2 + 0.3]}>
        <boxGeometry args={[0.18, 0.12, 0.12]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Wall Art */}
      <mesh position={[-width / 2 + 0.7, 1.1, depth / 2 - 0.2]}>
        <boxGeometry args={[0.5, 0.35, 0.04]} />
        <meshStandardMaterial color="#fbc02d" />
      </mesh>
      {/* Magazine Rack */}
      <mesh position={[width / 2 - 0.7, 0.4, 1.7]}>
        <boxGeometry args={[0.3, 0.5, 0.18]} />
        <meshStandardMaterial color="#8d6748" />
      </mesh>
      {/* Potted Plant for decor */}
      <mesh position={[-width / 2 + 0.5, 0.3, depth / 2 - 0.7]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        <meshStandardMaterial color="#8d6748" />
      </mesh>
      <mesh position={[-width / 2 + 0.5, 0.6, depth / 2 - 0.7]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#3fa34d" />
      </mesh>
      {/* Entry Door (front wall, can be opened/closed visually) */}
      <group position={[0, doorHeight / 2, depth / 2 - 0.08]}>
        {/* Door frame */}
        <mesh>
          <boxGeometry args={[doorWidth + 0.12, doorHeight + 0.12, 0.12]} />
          <meshStandardMaterial color="#8d6748" />
        </mesh>
        {/* Door panel */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[doorWidth, doorHeight, 0.08]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        {/* Door handle */}
        <mesh position={[doorWidth / 2 - 0.18, 0, 0.04]}>
          <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      </group>
          {/* Ceiling Light */}
          <mesh position={[0, height - 0.04, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.08, 24]} />
            <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={0.7} />
          </mesh>
          {/* AC Vent */}
          <mesh position={[width / 2 - 1.2, height - 0.06, -depth / 2 + 1.2]}>
            <boxGeometry args={[0.7, 0.12, 0.18]} />
            <meshStandardMaterial color="#b0bec5" />
          </mesh>
    </group>
  );
}

interface WardRoomProps {
  position?: [number, number, number];
  beds?: number;
  isNight?: boolean;
}
export const WardRoom: React.FC<WardRoomProps> = ({ position = [0, 0, 0], beds = 4, isNight = false }) => {
    // ...existing code...
    // Floor
    const floorColor = "#e3e0d7";
    // ...existing code...
  const width = 13;
  const depth = 9.5;
  const height = 4.2;
  // Simple human figure for patients/visitors
  const Human: React.FC<{ position: [number, number, number]; color?: string; height?: number }> = ({ position, color = "#607d8b", height = 1.3 }) => (
    <group position={position}>
      <mesh position={[0, height / 2 - 0.18, 0]}>
        <cylinderGeometry args={[0.16, 0.19, height - 0.3, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, height - 0.18, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
    </group>
  );
  return (
    <group position={position}>
      {/* Enhanced Lighting for realism, dynamic for day/night */}
            {/* Floor */}
            <mesh position={[0, 0, 0]} receiveShadow>
              <boxGeometry args={[width, 0.13, depth]} />
              <meshStandardMaterial color={floorColor} />
            </mesh>
            {/* Ceiling */}
            <mesh position={[0, height, 0]} receiveShadow>
              <boxGeometry args={[width, 0.11, depth]} />
              <meshStandardMaterial color="#eaeaea" />
            </mesh>
            {/* Back Wall */}
            <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
              <boxGeometry args={[width, height, 0.13]} />
              <meshStandardMaterial color="#eaeaea" />
            </mesh>
            {/* Left Wall */}
            <mesh position={[-width / 2, height / 2, 0]} receiveShadow>
              <boxGeometry args={[0.13, height, depth]} />
              <meshStandardMaterial color="#eaeaea" />
            </mesh>
            {/* Right Wall */}
            <mesh position={[width / 2, height / 2, 0]} receiveShadow>
              <boxGeometry args={[0.13, height, depth]} />
              <meshStandardMaterial color="#eaeaea" />
            </mesh>
            {/* Entry Door (front wall) */}
            <group position={[0, 1, depth / 2 - 0.07]}>
              <mesh>
                <boxGeometry args={[1.2, 2.1, 0.11]} />
                <meshStandardMaterial color="#a67c52" />
              </mesh>
              <mesh position={[0.4, 0, 0.07]}>
                <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
                <meshStandardMaterial color="#ffd700" />
              </mesh>
            </group>
      <ambientLight intensity={isNight ? 0.22 : 0.45} />
      <spotLight
        position={[0, 3.2, 0]}
        angle={Math.PI / 5}
        penumbra={0.5}
        intensity={isNight ? 0.7 : 1.1}
        castShadow
        color={isNight ? "#b3c6ff" : "#fffbe7"}
        distance={10}
      />
      <pointLight
        position={[0, 1.5, 1.2]}
        intensity={isNight ? 0.18 : 0.3}
        color={isNight ? "#b3c6ff" : "#b3e5fc"}
        distance={6}
      />
      {/* Ceiling Fan */}
      <group position={[0, height - 0.08, 0]}>
        <mesh>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.36, 12]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {[0, 1, 2].map(i => (
          <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]} position={[0, -0.36, 0]}>
            <boxGeometry args={[1.2, 0.07, 0.18]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        ))}
      </group>
      {/* AC Vent */}
      <mesh position={[width / 2 - 1.2, height - 0.08, 0]}>
        <boxGeometry args={[0.7, 0.12, 0.18]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      {/* Ward Sign */}
      <Text position={[0, 2.7, depth / 2 - 0.1]} fontSize={0.32} color="#388e3c" anchorX="center" anchorY="middle">Ward</Text>
      {/* Beds, privacy curtains, bedside tables, IV stands, monitors, visitor chairs, nurse call buttons */}
      {[...Array(beds)].map((_, i) => {
        const x = -2.5 + i * 1.6;
        return (
          <group key={i} position={[x, 0, 0]}>
            {/* Bed */}
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[1.2, 0.3, 2]} />
              <meshStandardMaterial color="#fffde7" />
            </mesh>
            {/* Pillow */}
            <mesh position={[0, 0.5, 0.7]}>
              <boxGeometry args={[0.7, 0.1, 0.5]} />
              <meshStandardMaterial color="#b3e5fc" />
            </mesh>
            {/* Bedside Table */}
            <mesh position={[-0.7, 0.45, 0.7]}>
              <boxGeometry args={[0.3, 0.4, 0.3]} />
              <meshStandardMaterial color="#ffe082" />
            </mesh>
            {/* IV Stand */}
            <mesh position={[0.7, 0.9, -0.7]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2, 12]} />
              <meshStandardMaterial color="#bdbdbd" />
            </mesh>
            {/* Monitor */}
            <mesh position={[0.7, 1.3, 0.7]}>
              <boxGeometry args={[0.3, 0.18, 0.05]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            {/* Visitor Chair */}
            <mesh position={[-0.7, 0.35, -0.7]}>
              <boxGeometry args={[0.5, 0.35, 0.5]} />
              <meshStandardMaterial color="#bdbdbd" />
            </mesh>
            {/* Nurse Call Button */}
            <mesh position={[0.7, 1.1, 1.1]}>
              <boxGeometry args={[0.09, 0.09, 0.04]} />
              <meshStandardMaterial color="#d32f2f" />
            </mesh>
            {/* Reading Light above bed */}
            <mesh position={[0, 1.7, -1.1]}>
              <cylinderGeometry args={[0.09, 0.09, 0.13, 16]} />
              <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={isNight ? 0.5 : 0.8} />
            </mesh>
            {/* Patient (in bed) */}
            <Human position={[0, 0.7, 0.2]} color="#c62828" height={1.1} />
            {/* Privacy Curtain between beds (except after last bed) */}
            {i < beds - 1 && (
              <mesh position={[(1.6 / 2), 1.1, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.05, 2.2, 2]} />
                <meshStandardMaterial color="#b3e5fc" transparent opacity={0.5} />
              </mesh>
            )}
          </group>
        );
      })}
            {/* Night Light (soft, low-level) */}
            <mesh position={[0, 0.18, -depth / 2 + 0.2]}>
              <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} />
              <meshStandardMaterial color="#b3e5fc" emissive="#b3e5fc" emissiveIntensity={isNight ? 0.4 : 0.15} />
            </mesh>
            {/* Emergency Exit Sign with Light */}
            <mesh position={[-width / 2 + 0.7, 2.7, depth / 2 - 0.1]}>
              <boxGeometry args={[0.7, 0.18, 0.05]} />
              <meshStandardMaterial color="#43a047" emissive="#43a047" emissiveIntensity={0.7} />
            </mesh>
      {/* Wall Clock */}
      <mesh position={[width / 2 - 0.7, 2.2, -depth / 2 + 0.09]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 24]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Potted Plant for decor */}
      <mesh position={[-width / 2 + 0.5, 0.3, depth / 2 - 0.7]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        <meshStandardMaterial color="#8d6748" />
      </mesh>
      <mesh position={[-width / 2 + 0.5, 0.6, depth / 2 - 0.7]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#3fa34d" />
      </mesh>
    </group>
  );
};

export function OperationTheater({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  // Room dimensions
  const width = 11;
  const depth = 9;
  const height = 3.7;
  // Simple human figure for staff
  const Human = ({ position, color = "#607d8b", height = 1.3 }: { position: [number, number, number], color?: string, height?: number }) => (
    <mesh position={position}>
      <cylinderGeometry args={[0.22, 0.22, height! * 0.45, 16]} />
      <meshStandardMaterial color={color} />
      {/* Head */}
      <mesh position={[0, height! * 0.28, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
    </mesh>
  );
  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[width, 0.13, depth]} />
        <meshStandardMaterial color="#e3e0d7" />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, height, 0]} receiveShadow>
        <boxGeometry args={[width, 0.11, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, height / 2, -depth / 2]} receiveShadow>
        <boxGeometry args={[width, height, 0.13]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.13, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.13, height, depth]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      {/* Entry Door */}
      <group position={[0, 1.1, depth / 2 - 0.07]}>
        <mesh>
          <boxGeometry args={[1.1, 2.1, 0.11]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        <mesh position={[0.4, 0, 0.07]}>
          <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      </group>
      {/* Operation Table */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.4, 0.4, 1.1]} />
        <meshStandardMaterial color="#cfd8dc" />
      </mesh>
      {/* Surgical Overhead Lights (spaced) */}
      <mesh position={[-2.2, height - 0.2, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.13, 32]} />
        <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[2.2, height - 0.2, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.13, 32]} />
        <meshStandardMaterial color="#fffde7" emissive="#fffde7" emissiveIntensity={0.8} />
      </mesh>
      {/* Anesthesia Machine */}
      <group position={[-4.2, 0.6, -3.5]}>
        <mesh>
          <boxGeometry args={[0.5, 0.7, 0.4]} />
          <meshStandardMaterial color="#b0bec5" />
        </mesh>
        <mesh position={[0, 0.3, 0.18]}>
          <cylinderGeometry args={[0.09, 0.09, 0.18, 16]} />
          <meshStandardMaterial color="#43a047" />
        </mesh>
      </group>
      {/* Instrument Table */}
      <mesh position={[4.2, 0.45, -3.5]}>
        <boxGeometry args={[0.8, 0.3, 0.5]} />
        <meshStandardMaterial color="#ffe082" />
      </mesh>
      {/* Patient Monitor */}
      <mesh position={[-4.2, 1.2, 4.2]}>
        <boxGeometry args={[0.5, 0.3, 0.09]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Defibrillator/Crash Cart */}
      <group position={[5.2, 0.5, 4.8]}>
        <mesh>
          <boxGeometry args={[0.5, 0.4, 0.3]} />
          <meshStandardMaterial color="#bdbdbd" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.2]} />
          <meshStandardMaterial color="#d32f2f" />
        </mesh>
      </group>
      {/* Instrument Tray/Table with Tools */}
      <group position={[4.2, 0.45, 3.5]}>
        <mesh>
          <boxGeometry args={[0.8, 0.3, 0.5]} />
          <meshStandardMaterial color="#ffe082" />
        </mesh>
        {/* Tools */}
        {[0,1,2,3].map(i => (
          <mesh key={i} position={[-0.7+i*0.45, 0.22, 0.18]}>
            <boxGeometry args={[0.12, 0.03, 0.04]} />
            <meshStandardMaterial color="#bdbdbd" />
          </mesh>
        ))}
      </group>
      {/* IV Poles and Drip Bags */}
      <group position={[-6.2, 0.9, 5.2]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 12]} />
          <meshStandardMaterial color="#bdbdbd" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#90caf9" />
        </mesh>
      </group>
      {/* Waste Bins: Biohazard & Sharps */}
      <mesh position={[width/2-0.5, 0.2, -depth/2+4.2]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.35, 16]} />
        <meshStandardMaterial color="#d32f2f" />
      </mesh>
      <mesh position={[width/2-0.7, 0.2, -depth/2+5]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.35, 16]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      {/* Air Conditioning/HEPA Filter Unit */}
      <mesh position={[width/2-1.2, height-0.06, -depth/2+1.2]}>
        <boxGeometry args={[0.7, 0.12, 0.18]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      {/* Handwashing Sink with Soap Dispenser */}
      <mesh position={[-width/2+0.3, 0.85, -5.2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.09, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[-width/2+0.3, 0.95, -5.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.13, 8]} />
        <meshStandardMaterial color="#bdbdbd" />
      </mesh>
      {/* Wall Signage: Sterile Area */}
      <mesh position={[0, 2.5, -depth/2+3.2]}>
        <boxGeometry args={[1.1, 0.32, 0.07]} />
        <meshStandardMaterial color="#388e3c" />
      </mesh>
      {/* Floor Markings: Sterile/Non-Sterile */}
      <mesh position={[0, 0.14, 5.2]} rotation={[-Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[3.2, 3.2, 0.02, 32]} />
        <meshStandardMaterial color="#b3e5fc" transparent opacity={0.10} />
      </mesh>
      {/* Staff in Action Poses */}
      <Human position={[0, 0.7, -4.2]} color="#1976d2" height={1.25} /> {/* Surgeon */}
      <Human position={[-4.2, 0.7, 4.2]} color="#388e3c" height={1.2} /> {/* Nurse */}
      <Human position={[4.2, 0.7, 4.2]} color="#c62828" height={1.2} /> {/* Anesthetist */}
      <Human position={[3.2, 0.7, 0.2]} color="#607d8b" height={1.2} /> {/* Assistant */}
      {/* Wall Clock */}
      <mesh position={[width / 2 - 0.7, 2.2, -depth / 2 + 0.09]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 24]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* OT Sign */}
      <Text position={[0, 2.7, depth / 2 - 0.1]} fontSize={0.32} color="#d32f2f" anchorX="center" anchorY="middle">Operation Theater</Text>
      {/* Emergency Exit Sign */}
      <mesh position={[-width / 2 + 0.7, 2.7, depth / 2 - 0.1]}>
        <boxGeometry args={[0.7, 0.18, 0.05]} />
        <meshStandardMaterial color="#43a047" emissive="#43a047" emissiveIntensity={0.7} />
      </mesh>
      <Text position={[-width / 2 + 0.7, 2.7, depth / 2 - 0.1]} fontSize={0.18} color="#fff" anchorX="center" anchorY="middle">EXIT</Text>
      {/* Wall-Mounted Storage */}
      <mesh position={[width / 2 - 0.5, 1.2, 0.7]}>
        <boxGeometry args={[0.7, 0.4, 0.3]} />
        <meshStandardMaterial color="#8d6748" />
      </mesh>
      {/* Waste Bin */}
      <mesh position={[width / 2 - 0.5, 0.2, -depth / 2 + 0.5]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.35, 16]} />
        <meshStandardMaterial color="#607d8b" />
      </mesh>
      {/* Hand Sanitizer */}
      <mesh position={[-width / 2 + 0.18, 1.2, 0.7]}>
        <boxGeometry args={[0.09, 0.18, 0.06]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
    </group>
  );
}

