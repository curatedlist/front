import React, { useState, useEffect } from 'react'

// Dependencies & libraries
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Helmet } from 'react-helmet';

// reactstrap components
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
} from 'reactstrap';

// core components
import App from 'App';
import ListContainer from 'components/list/_lists';

// Services & Helpes
import { listService } from '_services/list.service';
import { userService } from '_services/user.service';

function Profile(props) {
  const [userRequest, setUserRequest] = useState({
    loading: true,
    user: null,
    error: null,
  });  
  const [listsRequest, setListsRequest] = useState({
    loading: true,
    lists: null,
    error: null,
  });  
  
  const { addToast } = useToasts();

  const username = props.match.params.username;
  const section = props.section;

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (username === undefined) {
      props.history.push("/all");
    }
    loadUser(username);
    loadLists(username, section);
  }, []);

  const loadUser = async (username) => {
    await userService.getByUsername(username)
        .then(
          (user) => {
            setUserRequest({
              loading: false,
              user: user,
              error: null,
            });
          },
          (error) => {
            setUserRequest({
              loading: false,
              user: null,
              error: error,
            });
          }
        ).catch(error => {
          addToast(error.message, { appearance: 'error', autoDismiss: true })
        })
  }
  
  const loadLists = (username, section) => {
    props.history.push("/by/" + username + "/" + section);
    listService.getListsByUsername(username, section)
      .then(
        (lists) => {
          setListsRequest({
            loading: false,
            lists: lists,
            error: null,
          });
        },
        (error) => {
          setListsRequest({
            loading: false,
            lists: null,
            error: error,
          });
        }
      )
  }

  const currentUser = props.user;
  const { userloading, user, userError } = userRequest;
  const { listsloading, lists, listsError } = listsRequest;
  return (
    <App>
      <Container>
        {userError &&
          <Alert className="mt--100" color="danger">
            <strong>Error!</strong> {userError.message}
          </Alert>
        }
        {listsError &&
          <Alert className="mt--100" color="danger">
            <strong>Error!</strong> {listsError.message}
          </Alert>
        }
        {!userError && !listsError && ( userloading || listsloading ) &&
          <div className="text-center">
            <div className="spinner-grow text-primary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        {!userError && !listsError && !( userloading || listsloading ) && user && lists &&
          <>
            <Helmet>
              <title>{user.name ? user.name : user.username} | curatedli.st</title>
              <meta property="og:title" content={user.name ? user.name : user.username + " | curatedli.st"} />
              <meta property="og:description" content={user.bio} />
              <meta property="og:image" content={user.avatar_url ? user.avatar_url : "https://joeschmoe.io/api/v1/" + user.email} />
            </Helmet>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt={user.name}
                        className="rounded-circle"
                        src={user.avatar_url ? user.avatar_url : "https://joeschmoe.io/api/v1/" + user.email}
                      />
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4" >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      {(user.id === currentUser.id) &&
                        <Link to={"/by/" + user.username + "/edit"}>
                          <Button
                            className="mr-4"
                            color="default"
                            size="sm" >
                            Edit
                          </Button>
                        </Link>
                      }
                      <Button className="mr-4" color="primary" size="sm" >
                        Follow
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <Button
                          className="text-capitalize font-weight-normal"
                          color="blank"
                          outline
                          onClick={(e) => loadLists(user.username, "lists")}>
                          <span className="heading">{user.lists}</span>
                          <span className="description">Lists</span>
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="text-capitalize font-weight-normal"
                          color="blank"
                          outline
                          onClick={(e) => loadLists(user.username, "favs")}>
                          <span className="heading">{user.favs.length}</span>
                          <span className=" description">Favs</span>
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="text-capitalize font-weight-normal"
                          color="blank"
                          outline
                          onClick={(e) => loadLists(user.username, "following")}>
                          <span className="heading">0</span>
                          <span className="description">Follows</span>
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {user.name}
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user.bio.substring(0, 500) + '...'}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <h3 style={{ textTransform: 'capitalize' }}>{props.section}</h3>
                  {(lists !== undefined && lists.length !== 0) &&
                    <ListContainer lists={lists} />
                  }
                  {props.section === "lists" &&
                    <Row className="justify-content-center">
                      <Col lg="9">
                        {(lists === undefined || lists.length === 0) &&
                          <p>
                            {user.name} doesn't have any list.... yet
                          </p>
                        }
                        {user.id === currentUser.id &&
                          <Link to={"/list/create"}>
                            <Button
                              className="btn-icon"
                              color="primary" >
                              <span className="btn-inner--icon">
                                <i className="ni ni-fat-add" ></i>
                              </span>
                              <span className="btn-inner--text">Create new List</span>
                            </Button>
                          </Link>
                        }
                      </Col>
                    </Row>
                  }
                </div>
              </div>
            </Card>
          </>
        }
      </Container>
    </App>
  )
};

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps
)(withRouter(Profile));
