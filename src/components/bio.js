/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { rhythm } from "../utils/typography";
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
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: "auto",
                marginTop: "auto",
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
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
    avatar: file(absolutePath: { regex: "/profile.jpeg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`;
