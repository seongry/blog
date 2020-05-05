import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 900;
  font-size: 20px;
  padding: 0.833rem 1.2rem;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 99;
  border-bottom: 1px solid #ddd;

  a {
    :hover {
      color: #9332fd;
    }
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
        }}
        to={`/`}
      >
        코알 데브 로그
      </Link>
      <a href="https://github.com/raina94">
        <FontAwesomeIcon icon={faGithubAlt} />
      </a>
    </StyledHeader>
  );
};
