import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const PostListBox = styled.section`
  flex-grow: 1;
`;

const Post = styled.article`
  padding: 2rem 1rem;
  p {
    margin: 0;
  }
`;
const Title = styled.div`
  margin-bottom: 0.5rem;
`;
const TitleText = styled.h3`
  font-size: 2rem;
  margin: 0;
  font-family: "IBMPlexSansKR-Bold";
`;
const PostDate = styled.div`
  font-size: 1rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.bluegray};
`;

export const PostList = ({ posts }) => {
  return (
    <PostListBox>
      {posts.map(({ node }, index) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Link key={index} style={{ boxShadow: `none` }} to={node.fields.slug}>
            <Post key={node.fields.slug}>
              <Title>
                <TitleText>{title}</TitleText>
              </Title>

              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <PostDate>{node.frontmatter.date}</PostDate>
            </Post>
          </Link>
        );
      })}
    </PostListBox>
  );
};
