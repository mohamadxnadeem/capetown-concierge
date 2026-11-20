"use client";

import { useT, useTl } from "../../lib/i18n/LocaleContext";
import Link from "next/link";
import styled from "styled-components";
import Container from "./Container";

const Wrap = styled.section`
  padding: 32px 0;
`;

const Title = styled.h2`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.5rem;
`;

const Text = styled.p`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    text-decoration: underline;
  }
`;

export type RelatedLink = { href: string; label: string };

/** Plain internal link block with descriptive anchors. */
export default function RelatedLinks({
  title,
  text,
  links,
}: {
  title: string;
  text?: string;
  links: RelatedLink[];
}) {
  const tt = useT();
  const tl = useTl();
  return (
    <Wrap>
      <Container>
        <Title>{tl(title)}</Title>
        {text ? <Text>{tl(text)}</Text> : null}
        <List>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={tt.path(link.href)}>{tl(link.label)}</Link>
            </li>
          ))}
        </List>
      </Container>
    </Wrap>
  );
}
