"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Container from "./Container";
import Sidebar from "./Sidebar";
import Hamburger from "./Hamburger";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1100;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  box-shadow: 0 10px 30px rgba(6, 62, 35, 0.18);
`;

const Inner = styled.div`
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Wrapper>
        <Container>
          <Inner>
            <Logo href="/">Cape Town Concierge</Logo>

            <RightSide>
              <Hamburger onClick={toggleSidebar} />
            </RightSide>
          </Inner>
        </Container>
      </Wrapper>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}