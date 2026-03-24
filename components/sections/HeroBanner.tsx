"use client";

import Link from "next/link";
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
};

const Wrapper = styled.section<{ $image: string }>`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 82px);

  background-image: ${({ $image }) =>
    `linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 70%), url(${$image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  position: absolute;
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

export default function HeroBanner({
  eyebrow = "Luxury Travel in Cape Town",
  title,
  description,
  primaryCtaLabel = "Book Now",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "Explore Services",
  secondaryCtaHref = "/chauffeur-services",
  image,
}: HeroBannerProps) {
  return (
    <Wrapper $image={image}>
      <Content>
        <Inner>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          <Description>{description}</Description>

          <ButtonRow>
            <StyledLink href={primaryCtaHref}>
              <Button as="span">{primaryCtaLabel}</Button>
            </StyledLink>

            <StyledLink href={secondaryCtaHref}>
              <Button as="span" $variant="secondary">
                {secondaryCtaLabel}
              </Button>
            </StyledLink>
          </ButtonRow>
        </Inner>
      </Content>
    </Wrapper>
  );
}