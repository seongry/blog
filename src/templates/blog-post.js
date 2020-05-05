import React from "react";
import { Link, graphql } from "gatsby";

import { Bio } from "../components/bio";
import { Layout } from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import "../utils/variables.scss";
import { DiscussionEmbed } from "disqus-react";
import styled from "styled-components";

const Title = styled.h1`
  margin-top: 2.5rem;
`;
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    const disqusShortname = "raina";
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Title>{post.frontmatter.title}</Title>
        <p
          className="parse__subtitle"
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          <span className="material-icons" style={{ ...scale(-1 / 5) }}>
            calendar_today
          </span>
          <span>{post.frontmatter.date}</span>
        </p>
        <div
          className={`section__post`}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul className="pagination">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <div className="pagination-button">
                  <span className="material-icons">navigate_before</span>
                  <span className="title">{previous.frontmatter.title}</span>
                </div>
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <div className="pagination-button">
                  <span className="title">{next.frontmatter.title}</span>
                  <span className="material-icons">navigate_next</span>
                </div>
              </Link>
            )}
          </li>
        </ul>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
