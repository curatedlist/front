import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setUser } from "redux/actions";

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
  };

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
    if (Object.keys(this.props.user).length === 0) {
      this.isLoggedIn();
    }
  }

  isLoggedIn = () => {
    this.state.magic.user.isLoggedIn()
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          this.state.magic.user.getMetadata()
            .then((metadata) => {
              this.onLoggedIn(metadata.email);
            });
        }
      })
  }

  createUser = (email) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    };
    fetch(process.env.REACT_APP_API_URL + "users", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.setUser({ "ID": result.id, "Email": email });
        },
        (error) => {
          console.log(error)
        }
      )
  }

  onLoggedIn = (email) => {
    fetch(process.env.REACT_APP_API_URL + "users/email/" + email)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.status === 404) {
            this.createUser(email);
          } else {
            this.props.setUser(result.user);
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }

  handleLogout = (e) => {
    this.state.magic.user.logout()
      .then(() => {
        this.props.setUser({})
      },
        (error) => {
          console.log(error)
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
    const thisuser = this.props.user
    if (Object.keys(thisuser).length !== 0) {
      loginDropdown = (
        <UncontrolledDropdown nav>
          <DropdownToggle nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={this.props.user.AvatarURL ? this.props.user.AvatarURL : require("assets/img/theme/user.svg")}
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
              src={this.props.user.AvatarURL ? this.props.user.AvatarURL : require("assets/img/theme/user.svg")}
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
              <span className="nav-link-inner--text">Login / Sign up</span>
            </Media>
          </Link>
        </NavItem>
      )
      togler = (
        <button className="navbar-toggler" id="navbar_global">
          <span className="navbar-toggler-icon" />
        </button>
      )
    }
    let user = this.props.user;
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
                      <Link to={{ pathname: "/", state: { user } }}>
                        <img
                          alt="..."
                          src={require("assets/img/logo_black.png")}
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
                <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
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

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps,
  { setUser }
)(CustomNavbar);
