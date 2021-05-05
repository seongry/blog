/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, StaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  padding: 2.5rem 16px;
`;
const Description = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
const Author = styled.div``;
const Nickname = styled.p`
  display: inline;
  margin: 0;
  font-weight: 900;
  font-size: 1.3rem;
`;
const SelfProduce = styled.p`
  margin: 0;
`;

export const Bio = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata;
        return (
          <Layout>
            <Description>
              <Author>
                <Nickname>KOAL</Nickname> ({author})
              </Author>
              <SelfProduce>#Web #FrontEnd Still Learn 👩‍💻</SelfProduce>
            </Description>
          </Layout>
        );
      }}
    />
  );
};

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`;
