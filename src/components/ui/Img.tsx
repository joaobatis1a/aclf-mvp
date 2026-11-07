import NextImage, { type ImageProps } from "next/image";

/**
 * The project's image: same API as next/image, served at quality 85 by default.
 * Renders and aerial photos lose visible detail at the framework default of 75.
 */
export default function Img({ quality = 85, alt, ...props }: ImageProps) {
  return <NextImage quality={quality} alt={alt} {...props} />;
}
