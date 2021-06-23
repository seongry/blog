import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Bio } from "../components/Bio";
import { Layout } from "../components/Layout";
import { Pagination } from "../components/Pagination";
import SEO from "../components/Seo";
import { TagList } from "../components/TagList";
import Utterances from "../components/Utterances";
import { rhythm, scale } from "../utils/typography";

const Title = styled.h1`
  font-family: "IBMPlexSansKR-Bold";
  margin-top: 2.5rem;
`;
const SubTitle = styled.div`
  span + span {
    margin-left: 4px;
  }
`;
const Post = styled.section`
  line-height: 1.8;

  a {
    color: ${({ theme }) => theme.colors.purple} !important;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    background: #f5f2f0;
  }

  .language-text {
    color: #eb5757;
    padding: 0.2em 0.4em;
    font-size: 85%;
  }

  blockquote {
    border-left: 5px solid ${({ theme }) => theme.colors.purple};
    margin: 0 0 1.666rem 0;
    padding: 0 1.666rem;
  }
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const tags = this.props.data.markdownRemark.frontmatter.tags;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Title>{post.frontmatter.title}</Title>
        <SubTitle
          style={{
            ...scale(-1 / 5),
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          <span className="material-icons" style={{ ...scale(-1 / 5) }}>
            calendar_today
          </span>
          <span>{post.frontmatter.date}</span>
          <TagList tags={tags} />
        </SubTitle>
        <Post
          dangerouslySetInnerHTML={{ __html: post.html }}
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <Pagination previous={previous} next={next} />
        <Utterances repo="seongry/seongry.github.io" theme="github-light" />
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
        tags
      }
    }
  }
`;
