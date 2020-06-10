import React from "react";
import { Link, graphql } from "gatsby";

import { Layout } from "../components/Layout";
import SEO from "../components/Seo";
import { rhythm, scale } from "../utils/typography";
import { Bio } from "../components/Bio";
import styled from "styled-components";

const PostList = styled.section`
  flex-grow: 1;
`;

const Post = styled.article`
  small {
    font-style: italic;
  }
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
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    {title}
                  </h3>
                  <small>
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
                  </small>
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
