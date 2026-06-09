import CircleText from "./CircleText"
import { FizziLogo } from "./FizziLogo"

export const Footer = () => {
    return (
        <footer className="bg-yellow-300 text-[#FE6334]">
            <div className="relative w-full flex items-center justify-center mx-auto p-8 gap-4">
                <FizziLogo />
                <div className="absolute right-7 md:right-24  top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28">
                    <CircleText />
                </div>
            </div>
        </footer>
    )
}