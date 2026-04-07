"use client";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 32px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 40px;
  }
`;

export default Container;