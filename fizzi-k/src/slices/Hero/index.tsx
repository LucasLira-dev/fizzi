'use client';

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { asText } from "@prismicio/client/richtext";
import { Button } from "@/components/Button";
import { TextSplitter } from "@/components/TextSpliter";
import gsap from "gsap";
import { useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import { Scene } from "./Scene";
import { Bubbles } from "./Bubbles";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

gsap.registerPlugin(ScrollTrigger);
/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  useGSAP(() => {
    const introTl = gsap.timeline();

    if (window.scrollY < 20) {
        introTl.set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.out",
          stagger: 0.4,
          delay: 0.3
        })
        .from('.hero-subheading', {
          y: 30,
          opacity: 0,
        }, "+=.8")
        .from('.hero-body', {
          y: 10,
          opacity: 0
        })
        .from('.hero-button', {
          y: 10,
          opacity: 0,
          duration: 0.5
        })
    }

    

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, 
      }
    })

    scrollTl.fromTo(
      "body",
      { backgroundColor: "#FDE047" },
      { backgroundColor: "#D9F99D", overwrite: "auto" },
      1
    )
    .from(".text-side-heading .split-char", {
      y: 40,
      rotate: -25,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(3)",
      duration: 1,
    }, 0.5)
    .from(".text-side-body", {
      y: 20,
      opacity: 0,
      ease: "power4.out",
    }, "+=0.3")
  }, [])

  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className="hero opacity-0"
    >
      <View className="hero-scene pointer-events-none sticky top-0 z-50 mt-[-100vh] hidden h-screen w-screen md:block">
        <Scene />
        <Bubbles count={300} speed={2} repeat={true} />
      </View>
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-heading text-7xl leading-[.8] font-black md:text-[9rem] lg:text-[13rem] text-orange-500 uppercase">
              <TextSplitter 
              text={asText(slice.primary.heading)} 
              wordDisplayStyle="block"
              className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading text-5xl font-semibold leading-snug tracking-tight mt-12 lg:text-6xl text-sky-950">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-lg leading-relaxed tracking-wide text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button 
            buttonLink={slice.primary.button_link} 
            buttonText={slice.primary.button_text} 
            className="hero-button mt-12"
            />
            
          </div>
        </div>
        <div className="grid text-side relative z-80 h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage 
          field={slice.primary.cans_images} 
          className="w-full md:hidden"
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-bold leading-tight tracking-tighter lg:text-8xl uppercase text-sky-950">
              <TextSplitter 
              text={asText(slice.primary.second_heading)} 
              />
            </h2>
            <div className="text-side-body mt-4 font-normal text-xl text-balance leading-relaxed tracking-wide text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
          
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
