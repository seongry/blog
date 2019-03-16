import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <header className={`section__header`}>
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
          <div>
            <ul>
              <li>
                <Link to={`/til`}>
                  TIL
                </Link>
              </li>
              <li>
                <Link to={`/til`}>
                  portfolio
                </Link>
              </li>
            </ul>
          </div>
        </header>
      )
    } else {
      header = (
        <header className={`section__header`}>
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
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
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
