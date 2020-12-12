import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setUser } from 'redux/actions';

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
} from 'reactstrap';

// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';

// JavaScript plugin for auth magic links
import { Magic } from 'magic-sdk';

// Services & Helpes
import { userService } from '_services/user.service'


function CustomNavbar(props) {
  const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

  const [collapseClasses, setCollapseClasses] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let headroom = new Headroom(document.getElementById("navbar-main"));
      headroom.init();
      if (Object.keys(props.user).length === 0) {
        isLoggedIn();
      } else if (props.user.username === "") {
        props.history.push("/create");
      }
    }
    fetchData();
  }, []);

  const isLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const metadata = await magic.user.getMetadata();
        const idToken = await magic.user.getIdToken();
        const user = await userService.login(idToken, metadata.email);
        user.idToken = idToken
        props.setUser(user);
        if (user.username === "") {
          props.history.push("/create");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = async (e) => {
    try {
      await magic.user.logout();
      props.setUser({});
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  }

  const onExiting = () => {
    setCollapseClasses("collapsing-out");
  };

  const onExited = () => {
    setCollapseClasses("");
  };

  let loginDropdown
  let togler
  const { user } = props
  if (Object.keys(user).length !== 0) {
    loginDropdown = (
      <UncontrolledDropdown nav>
        <DropdownToggle nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt={user.name}
                src={user.avatar_url ? user.avatar_url : "https://joeschmoe.io/api/v1/" + user.email}
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
                {user.name}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem to={user.username ? "/by/" + user.username : "/create"} tag={Link}>
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={handleLogout}>
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
            src={user.avatar_url ? user.avatar_url : "https://joeschmoe.io/api/v1/" + user.email}
          />
        </span>
        <Media className="ml-2 d-none d-lg-block">
          <span className="mb-0 text-sm font-weight-bold">
            {user.name}
          </span>
        </Media>
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
                alt="Curatedli.st a collaborative curated content"
                src={require("assets/img/logo.png")}
              />
            </NavbarBrand>
            {togler}

            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
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

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(CustomNavbar));
