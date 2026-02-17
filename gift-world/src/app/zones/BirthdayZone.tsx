
// BirthdayZone cleaned up for new implementation

import dynamic from "next/dynamic";
import { Suspense } from "react";
const Hospital3D = dynamic(() => import("@/components/3d/Hospital3D"), { ssr: false });
import Scene from "@/components/3d/Scene";

export default function BirthdayZone() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
      <Scene cameraPosition={[0, 12, 32]} enableControls enableShadows>
        <Hospital3D position={[0, 0, 0]} />
      </Scene>
    </div>
  );
}
