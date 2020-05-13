import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Button,
  Media,
  UncontrolledTooltip,
  CardTitle,
  CardBody
} from "reactstrap";


class List extends Component {

  render() {
    return (
      <>
        <Card>
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0">
                  <Link
                    to={"/list/" + this.props.list.id}
                    className="mb-0 text-sm" >
                    {this.props.list.name}
                  </Link>
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">Lorem ipsum blah blah blah dldlddl hahdah hadhdahad hadhadh</span>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
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
              <Button className="btn-icon btn-2" color="default" type="button">
            <span className="btn-inner--icon">
              <i className="ni ni-like-2" />
            </span>
          </Button>
            </Row>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default List;
