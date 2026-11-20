"use client";

import Link from "next/link";
import styled from "styled-components";
import { useTl } from "../../lib/i18n/LocaleContext";
import Button from "../common/Button";
import SmartImage from "../common/SmartImage";
import RotatingImage from "../common/RotatingImage";
import { trackWhatsAppClick } from "../../lib/tracking";

type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  primaryCtaOnClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaOnClick?: () => void;
  image?: string;
  images?: string[];
  imageAlt?: string;
  imageAlts?: string[];
  /** Render the secondary CTA button (off by default so other pages are unchanged). */
  showSecondaryCta?: boolean;
  /** Extra content under the buttons, for example a rating badge. */
  children?: React.ReactNode;
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

const ExtraRow = styled.div`
  margin-top: 22px;
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

function makeClickHandler(href: string, label: string, override?: () => void) {
  return () => {
    if (override) { override(); return; }
    if (href.includes("wa.me")) {
      trackWhatsAppClick({ source: "hero_banner", label });
    }
  };
}

export default function HeroBanner({
  eyebrow = "Luxury Travel in Cape Town",
  title,
  description,
  primaryCtaLabel = "Book Now",
  primaryCtaHref = "/chauffeur-hire",
  primaryCtaOnClick,
  secondaryCtaLabel = "Explore Services",
  secondaryCtaHref = "/chauffeur-hire",
  secondaryCtaOnClick,
  image,
  images,
  imageAlt = "Luxury chauffeur fleet in Cape Town including premium private transport vehicles",
  imageAlts,
  showSecondaryCta = false,
  children,
}: HeroBannerProps) {
  const handlePrimaryClick = makeClickHandler(primaryCtaHref, primaryCtaLabel, primaryCtaOnClick);
  const handleSecondaryClick = makeClickHandler(secondaryCtaHref, secondaryCtaLabel, secondaryCtaOnClick);

  const rotation = (images ?? []).filter(Boolean);
  const single = image && !rotation.length ? image : null;

  const tl = useTl();
  return (
    <Wrapper>
      <ImageLayer>
        {rotation.length > 0 ? (
          <RotatingImage
            images={rotation}
            alt={tl(imageAlt)}
            alts={imageAlts?.map((a) => tl(a))}
            sizes="100vw"
            priority
          />
        ) : single ? (
          <SmartImage src={single} alt={tl(imageAlt)} priority quality={90} sizes="100vw" />
        ) : null}
      </ImageLayer>

      <Overlay />

      <Content>
        <Inner>
          <Eyebrow>{tl(eyebrow)}</Eyebrow>
          <Title>{tl(title)}</Title>
          <Description>{tl(description)}</Description>

          <ButtonRow>
            {isExternal(primaryCtaHref) ? (
              <StyledAnchor href={primaryCtaHref} target="_blank" rel="noopener noreferrer" onClick={handlePrimaryClick}>
                <Button as="span">{tl(primaryCtaLabel)}</Button>
              </StyledAnchor>
            ) : (
              <StyledLink href={primaryCtaHref} onClick={handlePrimaryClick}>
                <Button as="span">{tl(primaryCtaLabel)}</Button>
              </StyledLink>
            )}
            {showSecondaryCta ? (
              isExternal(secondaryCtaHref) ? (
                <StyledAnchor href={secondaryCtaHref} target="_blank" rel="noopener noreferrer" onClick={handleSecondaryClick}>
                  <Button as="span" $variant="secondary">{tl(secondaryCtaLabel)}</Button>
                </StyledAnchor>
              ) : (
                <StyledLink href={secondaryCtaHref} onClick={handleSecondaryClick}>
                  <Button as="span" $variant="secondary">{tl(secondaryCtaLabel)}</Button>
                </StyledLink>
              )
            ) : null}
          </ButtonRow>
          {children ? <ExtraRow>{children}</ExtraRow> : null}
        </Inner>
      </Content>
    </Wrapper>
  );
}