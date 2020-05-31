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

import { listService } from '_services/list.service';

class List extends Component {
  state = {
    list: this.props.list,
  }

  favList = (event) => {
    listService.fav(this.props.list.id, this.props.user.id)
      .then(list => {
        this.props.user.favs.push(list.id);
        this.setState({
          list: list
        });
      });
  };

  unfavList = (event) => {
    listService.unfav(this.props.list.id, this.props.user.id)
      .then(list => {
        const index = this.props.user.favs.indexOf(this.props.list.id)
        if (index !== -1) this.props.user.favs.splice(index);
        this.setState({
          list: list
        });
      });
  };

  delete = (event) => {
    listService.deleteList(this.props.list.id, this.props.user.id)
      .then(list => {
        this.setState({
          list: list
        });
      });
  };

  render() {
    const { user } = this.props
    const { list } = this.state
    return (
      <>
        {!list.deleted &&
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
                  <Col sm="3">
                    {user.id === list.owner.id &&
                      <Button className="btn-icon btn-2 mt-4"
                        color="danger"
                        type="button"
                        onClick={this.delete} >
                        <span className="btn-inner--icon">
                          <i className="fa fa-trash fa-2x" />
                        </span>
                      </Button>
                    }
                    {!user.favs.includes(list.id) &&
                      <Button className="btn-icon btn-2 mt-4"
                        color="default"
                        type="button"
                        onClick={this.favList} >
                        <span className="btn-inner--icon">
                          <i className="ni ni-like-2 ni-2x" />
                        </span>
                      </Button>
                    }
                    {user.favs.includes(list.id) &&
                      <Button className="btn-icon btn-2 mt-4"
                        color="secondary"
                        type="button"
                        onClick={this.unfavList} >
                        <span className="mt-4">
                          <i className="ni ni-like-2 ni-2x" />
                        </span>
                      </Button>
                    }
                  </Col>
                }
              </Row>
            </CardBody>
          </Card>
        }
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
