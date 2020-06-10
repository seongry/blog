import React from "react";
import { Header } from "./Header";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import { GlobalStyles } from "./GlobalStyles";

const StyledLayout = styled.div`
  height: 100%;
`;
const Main = styled.main`
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
