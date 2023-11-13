"use client";
import { useState, type FC } from "react";
import Image, { type ImageProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src?: string | StaticImport;
};

const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  src = "",
  alt,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc ? imgSrc : "/fallback.webp"}
      onError={() => {
        setImgSrc("");
      }}
    />
  );
};

export default ImageWithFallback;
