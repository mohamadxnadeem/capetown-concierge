"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

type ObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: ObjectFit;
  objectPosition?: string;
  className?: string;
};

const shimmerSweep = keyframes`
  0% { transform: translateX(-140%) skewX(-12deg); }
  100% { transform: translateX(140%) skewX(-12deg); }
`;

const subtlePulse = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.9; }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #eef2f0 0%,
    #e6ebe8 50%,
    #eef2f0 100%
  );
`;

const Skeleton = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease;

  background:
    radial-gradient(
      circle at 30% 20%,
      rgba(11, 91, 51, 0.08),
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 80%,
      rgba(6, 62, 35, 0.06),
      transparent 60%
    );

  animation: ${subtlePulse} 2.4s ease-in-out infinite;
`;

const Sheen = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease;

  &::after {
    content: "";
    position: absolute;
    top: -10%;
    left: 0;
    width: 55%;
    height: 120%;
    transform: translateX(-140%) skewX(-12deg);
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 45%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.2) 55%,
      transparent 100%
    );
    animation: ${shimmerSweep} 1.8s ease-in-out infinite;
  }
`;

const ImageLayer = styled.div<{ $loaded: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transform: ${({ $loaded }) => ($loaded ? "scale(1)" : "scale(1.03)")};
  transition: opacity 0.55s ease, transform 0.7s ease;
`;

export default function SmartImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  quality,
  objectFit = "cover",
  objectPosition,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showSkeleton = !loaded || errored;
  const imageStyle: CSSProperties = {
    objectFit,
    ...(objectPosition ? { objectPosition } : null),
  };

  return (
    <Wrapper className={className}>
      <Skeleton $visible={showSkeleton} aria-hidden="true" />
      <Sheen $visible={showSkeleton} aria-hidden="true" />

      {!errored && src ? (
        <ImageLayer $loaded={loaded}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            quality={quality}
            sizes={sizes}
            style={imageStyle}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        </ImageLayer>
      ) : null}
    </Wrapper>
  );
}
