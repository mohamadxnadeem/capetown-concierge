"use client";

import { useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

const shimmerSweep = keyframes`
  0% {
    transform: translateX(-120%);
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: translateX(120%);
    opacity: 0.4;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ShimmerMask = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;

  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.06),
    rgba(6, 62, 35, 0.03)
  );

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -140%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    animation: ${shimmerSweep} 1.8s ease-in-out infinite;
  }
`;

const FadeLayer = styled.div<{ $loaded: boolean }>`
  position: absolute;
  inset: 0;

  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transform: ${({ $loaded }) => ($loaded ? "scale(1)" : "scale(1.04)")};

  transition: opacity 0.6s ease, transform 0.8s ease;
`;

export default function SmartImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Wrapper>
      {!loaded && <ShimmerMask />}

      <FadeLayer $loaded={loaded}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "cover" }}
          onLoad={() => setLoaded(true)}
        />
      </FadeLayer>
    </Wrapper>
  );
}