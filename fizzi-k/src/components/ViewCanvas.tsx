'use client';

import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";

export const ViewCanvas = () => {
    return (
        <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 30 }}
        style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 30, pointerEvents: "none" }}
        dpr={[1, 1.5]} 
        gl={{ antialias: true }}

        >
            <View.Port />
        </Canvas>
    )
}