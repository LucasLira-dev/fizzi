'use client';

import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { SodaCanProps } from "@/components/SodaCan";
import { Center, Environment, View } from "@react-three/drei";
import { FloatingCan } from "@/components/FloatingCan";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { WavyCircles } from "./WavyCircles";
import gsap from "gsap";
import { Group } from "three";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

const SPINS_ON_CHANGE= 8;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const canRef = useRef<Group>(null);

  function handleFlavorChange(index: number) {
    if (!canRef.current) return;
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;
    
    const tl = gsap.timeline();

    tl.to(canRef.current.rotation, {
      y: currentIndex > nextIndex ? 
      `+=${SPINS_ON_CHANGE * Math.PI * 2}` :
      `-=${SPINS_ON_CHANGE * Math.PI * 2}`,
      duration: 1,
      ease: "power2.inOut",
    }, 
    0
  )
  .to('.background, .wavy-circles-inner, .wavy-circles-outer', {
    backgroundColor: FLAVORS[nextIndex].color,
    duration: 1,
    ease: "power2.inOut",
    fill: FLAVORS[nextIndex].color,
  }, 0)
  .to('.text-wrapper', {
    y: -10,
    opacity: 0,
    duration: 0.2
  }, 0)
  .to(
    {},
    {onStart: () => setCurrentIndex(nextIndex)},
    0.5
  )
  .to('.text-wrapper', {
    y: 0,
    opacity: 1,
    duration: 0.2
  }, 0.7);

    setCurrentIndex(nextIndex);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />
      <WavyCircles className={`absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]`} />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="grid w-full grid-cols-[auto_auto_auto] place-items-center">
        <ArrowButton direction="left" onClick={() => handleFlavorChange(currentIndex - 1)} label="Previous flavor" />
        <View className="aspect-square h-[70vmin] w-[70vmin] min-h-40">
          <Center position={[0,0,1.5]}>
            <FloatingCan 
            ref={canRef}
            flavor={FLAVORS[currentIndex].flavor}
            floatIntensity={0.3}
            rotationIntensity={1}
            />
          </Center>
          <Environment 
          files="/hdrs/lobby.hdr"
          environmentIntensity={0.6}
          environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[1, 1, 1]} />
        </View>

        <ArrowButton direction="right" onClick={() => handleFlavorChange(currentIndex + 1)} label="Next flavor" />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p> {FLAVORS[currentIndex].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
}

function ArrowButton({ direction, onClick, label }: ArrowButtonProps) {
  return (
    <button className="z-20 size-12 rounded-full bg-white/10 border border-white/30 bg-opacity-20 p-3 md:size-16 lg:size-20 hover:bg-opacity-30 focus:outline-none cursor-pointer hover:bg-white/20" onClick={onClick}>
      <ArrowIcon className={clsx( direction === "right" && "-scale-x-100")}/>
      <span className="sr-only">{label}</span>
    </button>
  )
}