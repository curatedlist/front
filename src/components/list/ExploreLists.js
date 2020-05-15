import React, { Component } from 'react'
import classnames from 'classnames';

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  CardBody,
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
    lists: [],
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
    listService.getAll().then(
      (result) => {
        this.setState({
          isLoaded: true,
          lists: result.lists
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      })
  }

  render() {
    const { error, isLoaded, lists } = this.state;
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
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
              <div className="px-4">
              <div className="mt-5 py-5 ">
                <Row className="justify-content-center">
                  <Col lg="9">
                    {error && <em>Error: {error.message}</em>}
                    {!isLoaded && <em>Loading...</em>}
                    {lists.length != 0 &&
                      lists.map((list, index) =>
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
                    {lists.length != 0 &&
                      lists.map((list, index) =>
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
                    {lists.length != 0 &&
                      lists.map((list, index) =>
                        <List list={list} key={index} />
                      )
                    }
                  </Col>
                </Row>
              </div>
            </div>

              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
        </Container>
      </App >
    )
  }
};
export default ExploreLists;
