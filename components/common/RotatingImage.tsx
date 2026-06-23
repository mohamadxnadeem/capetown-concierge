"use client";

import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import SmartImage from "./SmartImage";

const MAX_LAYERS = 4;

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
  transition: opacity 2.6s ease-in-out;
  animation: ${kenBurns} 24s ease-in-out infinite alternate;
  will-change: opacity, transform;
`;

interface Props {
  images: string[];
  alt: string;
  sizes?: string;
  intervalMs?: number;
  priority?: boolean;
  maxLayers?: number;
}

export default function RotatingImage({
  images,
  alt,
  sizes = "100vw",
  intervalMs = 9000,
  priority = false,
  maxLayers = MAX_LAYERS,
}: Props) {
  // Cap mounted layers — iOS Safari can crash on memory pressure when too
  // many <Image> elements are stacked with perpetual transform animations.
  // Even opacity:0 images are still decoded and animated by the compositor.
  const visible = useMemo(() => images.slice(0, maxLayers), [images, maxLayers]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (visible.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % visible.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [visible.length, intervalMs]);

  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((src, i) => (
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
