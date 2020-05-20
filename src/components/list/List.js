import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  UncontrolledTooltip,
  CardTitle,
  CardBody,
  Card,
  Row,
  Col
} from "reactstrap";


class List extends Component {

  favList = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
    }
    var url = new URL(process.env.REACT_APP_API_URL + "lists/" + this.props.list.id + "/fav")
    url.search = new URLSearchParams({ 'user_id': this.props.user.id.toString() }).toString();
    fetch(url, requestOptions)
      .then(res => res.json())
      .then((result) => {
      });
  };

  render() {
    const { list, user } = this.props
    return (
      <>
        <Card className="mb-4 shadow">
          <CardBody>
            <Row className="justify-content-md-center">
              <Col>
                <Row className="justify-content-md-center">
                  <Col sm="8">
                    <Link to={"/list/" + list.id} >
                      <CardTitle className="h4 font-weight-bold mb-0 text-nowrap">
                        {list.name}
                      </CardTitle>
                    </Link>
                  </Col>
                  <Col className="col-auto">
                    <span className="text-success mr-4 text-center">
                      By
                      </span>
                    <div className="icon icon-shape rounded-circle shadow">
                      <div className="avatar-group">
                        <Link
                          id={"tooltip" + list.owner.id}
                          className="avatar avatar-sm"
                          to={"/by/" + list.owner.username}
                        >
                          <img
                            alt={list.owner.name}
                            className="rounded-circle"
                            src={list.owner.avatar_url ? list.owner.avatar_url : "https://joeschmoe.io/api/v1/" + list.owner.email}
                          />
                        </Link>
                        <UncontrolledTooltip
                          delay={0}
                          target={"tooltip" + list.owner.id}
                        >
                          {list.owner.name}
                        </UncontrolledTooltip>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Link to={"/list/" + list.id} >
                    <p className="mt-3 mb-0 ml-3 text-muted text-sm">
                      {list.description}
                    </p>
                  </Link>
                </Row>
              </Col>
              {Object.keys(user).length !== 0 &&
                <Col sm="2">
                  {!user.favs.includes(list.id) &&
                    <Button className="btn-icon btn-2 mt-4"
                      color="default"
                      type="button"
                      onClick={this.favList} >
                      <span className="btn-inner--icon">
                        <i className="ni ni-like-2" />
                      </span>
                    </Button>
                  }
                  {user.favs.includes(list.id) &&
                    <Button className="btn-icon btn-2 mt-4" color="secondary" disabled type="button">
                      <span className="mt-4">
                        <i className="ni ni-like-2" />
                      </span>
                    </Button>
                  }
                </Col>
              }
            </Row>
          </CardBody>
        </Card>
      </>
    )
  }
}

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps
)(List);
