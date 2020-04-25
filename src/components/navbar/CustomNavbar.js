import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";

class CustomNavbar extends React.Component {
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    let loginButton
    if (this.state.isLoggedIn) {
      loginButton = (
        <Button
          className="btn-success btn-icon"
          color="success"
        >
          <span className="btn-inner--icon">
            <i className="ni ni-button-power" />
          </span>
          <span className="nav-link-inner--text ml-1">
            Logout
          </span>
        </Button>
      )
    } else {
      loginButton = (
        <a href="/">
          <Button
            className="btn-success btn-icon"
            color="success"
          >
            <span className="btn-inner--icon">
              <i className="ni ni-button-power" />
            </span>
            <span className="nav-link-inner--text ml-1">
              Login / Register
          </span>
          </Button>

        </a>
      )
    }
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/theme/checklist.svg")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/theme/checklist.svg")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/curatedlist"
                      id="tooltip112445449"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Star us on Github
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    {loginButton}
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default CustomNavbar;
