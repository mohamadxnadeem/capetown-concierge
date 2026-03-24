"use client";

import Image from "next/image";
import styled from "styled-components";

type ShimmerImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

const ImageShell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

function shimmer(width: number, height: number) {
  return `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f2f4f3" offset="20%" />
          <stop stop-color="#e8ece9" offset="50%" />
          <stop stop-color="#f2f4f3" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#f2f4f3" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1.2s" repeatCount="indefinite"  />
    </svg>`;
}

function toBase64(str: string) {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

export default function ShimmerImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  fill = true,
}: ShimmerImageProps) {
  return (
    <ImageShell>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 800))}`}
        style={{ objectFit: "cover" }}
      />
    </ImageShell>
  );
}