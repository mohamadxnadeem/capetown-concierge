"use client";

import styled from "styled-components";

const Section = styled.section`
  padding: 72px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

export default Section;