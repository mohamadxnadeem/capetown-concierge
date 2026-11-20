import styled from "styled-components";
import Link from "next/link";
import Container from "../../common/Container";
import TrustIcon from "./TrustIcons";
import {
  SHARED_TRUST_BADGES,
  type TrustBadge,
} from "../../../lib/vehicleTrustBadges";

import { useT } from "../../../lib/i18n/LocaleContext";
const Wrap = styled.section`
  padding: 32px 0 0;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
    gap: 16px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Item = styled.li`
  flex: 0 0 78%;
  scroll-snap-align: start;
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: initial;
  }
`;

const cardStyles = `
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 24px;
  border-radius: 12px;
  text-decoration: none;
  box-sizing: border-box;
`;

const Card = styled.div`
  ${cardStyles}
  background: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.gold}4D;
  color: ${({ theme }) => theme.colors.cream};
`;

const CardLink = styled(Link)`
  ${cardStyles}
  background: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.gold}4D;
  color: ${({ theme }) => theme.colors.cream};

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const IconWrap = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.gold};
`;

const Title = styled.p`
  margin: 0;
  font-family: var(--font-cormorant), Georgia, serif;
  font-weight: 600;
  font-size: 1.35rem;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.cream};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.cream};
  opacity: 0.85;
`;

function Body({ badge }: { badge: TrustBadge }) {
  return (
    <>
      <IconWrap>
        <TrustIcon name={badge.icon} />
      </IconWrap>
      <Title>{badge.title}</Title>
      <Subtitle>{badge.subtitle}</Subtitle>
    </>
  );
}

export default function TrustBadges() {
  const tt = useT();
  const badges = SHARED_TRUST_BADGES(tt);

  return (
    <Wrap aria-label={tt("TrustBadges.why-book-with-us")}>
      <Container>
        <List>
          {badges.map((badge) => (
            <Item key={badge.title}>
              {badge.href ? (
                <CardLink href={tt.path(badge.href)}>
                  <Body badge={badge} />
                </CardLink>
              ) : (
                <Card>
                  <Body badge={badge} />
                </Card>
              )}
            </Item>
          ))}
        </List>
      </Container>
    </Wrap>
  );
}
