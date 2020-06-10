import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
  box-sizing: border-box;
}

html,
body,
#___gatsby {
  width: 100%;
  height: 100%;

  div[role="group"] {
    height: 100%;
  }
}

a:not(.gatsby-resp-image-link) {
  text-decoration: none;
  color: #343a40;

  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
}

::-moz-selection {
  background: ${({ theme }) => theme.colors.purple};
  color: #fff;
}

::selection {
  background: ${({ theme }) => theme.colors.purple};
  color: #fff;
}

`;
