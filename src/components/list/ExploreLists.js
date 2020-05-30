import React, { Component } from 'react'
import classnames from 'classnames';

// reactstrap components
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from "reactstrap";

// core components
import App from 'App';
import List from 'components/list/List'
import { listService } from '_services/list.service';

class ExploreLists extends Component {
  state = {
    error: null,
    isLoaded: false,
    listsInteresting: [],
    listsTrending: [],
    listsNewest: [],
    tabs: 1
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    listService.getAll("interesting")
      .then(
        (lists) => {
          this.setState({
            isLoaded: true,
            listsInteresting: lists
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
    listService.getAll("trending")
      .then(
        (lists) => {
          this.setState({
            isLoaded: true,
            listsTrending: lists
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
    listService.getAll("newest")
      .then(
        (lists) => {
          this.setState({
            isLoaded: true,
            listsNewest: lists
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
  }

  render() {
    const { error, isLoaded, listsInteresting, listsTrending, listsNewest } = this.state;
    return (
      <App>
        <Container>
          <div className="nav-wrapper mt--300 card-profile">
            <Nav
              className="nav-fill flex-column flex-md-row "
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <NavLink
                  aria-selected={this.state.tabs === 1}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 1
                  })}
                  onClick={e => this.toggleNavs(e, "tabs", 1)}
                  href="#"
                  role="tab"
                >
                  <i className="ni ni-active-40 mr-2" />
                Interesting
              </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={this.state.tabs === 2}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 2
                  })}
                  onClick={e => this.toggleNavs(e, "tabs", 2)}
                  href="#"
                  role="tab"
                >
                  <i className="ni ni-favourite-28 mr-2" />
                Trending
              </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={this.state.tabs === 3}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: this.state.tabs === 3
                  })}
                  onClick={e => this.toggleNavs(e, "tabs", 3)}
                  href="#"
                  role="tab"
                >
                  <i className="ni ni-time-alarm mr-2" />
                Newest
              </NavLink>
              </NavItem>
            </Nav>
          </div>
              <TabContent activeTab={"tabs" + this.state.tabs}>
                <TabPane tabId="tabs1">
                  <div className="px-4">
                    <div className="mt-5 py-5 ">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          {error && <em>Error: {error.message}</em>}
                          {!isLoaded && <em>Loading...</em>}
                          {listsInteresting.length !== 0 &&
                            listsInteresting.map((list, index) =>
                              <List list={list} key={index} />
                            )
                          }
                        </Col>
                      </Row>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="tabs2">
                  <div className="px-4">
                    <div className="mt-5 py-5 ">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          {error && <em>Error: {error.message}</em>}
                          {!isLoaded && <em>Loading...</em>}
                          {listsTrending.length !== 0 &&
                            listsTrending.map((list, index) =>
                              <List list={list} key={index} />
                            )
                          }
                        </Col>
                      </Row>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="tabs3">
                  <div className="px-4">
                    <div className="mt-5 py-5 ">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          {error && <em>Error: {error.message}</em>}
                          {!isLoaded && <em>Loading...</em>}
                          {listsNewest.length !== 0 &&
                            listsNewest.map((list, index) =>
                              <List list={list} key={index} />
                            )
                          }
                        </Col>
                      </Row>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
        </Container>
      </App >
    )
  }
};

export default ExploreLists;
