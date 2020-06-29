import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withToastManager } from 'react-toast-notifications';
import { Helmet } from "react-helmet";

// reactstrap components
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "reactstrap";

// core components
import App from 'App'
import ListContainer from 'components/list/_lists'

// Services & Helpes
import { listService } from '_services/list.service';
import { userService } from '_services/user.service';

class Profile extends Component {
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    let username = this.props.match.params.username
    if (username === undefined) {
      this.props.history.push("/all");
    }
    userService.getByUsername(username)
      .then(
        (user) => {
          this.setState({
            isLoaded: true,
            user: user,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ).catch(error => {
        this.props.toastManager.add(error.message, { appearance: 'error', autoDismiss: true })
      })
    this.loadLists(username, this.props.section);
  }

  loadLists = (username, section) => {
    this.props.history.push("/by/" + username + "/" + section);
    listService.getListsByUsername(username, section)
      .then(
        (lists) => {
          this.setState({
            lists: lists
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, lists, user } = this.state;
    const currentUser = this.props.user;
    return (
      <App>
        <Container>
          {error &&
            <Alert className="mt--100" color="danger">
              <strong>Error!</strong> {error.message}
            </Alert>
          }
          {!error && !isLoaded &&
            <div class="text-center">
              <div class="spinner-grow text-primary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          }
          {!error && isLoaded &&
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
                            onClick={(e) => this.loadLists(user.username, "lists")}>
                            <span className="heading">{user.lists}</span>
                            <span className="description">Lists</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="text-capitalize font-weight-normal"
                            color="blank"
                            outline
                            onClick={(e) => this.loadLists(user.username, "favs")}>
                            <span className="heading">{user.favs.length}</span>
                            <span className=" description">Favs</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="text-capitalize font-weight-normal"
                            color="blank"
                            outline
                            onClick={(e) => this.loadLists(user.username, "following")}>
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
                    <h3 style={{ textTransform: 'capitalize' }}>{this.props.section}</h3>
                    {(lists !== undefined && lists.length !== 0) &&
                      <ListContainer lists={lists} />
                    }
                    {this.props.section === "lists" &&
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
};

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps
)(withToastManager(withRouter(Profile)));
