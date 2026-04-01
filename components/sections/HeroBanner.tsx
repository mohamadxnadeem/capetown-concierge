"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Button from "../common/Button";

type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image: string;
  imageAlt?: string;
};

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 82px);
  overflow: hidden;
`;

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.45) 40%,
    rgba(0, 0, 0, 0.15) 70%
  );
`;

const Content = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 60px 40px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 80px;
  }
`;

const Inner = styled.div`
  max-width: 720px;
`;

const Eyebrow = styled.div`
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
`;

const Title = styled.h1`
  margin: 0 0 18px;
  color: white;
  font-size: 2.4rem;
  line-height: 1.05;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4rem;
  }
`;

const Description = styled.p`
  margin: 0 0 26px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
  line-height: 1.7;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
`;

const StyledAnchor = styled.a`
  display: inline-flex;
`;

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
}

export default function HeroBanner({
  eyebrow = "Luxury Travel in Cape Town",
  title,
  description,
  primaryCtaLabel = "Book Now",
  primaryCtaHref = "/chauffeur-services",
  secondaryCtaLabel = "Explore Services",
  secondaryCtaHref = "/chauffeur-services",
  image,
  imageAlt = "Luxury chauffeur fleet in Cape Town including premium private transport vehicles",
}: HeroBannerProps) {
  return (
    <Wrapper>
      <ImageLayer>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </ImageLayer>

      <Overlay />

      <Content>
        <Inner>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          <Description>{description}</Description>

          <ButtonRow>
            {isExternal(primaryCtaHref) ? (
              <StyledAnchor href={primaryCtaHref} target="_blank" rel="noopener noreferrer">
                <Button as="span">{primaryCtaLabel}</Button>
              </StyledAnchor>
            ) : (
              <StyledLink href={primaryCtaHref}>
                <Button as="span">{primaryCtaLabel}</Button>
              </StyledLink>
            )}
          </ButtonRow>
        </Inner>
      </Content>
    </Wrapper>
  );
}