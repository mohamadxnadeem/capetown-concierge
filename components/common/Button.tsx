"use client";

import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
      border-color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.heading};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      background: ${({ theme }) => theme.colors.backgroundSoft};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.heading};
    border: 1px solid transparent;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
};

const Button = styled.button<{ $variant?: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  ${({ $variant = "primary" }) => variantStyles[$variant]}
`;

export default Button;