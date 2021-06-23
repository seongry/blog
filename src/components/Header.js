import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
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

const HeaderContents = styled.div`
  width: 100%;
  max-width: 40rem;

  display: flex;
  justify-content: space-between;
  font-family: "IBMPlexSansKR-Bold";
  font-size: 20px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <HeaderContents>
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
          }}
          to={`/`}
        >
          코알 데브 로그
        </Link>
        <a
          href="https://github.com/seongry"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithubAlt} />
        </a>
      </HeaderContents>
    </StyledHeader>
  );
};
