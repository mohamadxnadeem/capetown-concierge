"use client";

import styled from "styled-components";

type HamburgerProps = {
  onClick?: () => void;
  ariaLabel?: string;
};

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }
`;

const Icon = styled.span`
  position: relative;
  display: block;
  width: 18px;
  height: 2px;
  background: white;
  border-radius: 2px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    background: white;
    border-radius: 2px;
  }

  &::before {
    transform: translateY(-6px);
  }

  &::after {
    transform: translateY(6px);
  }
`;

export default function Hamburger({
  onClick,
  ariaLabel = "Open menu",
}: HamburgerProps) {
  return (
    <Button onClick={onClick} aria-label={ariaLabel} type="button">
      <Icon />
    </Button>
  );
}