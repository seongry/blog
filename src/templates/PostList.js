import { graphql, Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Bio } from "../components/Bio";
import { Layout } from "../components/Layout";
import { PostList } from "../components/PostList";
import SEO from "../components/Seo";

const PaginationBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PaginationLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.purple};
`;
const PaginationIcon = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 2rem;
  padding: 0.5rem;
`;
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <PostList posts={data.allMarkdownRemark.edges ?? []} />
        <PaginationBox>
          {!isFirst && (
            <PaginationLink to={prevPage} rel="prev">
              <PaginationIcon className="material-icons">
                arrow_back
              </PaginationIcon>
            </PaginationLink>
          )}
          <div />
          {!isLast && (
            <PaginationLink to={nextPage} rel="next">
              <PaginationIcon className="material-icons">
                arrow_forward
              </PaginationIcon>
            </PaginationLink>
          )}
        </PaginationBox>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
