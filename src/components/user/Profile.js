import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import App from 'App'
import List from 'components/list/List'

// Services & Helpes
import { userService } from '_services/user.service';

class Profile extends Component {
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    let username = this.props.match.params.username
    if (username !== undefined) {
      userService.getByUsername(username)
        .then(
          (user) => {
            this.setState({
              isLoaded: true,
              user: user,
              lists: user.lists
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
  }

  render() {
    const { error, isLoaded, lists, user } = this.state;
    const currentUser = this.props.user;
    const { section } = this.props;

    function loadLists(lists){
      return lists.map((list, index) => {
        list.owner = user
        return <List list={list} key={index} />
      })
    }
    
    return (
      <App>
        <Container>
          <Card className="card-profile shadow mt--300">
            {error && <div>Error: {error.message}</div>}
            {!error && !isLoaded && <div>Loading...</div>}
            {!error && isLoaded &&
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt="..."
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
                        Lists
                      </Button>
                      <Button
                        className="float-right"
                        color="info"
                        size="sm">
                        Activity
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <Link
                          className="btn text-capitalize font-weight-normal"
                          color="blank"
                          outline
                          to={"/by/" + user.username}>
                          <span className="heading">{user.lists.length}</span>
                          <span className="description">Lists</span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          className="btn text-capitalize font-weight-normal"
                          color="blank"
                          outline
                          to={"/by/" + user.username + "/favs"}>
                          <span className="heading">{user.favs.length}</span>
                          <span className=" description">Favorites</span>
                        </Link>
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
                  {lists !== null && lists.length > 0 &&
                    <div className="px-4">
                      <div className="py-5 ">
                        <Row className="justify-content-center">
                          <Col lg="9">
                            {loadLists(lists)}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  }
                  <Row className="justify-content-center">
                    <Col lg="9">
                      {(lists === null || lists.length === 0) &&
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
                </div>
              </div>
            }
          </Card>
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
)(Profile);
