import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledHeader = styled.header`
  font-weight: 900;
  font-size: 20px;
  padding: 0.833rem 1.2rem;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 99;

  :hover {
    color: #9332fd;
  }
`

export const Header = () => {
  return (
    <StyledHeader>
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        코알 데브 로그
      </Link>
    </StyledHeader>
  )
}
