import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Button,
  Media,
  UncontrolledTooltip,
  CardTitle,
  CardBody,
  Card,
  Row,
  Col
} from "reactstrap";


class List extends Component {

  render() {
    return (
      <>
        <Link to={"/list/" + this.props.list.id} >
          <Card className="mb-4 shadow">
            <CardBody>
              <Row>
                <Col xs="10">
                  <Row>
                    <Col xs="8">
                      <CardTitle className="h2 font-weight-bold mb-0">
                        {this.props.list.name}
                      </CardTitle>
                    </Col>
                    <Col className="col-auto">
                      <span className="text-success mr-4">
                        By
                      </span>
                      <div className="icon icon-shape rounded-circle shadow">
                        <div className="avatar-group">
                          <Link
                            id={"tooltip" + this.props.list.owner.id}
                            className="avatar avatar-sm"
                            to={"/user/" + this.props.list.owner.id}
                          >
                            <img
                              alt={this.props.list.owner.name}
                              className="rounded-circle"
                              src={this.props.list.owner.avatar_url ? this.props.list.owner.avatar_url : "https://joeschmoe.io/api/v1/" + this.props.list.owner.email}
                            />
                          </Link>
                          <UncontrolledTooltip
                            delay={0}
                            target={"tooltip" + this.props.list.owner.id}
                          >
                            {this.props.list.owner.name}
                          </UncontrolledTooltip>
                        </div>
                      </div>
                      </Col>
                  </Row>
                  <Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {this.props.list.description}
                    </p>
                  </Row>
                </Col>
                <Col>
                  <Button className="btn-icon btn-2 mt-4" color="default" type="button" onClick={e => e.preventDefault()} >
                    <span className="btn-inner--icon">
                      <i className="ni ni-like-2" />
                    </span>
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Link>
      </>
    )
  }
}

export default List;
