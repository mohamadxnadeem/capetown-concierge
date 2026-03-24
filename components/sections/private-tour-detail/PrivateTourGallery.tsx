"use client";

import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { ExperiencePhoto } from "./types";

function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f2f4f3" offset="20%" />
          <stop stop-color="#e8ece9" offset="50%" />
          <stop stop-color="#f2f4f3" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f2f4f3" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
    </svg>`;
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const cinematicPan = keyframes`
  0% {
    transform: scale(1.01) translate3d(0%, 0%, 0);
  }
  50% {
    transform: scale(1.04) translate3d(-0.8%, -0.5%, 0);
  }
  100% {
    transform: scale(1.06) translate3d(-1.4%, -0.8%, 0);
  }
`;

const imageFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const GalleryWrap = styled.div`
  display: grid;
  gap: 16px;
`;

const MainStage = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const MainImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 430px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 620px;
  }
`;

const ActiveImageLayer = styled.div`
  position: absolute;
  inset: 0;
  animation: ${imageFadeIn} 0.55s ease;
`;

const CinematicLayer = styled.div`
  position: absolute;
  inset: 0;
  animation: ${cinematicPan} 10s ease-in-out forwards;
  will-change: transform;
`;

const OverlayTop = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.18) 0%,
    rgba(0, 0, 0, 0.04) 24%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;

const Counter = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 3;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.62);
  color: white;
  backdrop-filter: blur(10px);
  font-size: 0.88rem;
  font-weight: 700;
`;

const NavButton = styled.button<{ $left?: boolean; $right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $left }) => ($left ? "left: 18px;" : "")}
  ${({ $right }) => ($right ? "right: 18px;" : "")}
  z-index: 3;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  color: ${({ theme }) => theme.colors.heading};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.03);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }

  @media (max-width: 640px) {
    width: 42px;
    height: 42px;
  }
`;

const ThumbnailRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 92px;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-columns: 108px;
  }
`;

const ThumbButton = styled.button<{ $active: boolean }>`
  position: relative;
  width: 100%;
  height: 76px;
  border: none;
  padding: 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  box-shadow: ${({ theme, $active }) =>
    $active ? theme.shadows.card : theme.shadows.soft};
  outline: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : "1px solid transparent"};
  transform: ${({ $active }) => ($active ? "translateY(-1px)" : "translateY(0)")};
  transition: transform 0.18s ease, outline 0.18s ease, box-shadow 0.18s ease,
    opacity 0.18s ease;
  opacity: ${({ $active }) => ($active ? 1 : 0.88)};

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 88px;
  }
`;

const EmptyState = styled.div`
  min-height: 420px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

type Props = {
  title: string;
  photos: ExperiencePhoto[];
};

export default function PrivateTourGallery({ title, photos }: Props) {
  const sortedPhotos = useMemo(
    () => [...(photos || [])].sort((a, b) => a.order - b.order),
    [photos]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activePhoto = sortedPhotos[activeIndex]?.cover_photos || "";

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !sortedPhotos.length ||
      !sortedPhotos[activeIndex]
    ) {
      return;
    }

    const nextIndex =
      activeIndex === sortedPhotos.length - 1 ? 0 : activeIndex + 1;
    const prevIndex =
      activeIndex === 0 ? sortedPhotos.length - 1 : activeIndex - 1;

    [sortedPhotos[nextIndex]?.cover_photos, sortedPhotos[prevIndex]?.cover_photos]
      .filter(Boolean)
      .forEach((src) => {
        const img = new window.Image();
        img.src = src as string;
      });
  }, [activeIndex, sortedPhotos]);

  const goPrev = () => {
    if (!sortedPhotos.length) return;
    setActiveIndex((prev) =>
      prev === 0 ? sortedPhotos.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    if (!sortedPhotos.length) return;
    setActiveIndex((prev) =>
      prev === sortedPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;

    const delta = e.changedTouches[0].clientX - touchStartX;

    if (delta > 45) goPrev();
    if (delta < -45) goNext();

    setTouchStartX(null);
  };

  if (!sortedPhotos.length) {
    return <EmptyState>No tour images available yet.</EmptyState>;
  }

  return (
    <GalleryWrap>
      <MainStage>
        <MainImageFrame
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Counter>
            {activeIndex + 1} / {sortedPhotos.length}
          </Counter>

          {sortedPhotos.length > 1 && (
            <>
              <NavButton
                type="button"
                aria-label="Previous image"
                $left
                onClick={goPrev}
              >
                ←
              </NavButton>
              <NavButton
                type="button"
                aria-label="Next image"
                $right
                onClick={goNext}
              >
                →
              </NavButton>
            </>
          )}

          <ActiveImageLayer key={activePhoto}>
            <CinematicLayer>
              <Image
                src={activePhoto}
                alt={title}
                fill
                priority={activeIndex === 0}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(1400, 900)
                )}`}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </CinematicLayer>
          </ActiveImageLayer>

          <OverlayTop />
        </MainImageFrame>
      </MainStage>

      {sortedPhotos.length > 1 && (
        <ThumbnailRow>
          {sortedPhotos.map((photo, index) => (
            <ThumbButton
              key={photo.id}
              type="button"
              $active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${title} image ${index + 1}`}
            >
              <Image
                src={photo.cover_photos}
                alt={title}
                fill
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(240, 180)
                )}`}
                sizes="120px"
                style={{ objectFit: "cover" }}
              />
            </ThumbButton>
          ))}
        </ThumbnailRow>
      )}
    </GalleryWrap>
  );
}