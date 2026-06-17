"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import SmartImage from "./SmartImage";

const kenBurns = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.08);
  }
`;

const Layer = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1.6s ease-in-out;
  animation: ${kenBurns} 14s ease-in-out infinite alternate;
  will-change: opacity, transform;
`;

interface Props {
  images: string[];
  alt: string;
  sizes?: string;
  intervalMs?: number;
  priority?: boolean;
}

export default function RotatingImage({
  images,
  alt,
  sizes = "100vw",
  intervalMs = 5500,
  priority = false,
}: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((src, i) => (
        <Layer key={`${src}-${i}`} $active={i === active}>
          <SmartImage
            src={src}
            alt={alt}
            sizes={sizes}
            priority={priority && i === 0}
          />
        </Layer>
      ))}
    </>
  );
}
