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
          keywords={[`blog`, `TIL`]}
        />
        <div>
          <h3>🚀 공부한 것들을 기록해두며 성취감을 느끼기 위한 공간 🚀</h3>

          <h4># 2019-03-23</h4>
          <ul>
            <li>gatsby 블로그 오픈하는 법 글 마무리</li>
            <li>gatsby 블로그 애날리스틱 추가</li>
            <li>gatsby 블로그 disqus 추가</li>
          </ul>
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