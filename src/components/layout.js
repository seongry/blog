import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll() {
    this.setState({ scroll: window.scrollY })
  }

  componentDidMount() {
    const header = document.querySelector("header")
    this.setState({ top: header.offsetTop, height: header.offsetHeight })
    window.addEventListener("scroll", this.handleScroll, true)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let headerStyle = { width: rhythm(36)}
    let headerClass
    let header
    if (this.state.scroll > this.state.top) {
      headerStyle.paddingTop = `${rhythm(1.5)}`;
      headerClass = "section__header--fixed";
    }

    if (location.pathname === rootPath) {
      header = (
        <header className={`section__header ${headerClass}`} style={headerStyle}>
          <div>
            <h1
              style={{
                ...scale(1.5),
                marginBottom: rhythm(1.5),
                marginTop: 0,
              }}
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {title}✨
              </Link>
            </h1>
          </div>
        </header>
      )
    } else {
      header = (
        <header className={`section__header ${headerClass}`} style={headerStyle}>
          <h3
            style={{
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}✨
            </Link>
          </h3>
        </header>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(1.5)} 0`,
        }}
      >
        {header}
        <main>{children}</main>
        <footer>
          raina + gatsby
        </footer>
      </div>
    )
  }
}

export default Layout
