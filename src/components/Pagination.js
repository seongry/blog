import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const PaginationList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 5rem 0 2.5rem 0;
  margin: 0;

  @media screen and (max-width: 768px) {
    padding: 4rem 0.8rem 0.8rem 0.8rem;
    justify-content: center;
  }
`;
const PaginationLink = styled(Link)`
  display: flex;
  border-radius: 4em;
  padding: 0.4rem 1.5rem;
  border: solid transparent;
  background: linear-gradient(135deg, #b55af3 10%, #9c68f9 100%);
  box-shadow: inset 0 0 0 100px white;

  :hover {
    box-shadow: none;
    span {
      color: #ffffff;
    }
  }
`;
const Title = styled.span`
  max-width: 20rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;
export const Pagination = ({ previous, next }) => {
  return (
    <PaginationList>
      <li>
        {previous && (
          <PaginationLink to={previous.fields.slug} rel="prev">
            <span className="material-icons">navigate_before</span>
            <Title>{previous.frontmatter.title}</Title>
          </PaginationLink>
        )}
      </li>
      <li>
        {next && (
          <PaginationLink to={next.fields.slug} rel="next">
            <Title>{next.frontmatter.title}</Title>
            <span className="material-icons">navigate_next</span>
          </PaginationLink>
        )}
      </li>
    </PaginationList>
  );
};
