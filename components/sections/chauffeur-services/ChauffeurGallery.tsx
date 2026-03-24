"use client";

import { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CarPhoto } from "./types";

type Props = {
  images: CarPhoto[];
};

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(1.02); }
  to { opacity: 1; transform: scale(1); }
`;

const cinematicPan = keyframes`
  0% { transform: scale(1.01) translate3d(0%, 0%, 0); }
  50% { transform: scale(1.04) translate3d(-0.8%, -0.4%, 0); }
  100% { transform: scale(1.06) translate3d(-1.4%, -0.7%, 0); }
`;

const GalleryWrap = styled.div`
  display: grid;
  gap: 16px;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
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
  height: 420px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 560px;
  }
`;

const ActiveImageLayer = styled.div`
  position: absolute;
  inset: 0;
  animation: ${fadeIn} 0.5s ease;
`;

const CinematicLayer = styled.div<{ $image?: string }>`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.14) 0%,
      rgba(0, 0, 0, 0.02) 24%,
      rgba(0, 0, 0, 0.08) 100%
    ),
    ${({ $image }) => ($image ? `url(${$image}) center/cover no-repeat` : "none")};
  animation: ${cinematicPan} 10s ease-in-out forwards;
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
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.heading};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const ThumbnailRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 92px;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-columns: 108px;
  }
`;

const ThumbButton = styled.button<{ $active: boolean; $image?: string }>`
  width: 100%;
  height: 76px;
  border: none;
  padding: 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%),
    ${({ $image }) => ($image ? `url(${$image}) center/cover no-repeat` : "none")};
  box-shadow: ${({ theme, $active }) =>
    $active ? theme.shadows.card : theme.shadows.soft};
  outline: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : "1px solid transparent"};
  opacity: ${({ $active }) => ($active ? 1 : 0.88)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 88px;
  }
`;

export default function ChauffeurGallery({ images }: Props) {
  const galleryImages = useMemo(
    () => [...images].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [images]
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!galleryImages.length) return null;

  const activeImage = galleryImages[activeImageIndex]?.cover_photos;

  const goPrev = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActiveImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <GalleryWrap>
      <Title>Vehicle Gallery</Title>

      <MainStage>
        <MainImageFrame>
          <Counter>
            {activeImageIndex + 1} / {galleryImages.length}
          </Counter>

          {galleryImages.length > 1 && (
            <>
              <NavButton type="button" $left onClick={goPrev} aria-label="Previous image">
                ←
              </NavButton>
              <NavButton type="button" $right onClick={goNext} aria-label="Next image">
                →
              </NavButton>
            </>
          )}

          <ActiveImageLayer key={activeImage}>
            <CinematicLayer $image={activeImage} />
          </ActiveImageLayer>
        </MainImageFrame>
      </MainStage>

      {galleryImages.length > 1 && (
        <ThumbnailRow>
          {galleryImages.map((image, index) => (
            <ThumbButton
              key={image.id}
              type="button"
              $active={index === activeImageIndex}
              $image={image.cover_photos}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </ThumbnailRow>
      )}
    </GalleryWrap>
  );
}