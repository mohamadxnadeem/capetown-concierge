"use client";

import styled from "styled-components";
import Container from "./Container";

const Wrapper = styled.footer`
  padding: 48px 0;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <Text>
          © {new Date().getFullYear()} Cape Town Concierge. Luxury chauffeur
          services, private tours, and premium travel experiences in Cape Town.
        </Text>
      </Container>
    </Wrapper>
  );
}