import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';

// reactstrap components
import {
  Alert,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from 'reactstrap';

// core components
import App from 'App';
import ListContainer from 'components/list/_lists';
import { listService } from '_services/list.service';

export default function Explore() {
  const [listInterestingRequest, setListInterestingRequest] = useState({
    listInteresting: [],
    loading: true,
    error: undefined,
  });
  const [listTrendingRequest, setListTrendingRequest] = useState({
    listTrending: [],
    loading: true,
    error: undefined,
  });
  const [listNewestRequest, setListNewestRequest] = useState({
    listNewest: [],
    loading: true,
    error: undefined,
  });
  
  const [tabs, setTabs] = useState(1);
  
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setTabs(index);
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    listService.getAll("interesting")
      .then(
        (lists) => {
          setListInterestingRequest({
            listInteresting: lists,
            loading: false,
            error: undefined,
          });
        },
        (error) => {
          setListInterestingRequest({
            listInteresting: [],
            loading: false,
            error: error,
          });
        }
      );
    listService.getAll("trending")
      .then(
        (lists) => {
          setListTrendingRequest({
            listTrending: lists,
            loading: false,
            error: undefined,
          });
        },
        (error) => {
          setListTrendingRequest({
            listTrending: [],
            loading: false,
            error: error,
          });
        }
      );
    listService.getAll("newest")
      .then(
        (lists) => {
          setListNewestRequest({
            listNewest: lists,
            loading: false,
            error: undefined,
          });
        },
        (error) => {
          setListNewestRequest({
            listNewest: [],
            loading: false,
            error: error,
          });
        }
      );
    }, []);

  const {errorInteresting, loadingInteresting, listInteresting} = listInterestingRequest;
  const {errorTrending, loadingTrending, listTrending} = listTrendingRequest;
  const {errorNewest, loadingNewest, listNewest} = listNewestRequest;

  return (
    <App>
      <Container>
        <Helmet>
          <title>Collaborative Curated Content | curatedli.st</title>
          <meta property="og:title" content="Collaborative Curated Content | curatedli.st" />
          <meta property="og:description" content="Collaborative curated content lists that won't suck. Share your content with others and get feedback. Review other's content." />
          <meta property="og:image" content={require("assets/img/theme/checklist.svg")} />
          <link rel="canonical" href="https://curatedli.st" />
        </Helmet>
        <div className="nav-wrapper mt--300 card-profile">
          <Nav
            className="nav-fill flex-column flex-md-row "
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={tabs === 1}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: tabs === 1
                })}
                onClick={e => toggleNavs(e, 1)}
                href="#"
                role="tab"
              >
                <i className="ni ni-active-40 mr-2" />
              Interesting
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: tabs === 2
                })}
                onClick={e => toggleNavs(e, 2)}
                href="#"
                role="tab"
              >
                <i className="ni ni-favourite-28 mr-2" />
              Trending
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: tabs === 3
                })}
                onClick={e => toggleNavs(e, 3)}
                href="#"
                role="tab"
              >
                <i className="ni ni-time-alarm mr-2" />
              Newest
            </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={"tabs" + tabs}>
          <TabPane tabId="tabs1">
            {errorInteresting &&
              <Alert color="danger">
                <strong>Error!</strong> {errorTrending.message}
              </Alert>
            }
            {loadingInteresting &&
              <div className="text-center">
                <div className="spinner-grow text-secondary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            <ListContainer lists={listInteresting} />
          </TabPane>
          <TabPane tabId="tabs2">
            {errorTrending &&
              <Alert color="danger">
                <strong>Error!</strong> {errorTrending.message}
              </Alert>
            }
            {loadingTrending &&
              <div className="text-center">
                <div className="spinner-grow text-secondary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            <ListContainer lists={listTrending} />
          </TabPane>
          <TabPane tabId="tabs3">
            {errorNewest &&
              <Alert color="danger">
                <strong>Error!</strong> {errorNewest.message}
              </Alert>
            }
            {loadingNewest &&
              <div className="text-center">
                <div className="spinner-grow text-secondary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            <ListContainer lists={listNewest} />
          </TabPane>
        </TabContent>
      </Container>
    </App >
  )
};
