import React, { Component } from 'react'
import classnames from 'classnames';

// reactstrap components
import {
  Alert,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from "reactstrap";

// core components
import App from 'App';
import ListContainer from 'components/list/_lists'
import { listService } from '_services/list.service';

export default class Explore extends Component {
  state = {
    error: undefined,
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
              {error &&
                <Alert color="danger">
                  <strong>Error!</strong> {error.message}
                </Alert>
              }
              {!error && !isLoaded &&
                <div class="text-center">
                  <div class="spinner-grow text-secondary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              }
              <ListContainer lists={listsInteresting} />
            </TabPane>
            <TabPane tabId="tabs2">
              {error &&
                <Alert color="danger">
                  <strong>Error!</strong> {error.message}
                </Alert>
              }
              {!error && !isLoaded &&
                <div class="text-center">
                  <div class="spinner-grow text-secondary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              }
              <ListContainer lists={listsTrending} />
            </TabPane>
            <TabPane tabId="tabs3">
              {error &&
                <Alert color="danger">
                  <strong>Error!</strong> {error.message}
                </Alert>
              }
              {!error && !isLoaded &&
                <div class="text-center">
                  <div class="spinner-grow text-secondary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              }
              <ListContainer lists={listsNewest} />
            </TabPane>
          </TabContent>
        </Container>
      </App >
    )
  }
};
