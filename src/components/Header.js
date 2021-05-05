import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "IBMPlexSansKR-Bold";
  font-size: 20px;
  padding: 0.833rem 1.2rem;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 99;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};

  a {
    :hover {
      color: ${({ theme }) => theme.colors.purple};
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
      <a href="https://github.com/seongry">
        <FontAwesomeIcon icon={faGithubAlt} />
      </a>
    </StyledHeader>
  );
};
