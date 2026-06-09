import { LinkField } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import clsx from "clsx";

interface ButtonProps {
    buttonLink: LinkField;
    buttonText: string | null;
    className?: string;
}

export const Button = ({ buttonLink, buttonText, className }: ButtonProps) => {
    return (
        <PrismicNextLink field={buttonLink} className={clsx("mt-8 inline-block bg-orange-500 rounded-2xl px-6 py-4 text-white text-2xl font-bold  transition-colors duration-300 hover:bg-orange-600 uppercase", className)}>
            {buttonText}
        </PrismicNextLink>
    )
}