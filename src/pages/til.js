import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class TilIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return(
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="TIL"
          keywords={[`blog`, `gatsby`, `javascript`, `react`, `TIL`]}
        />
        <div>
          TIL
        </div>
        <Bio />
      </Layout>
    )
  }
}

export default TilIndex

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
`