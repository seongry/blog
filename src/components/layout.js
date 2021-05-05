import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import { GlobalStyles } from "./GlobalStyles";
import { Header } from "./Header";

const StyledLayout = styled.div`
  @font-face {
    font-family: "IBMPlexSansKR-Regular";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "IBMPlexSansKR-Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Bold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  height: 100%;
`;
const Main = styled.main`
  font-family: "IBMPlexSansKR-Regular";
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

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
