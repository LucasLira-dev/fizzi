import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";

export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

const BigText: FC<BigTextProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE832]"
    >
      <h1 className="grid gap-[5vw] md:gap-[3vw] py-10 text-center font-black leading-[.7] uppercase">
        <div className="text-[32vw]"> Soda </div>
        <div className="grid text-[28vw] gap-[5vw] md:gap-[3vw] md:flex md:text-[10vw]">
          <span className="inline-block"> that </span>
          <span className="inline-block"> makes </span>
          <span className="inline-block"> you </span>
        </div>
        <div className="text-[32vw] md:text-[31vw]"> smile </div>
      </h1>
    </Bounded>
  );
};

export default BigText;
