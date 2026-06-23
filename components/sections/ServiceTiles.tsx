"use client";

import Link from "next/link";
import styled from "styled-components";
import Container from "../common/Container";
import RotatingImage from "../common/RotatingImage";

export interface ServiceTile {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  images: string[];
  alt: string;
}

interface Props {
  tiles: ServiceTile[];
}

const Wrapper = styled.section`
  padding: 32px 0 16px;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 48px 0 24px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
`;

const Tile = styled(Link)`
  position: relative;
  display: block;
  height: 280px;
  border-radius: 22px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 50px rgba(18, 61, 43, 0.18);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 340px;
  }
`;

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(8, 18, 16, 0.18) 0%,
    rgba(8, 18, 16, 0.42) 55%,
    rgba(8, 18, 16, 0.82) 100%
  );
`;

const TileContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 22px 22px 24px;
`;

const TileEyebrow = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 8px;
`;

const TileTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.85rem;
  }
`;

const TileDescription = styled.div`
  font-size: 0.94rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 10px;
`;

const TileCta = styled.div`
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.04em;

  &::after {
    content: " →";
  }
`;

export default function ServiceTiles({ tiles }: Props) {
  return (
    <Wrapper>
      <Container>
        <Grid>
          {tiles.map((tile) => (
            <Tile key={tile.href} href={tile.href}>
              <ImageLayer>
                <RotatingImage
                  images={tile.images}
                  alt={tile.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </ImageLayer>
              <Overlay />
              <TileContent>
                <TileEyebrow>{tile.eyebrow}</TileEyebrow>
                <TileTitle>{tile.title}</TileTitle>
                <TileDescription>{tile.description}</TileDescription>
                <TileCta>Explore</TileCta>
              </TileContent>
            </Tile>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}
