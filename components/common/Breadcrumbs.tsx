"use client";

import Link from "./LocaleLink";
import styled from "styled-components";
import Container from "./Container";

const Nav = styled.nav`
  padding: 14px 0 0;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Item = styled.li`
  display: inline-flex;
  gap: 6px;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

export type Crumb = { label: string; href?: string };

/** Visible breadcrumbs. Keep the matching BreadcrumbList JSON-LD in the page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <Container>
      <Nav aria-label="Breadcrumb">
        <List>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Item key={`${item.label}-${index}`}>
                {item.href && !isLast ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                )}
                {!isLast ? <span aria-hidden="true">/</span> : null}
              </Item>
            );
          })}
        </List>
      </Nav>
    </Container>
  );
}
