'use client';

import { FloatingCan } from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, OrbitControls } from "@react-three/drei";
import { Text } from "@react-three/drei";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/src/all";
import { truncate } from "node:fs";

import { useRef } from "react";
import * as Three from "three";

type SkyDiveProps = {
    flavor: Content.SkyDiveSliceDefaultPrimary["flavors"];
    sentence: Content.SkyDiveSliceDefaultPrimary["sentence"];
}

export const Scene = ({ flavor, sentence }: SkyDiveProps) => {

    const groupRef = useRef<Three.Group>(null);
    const canRef = useRef<Three.Group>(null);
    const cloudsRef = useRef<Three.Group>(null);
    const cloud1Ref = useRef<Three.Group>(null);
    const cloud2Ref = useRef<Three.Group>(null);
    const wordsRef = useRef<Three.Group>(null);

    const ANGLE = 75 * (Math.PI / 180);

    const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
    const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

    const getXYPositions = (distance: number) => ({
        x: getXPosition(distance),
        y: getYPosition(-1 * distance)
    })

    useGSAP(() => {
        if (!canRef.current || !cloudsRef.current || !cloud1Ref.current || !cloud2Ref.current || !wordsRef.current) return;

        gsap.set(cloudsRef.current.position, { z: 10 });
        gsap.set(canRef.current.position, {
            ...getXYPositions(-4),
        });

        gsap.set(wordsRef.current.children.map((word) => word.position), {
            ...getXYPositions(7),
            z: 2
        })

        gsap.to(canRef.current.rotation, {
            y: Math.PI * 2, 
            duration: 1.7,
            repeat: -1,
            ease: "none",
        });

        const DISTANCE = 15;
        const DURATION = 6;

        gsap.set([cloud1Ref.current.position, cloud2Ref.current.position], {
            ...getXYPositions(DISTANCE)
        })

        gsap.to(cloud1Ref.current.position, {
            y: `+=${getYPosition(DISTANCE * 2)}`,
            x: `+=${getXPosition(DISTANCE * -2)}`,
            duration: DURATION,
            repeat: -1,
            ease: "none",
        });

        gsap.to(cloud2Ref.current.position, {
            y: `+=${getYPosition(DISTANCE * 2)}`,
            x: `+=${getXPosition(DISTANCE * -2)}`,
            duration: DURATION,
            delay: DURATION / 2,
            repeat: -1,
            ease: "none",
        });

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".skydive",
                start: "top top",
                end: "+=2000",
                pin: true,
                scrub: 1.5,
            }
        })

        scrollTl.to('body', {
            backgroundColor: "#C0F0F5",
            duration: 0.1,
            overwrite: "auto",
        })
        .to(cloudsRef.current.position, {
            z: 0,
            duration: .3,
        }, 0)
        .to(canRef.current.position, {
            x: 0,
            y: 0,
            duration: .3,
            ease: "back.out(1.7)",
        })
        .to(wordsRef.current.children.map((word) => word.position), {
            keyframes: [
                {
                    x: 0,
                    y: 0,
                    z: -1,
                }, 
                {
                    ...getXYPositions(-7),
                    z: -7,
                }
            ],
            stagger: 0.3,
        }, 0)
        .to(canRef.current.position, {
            ...getXYPositions(4),
            duration: .5,
            ease: "back.in(1.7)",
        })
        .to(cloudsRef.current.position, { z: 7, duration: 0.5 });
    })

    return (
        <group ref={groupRef}>
            <group rotation={[0,0,0.5]}>
                <FloatingCan 
                ref={canRef}
                flavor={flavor} 
                floatIntensity={3}
                floatSpeed={3}
                rotationIntensity={0}
                >
                    <pointLight intensity={40} color="#8C0413" decay={0.6} />
                </FloatingCan>
            </group>
            <group>

            </group>
            <group ref={cloudsRef}>
                <Clouds>
                    <Cloud ref={cloud1Ref} bounds={[10,10,2]} />
                    <Cloud ref={cloud2Ref} bounds={[10,10,2]} />
                </Clouds>
            </group>

            <group ref={wordsRef}>
                {
                    sentence && <TextComponent sentence={sentence} color="#F97315" />
                }
            </group>
            {/* <OrbitControls enableZoom={true} enablePan={true} /> */}
            <ambientLight intensity={2} color="#F97315" />
            <Environment files="/hdrs/field.hdr" environmentIntensity={1.5} />
        </group>
    )
}

function TextComponent ({ sentence, color = "white" }: { sentence: string, color: string }){

    const words = sentence.toUpperCase().split(" ");

    const material = new Three.MeshLambertMaterial();
    const isDesktop = useMediaQuery("(min-width: 950px)", true);

    return words.map((word: string, wordIndex: number) => (
        <Text
        key={`${word}-${wordIndex}`}
        scale={isDesktop ? 1: 0.5}
        color={color}
        material={material}
        font="/fonts/Alpino-Variable.woff"
        fontWeight={900}
        anchorX={"center"}
        anchorY={"middle"} 
        characters="ABCDEFJKLMNOPQRSTUVWYZ!,.?'"
        >
            {word}
        </Text>
    ))
}