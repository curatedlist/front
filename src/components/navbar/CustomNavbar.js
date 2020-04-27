import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Container,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown
} from "reactstrap";

// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// JavaScript plugin for auth magic links
import { Magic } from 'magic-sdk';

class CustomNavbar extends React.Component {
  state = {
    collapseClasses: "",
    collapseOpen: false,
    magic: new Magic(process.env.REACT_APP_MAGIC_API_KEY),
    isLoggedIn: false,
    email: ''
  };

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    this.state.magic.user.isLoggedIn()
      .then((isLoggedIn) => {
        this.setState({
          isLoggedIn: isLoggedIn
        })
        if (isLoggedIn) {
          this.state.magic.user.getMetadata()
            .then((metadata) => {
              this.props.onLoggedIn(metadata.email);
            });
        }
      })
  }

  handleLogout = (e) => {
    this.state.magic.user.logout()
      .then(() => {
        this.setState({
          isLoggedIn: false
        })
      },
        (error) => {
          this.setState({
            isLoggedIn: true
          });
        })
  };

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
    let loginDropdown
    let togler
    if (this.state.isLoggedIn && this.props.user) {
      loginDropdown = (
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={this.props.user.AvatarURL}
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  {this.props.user.Name}
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
              <h6 className="text-overflow m-0">Welcome!</h6>
            </DropdownItem>
            <DropdownItem to={"/user/" + this.props.user.ID} tag={Link}>
              <i className="ni ni-single-02" />
              <span>My profile</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.handleLogout}>
              <i className="ni ni-user-run" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
      togler = (
        <button className="navbar-toggler" id="navbar_global">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={this.props.user.AvatarURL}
                />
              </span>
        </button>
      )
    } else {
      loginDropdown = (
        <NavItem>
          <Link
            className="nav-link-icon nav-link"
            to="/login"
          >
            <Media className="align-items-center">
              <i className="ni ni-key-25" />
              <span className="nav-link-inner--text">Login</span>
            </Media>
          </Link>
        </NavItem>
      )
      togler = (
        <button className="navbar-toggler" id="navbar_global">
          <span />
          <span />
        </button>
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
                  src={require("assets/img/logo.png")}
                />
              </NavbarBrand>
              {togler}

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
                          src={require("assets/img/logo_black.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      {togler}
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  {loginDropdown}
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
