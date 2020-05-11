import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table
} from "reactstrap";

// core components
import App from 'App'
import List from 'components/list/List'

class Profile extends Component {
  render() {
    const { lists, user, currentUser } = this.props;
    var editbutton = () => {
      if (user.id === currentUser.id) {
        return (
          <Link to={"/user/" + user.id + "/edit"}>
            <Button
              className="mr-4"
              color="default"
              size="sm" >
              Edit
            </Button>
          </Link>
        )
      }
    }
    var createbutton = () => {
      if (user.id === currentUser.id) {
        return (
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
        )
      }
    }
    var loadLists = () => {
      let result = [];
      if (lists !== null && lists.length > 0) {
        result = lists.map((list, index) => {
          list.owner = user
          return <List list={list} key={index} />
        });
        return (
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Lists</h3>
                </div>
                <div className="col text-right">
                  {createbutton()}
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">List</th>
                  <th scope="col">Collaborators</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {result}
              </tbody>
            </Table>
          </Card>
        )
      } else {
        return (
          <Row className="justify-content-center">
            <Col lg="9">
              <p>
                {user.name} doesn't have any list.... yet
                        </p>
              {createbutton()}
            </Col>
          </Row>
        )
      }
    };
    return (
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
              {editbutton()}
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
                <span className="heading">0</span>
                <span className="description">Lists</span>
              </div>
              <div>
                <span className="heading">0</span>
                <span className="description">Favorites</span>
              </div>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-5">
          <h3>
            {user.name}
          </h3>
        </div>
        <div className="mt-5 py-5 border-top text-center">
          {loadLists()}
        </div>
      </div>
    )
  }
}
class UserProfile extends Component {
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (this.props.match.params.id !== undefined) {
      fetch(process.env.REACT_APP_API_URL + "users/id/" + this.props.match.params.id)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              user: result.user,
              lists: result.user.lists
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
    var loadProfile = () => {
      const { error, isLoaded, lists, user } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return <Profile user={user} lists={lists} currentUser={this.props.user} />
      }
    }
    return (
      <App>
        <Container>
          <Card className="card-profile shadow mt--300">
            {loadProfile()}
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
)(UserProfile);
