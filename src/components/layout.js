import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import { GlobalStyles } from "./GlobalStyles";
import { Header } from "./Header";

const StyledLayout = styled.div`
  @font-face {
    font-family: "RIDIBatang";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  height: 100%;
`;
const Main = styled.main`
  font-family: "RIDIBatang";
  width: 100%;
  padding: 0 20rem 0 20rem;

  @media screen and (max-width: 1300px) {
    padding: 0 10rem 0 10rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0 0.8rem 0 0.8rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
`;

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledLayout>
        <Header />
        <Main>{children}</Main>
        <Footer>©koal, Built with Gatsby-blog-starter</Footer>
      </StyledLayout>
      <GlobalStyles />
    </ThemeProvider>
  );
};
