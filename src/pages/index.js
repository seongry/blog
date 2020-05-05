import React from "react";
import { Link, graphql } from "gatsby";

import { Layout } from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import "../utils/variables.scss";
import { Bio } from "../components/bio";

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
        <div className="post-section">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                <div className={`section__main`} key={node.fields.slug}>
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
                </div>
              </Link>
            );
          })}
        </div>
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
