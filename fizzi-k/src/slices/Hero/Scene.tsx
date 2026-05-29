import { FloatingCan } from "@/components/FloatingCan"
import { useGSAP } from "@gsap/react"
import { Environment } from "@react-three/drei"
import { group } from "console"
import gsap from "gsap"
import { useRef } from "react"
import { Group } from "three"

export const Scene = () => {

    const can1Ref = useRef<Group>(null)
    const can2Ref = useRef<Group>(null)
    const can3Ref = useRef<Group>(null)
    const can4Ref = useRef<Group>(null)
    const can5Ref = useRef<Group>(null)
    
    const can1GroupRef = useRef<Group>(null)
    const can2GroupRef = useRef<Group>(null)

    const groupRef = useRef<Group>(null)

    useGSAP(() => {
        if (!can1Ref.current || !can2Ref.current || !can3Ref.current || !can4Ref.current || !can5Ref.current || !can1GroupRef.current || !can2GroupRef.current) return;

        gsap.set(can1Ref.current.position, { x: -1.8 })
        gsap.set(can1Ref.current.rotation, { z: -0.5 })

        gsap.set(can2Ref.current.position, { x: 1.8 })
        gsap.set(can2Ref.current.rotation, { z: 0.5 })

        gsap.set(can3Ref.current.position, { y: 5, z: 2 });
        gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
        gsap.set(can5Ref.current.position, { y: -5 });


        const introTl = gsap.timeline({
            defaults: {
                duration: 3,
                ease: "back.out(1.4)"
            }
        })

        introTl.from(can1GroupRef.current!.position, { y: -5, x:1 }, 0)
        .from(can1GroupRef.current!.position, { z: 3 }, 0)
        .from(can2GroupRef.current!.position, { y: 5 }, 0)
        .from(can2GroupRef.current!.position, { z: 3 }, 0)

        const scrollTl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "power1.out"
            },
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
            },
        });

        scrollTl
            .to(groupRef.current!.rotation, { y: Math.PI * 2 })

            .to(can1Ref.current!.position, { x: 0.2, y: -0.7, z: -2 }, 0)
            .to(can1Ref.current!.rotation, { z: 0.3 }, 0)

            .to(can2Ref.current!.position, { x: 1.1, y: -0.7, z: -2 }, 0)
            .to(can2Ref.current!.rotation, { z: 0.3 }, 0)

            .to(can3Ref.current!.position, { x: 2.1, y: -0.7, z: -1.8 }, 0)
            .to(can3Ref.current!.rotation, { z: 0.3 }, 0)

            .to(can4Ref.current!.position, { x: 0.7, y: 1, z: -1.8 }, 0)
            .to(can4Ref.current!.rotation, { z: 0.3}, 0)

            .to(can5Ref.current!.position, { x: 1.9, y: 1, z: -2.9 }, 0)
            .to(can5Ref.current!.rotation, { z: 0.3 }, 0)

            .to(groupRef.current!.position, { x: 1, duration: 3, ease: "sine.inOut"}, 1.3)
            
    })

    const FLOAT_SPEED = 1.5

    return (
        <group ref={groupRef}>
            <group ref={can1GroupRef}>
                <FloatingCan flavor="blackCherry" floatSpeed={FLOAT_SPEED} ref={can1Ref}/>
            </group>
            <group ref={can2GroupRef}>
                <FloatingCan flavor="grape" floatSpeed={FLOAT_SPEED} ref={can2Ref} />
            </group>
            <FloatingCan flavor="lemonLime" floatSpeed={FLOAT_SPEED} ref={can3Ref} />
            <FloatingCan flavor="strawberryLemonade" floatSpeed={FLOAT_SPEED} ref={can4Ref} />
            <FloatingCan flavor="watermelon" floatSpeed={FLOAT_SPEED} ref={can5Ref} />
            <Environment files={'/hdrs/lobby.hdr'}/>
        </group>
    )
}