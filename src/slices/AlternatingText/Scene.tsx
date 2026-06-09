'use client';

import { FloatingCan } from "@/components/FloatingCan"
import { Group } from "three"
import { useRef } from "react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Scene = () => {

    const canRef = useRef<Group>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)", true);

    const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];


    useGSAP(() => {
        const sections = gsap.utils.toArray(".alternating-section");

        const scrolTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".alternating-text-view",
                endTrigger: ".alternating-text-container",
                pin: true,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            }
        })

        sections.forEach((_, index) => {
            if (!canRef.current) return;
            if (index == 0) return;

            const isOdd = index % 2 !== 0;
        
            const xPosition = isDesktop ? (isOdd ? "-1" : "1") : 0;
            const yRotation = isDesktop ? (isOdd ? ".4" : "-.4") : 0;

            scrolTl.to(canRef.current.position, {
                x: xPosition,
                ease: "circ.inOut",
                delay: 0.5,
            })
            .to(canRef.current.rotation, {
                y: yRotation,
                ease: "back.inOut",
            }, "<")
            .to('.alternating-text-container', {
                backgroundColor: gsap.utils.wrap(bgColors, index)
            })
        })  
    }, [isDesktop])

    return (
        <group 
        ref={canRef} 
        position-x={isDesktop ? 1 : 0} 
        position-y={isDesktop ? -0.1 : 0}>
            <FloatingCan flavor="strawberryLemonade"/>
            <Environment files="/hdrs/lobby.hdr" environmentIntensity={1.5}/>
        </group>
    )
}