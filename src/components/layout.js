import React from "react"
import { Link } from "gatsby"

import ProfileMain from "./profile-main";

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
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const fixed = (this.state.scroll > this.state.top) ?
      "section__header--fixed" : ""
    let header

    if (location.pathname === rootPath) {
      header = ProfileMain();
    } else {
      header = (
        <header className={`section__header post ${fixed}`}>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </header>
      )
    }
    return (
      <div
        style={{
          height: "100%",
        }}
      >
        {header}
        <main className='intro__main'>
          {children}
        </main>
        <footer>
          ©raina, Built with Gatsby-blog-starter
        </footer>
      </div>
    )
  }
}

export default Layout
