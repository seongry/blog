import { graphql, Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Bio } from "../components/Bio";
import { Layout } from "../components/Layout";
import SEO from "../components/Seo";
import { scale } from "../utils/typography";

const PostList = styled.section`
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
  margin: 0;
  display: inline-block;
  font-family: "IBMPlexSansKR-Bold";
`;
const PostDate = styled.small`
  padding-left: 0.5rem;
  color: ${({ theme }) => theme.colors.bluegray};
`;
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <PostList>
          {posts.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <Link
                key={index}
                style={{ boxShadow: `none` }}
                to={node.fields.slug}
              >
                <Post key={node.fields.slug}>
                  <Title>
                    <TitleText>{title}</TitleText>
                    <PostDate>
                      <span
                        className="material-icons"
                        style={{
                          ...scale(-1 / 5),
                          lineHeight: "auto",
                          marginRight: "4px",
                        }}
                      >
                        calendar_today
                      </span>
                      {node.frontmatter.date}
                    </PostDate>
                  </Title>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </Post>
              </Link>
            );
          })}
        </PostList>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
