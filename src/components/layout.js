import React from "react"
import { Header } from "./Header"

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    return (
      <div
        style={{
          height: "100%",
        }}
      >
        <Header />
        <main className="intro__main">{children}</main>
        <footer>©raina, Built with Gatsby-blog-starter</footer>
      </div>
    )
  }
}

export default Layout
