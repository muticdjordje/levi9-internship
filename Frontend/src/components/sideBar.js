import React from "react"
import "./sideBar.css"

class SideBar extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      state: {
        showNav: false
      }
    }
  }

  openNavClick = e => {
    e.preventDefault()
    this.openNav()
  }

  closeNavClick = e => {
    e.preventDefault()
    this.closeNav()
  }

  openNav = () => {
    this.setState({
      showNav: true
    })

    document.addEventListener("keydown", this.handleEscKey)
  }
  closeNav = () => {
    this.setState({
      showNav: false
    })

    document.removeEventListener("keydown", this.handleEscKey)
  }

  handleEscKey = e => {
    if (e.key === "Escape") {
      this.closeNav()
    }
  }

  render() {
    const { showNav } = this.state
    let navCoverStyle = { width: showNav ? "100%" : "0" }
    let sideNavStyle = { width: showNav ? "250px" : "0" }
    const logo = require('./../logo.png');

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} style={{ cursor:"pointer", color: "#2e2eb8", fontSize: "33px", paddingLeft: "1%"}}>
          <img src={logo}/>
          <b>Menu</b>
        </span>
        <div
          onClick={this.navCoverClick}
          class="nav-cover"
          style={navCoverStyle}
        />
        <div name="side-nav" class="side-nav" style={sideNavStyle}>
          <a href="#" onClick={this.closeNavClick} class="close-nav">
            &times;
          </a>
          <div>
            <div className=""></div>
            <a style={{ textAlign: 'center', fontSize: "200%"}}><b>{localStorage["username"]}</b></a>
          </div>
          {localStorage.getItem('role') === "0" || localStorage.getItem('role') === "1" ? <a style={{paddingTop:"20%", fontSize: "150%"}} href="/addNewUser">Add new user</a> : null}
          {localStorage.getItem('role') === "0" || localStorage.getItem('role') === "1" ? <a style={{paddingTop:"20%", fontSize: "150%"}} href="/internship">Add new internship</a> : null}
          {localStorage.getItem('role') === "0" || localStorage.getItem('role') === "1" ? <a style={{paddingTop:"20%", fontSize: "150%"}} href="/addNewTechnology">Add new technology</a> : null}
          <a style={{paddingTop:"20%", fontSize: "150%"}}  href="/">LogOut</a>
        </div>
      </React.Fragment>
    )
  }
}

export default SideBar;