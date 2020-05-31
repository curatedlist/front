import React, { Component } from 'react'
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  Media,
  Row,
  Col,
  CardBody,
  CardTitle
} from "reactstrap";


class Item extends Component {

  deleteItem = async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.getAttribute('data-id');
    this.props.deleteItem(itemId);
  };

  render() {
    const { item, index, user, list } = this.props;
    return (
      <>
        <Card className="mb-4 shadow">
          <CardBody>
            <Row className="align-items-center">
              <Col sm="2" className="pl-0">
                <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                  {index}
                </div>
              </Col>
              <Col sm="2" className="pr-0">
                <Media className="align-items-center">
                  <a
                    className="avatar rounded-circle mr-3"
                    href={item.url} >
                    <img
                      className="avatar"
                      alt={item.name}
                      src={item.pic_url} />
                  </a>
                </Media>
              </Col>
              <Col sm="6">
                <a
                  className=""
                  href={item.url} >
                  <CardTitle className="h5 font-weight-bold mb-0 ">
                    {item.name}
                  </CardTitle>
                </a>
                <p className="mt-3 mb-0 ml-3 text-muted text-sm">
                  {item.description.substring(0, 100) + '...'}
                </p>
              </Col>
              <Col sm="2" className="pl-0">
                {Object.keys(user).length !== 0 && user.id === list.owner.id &&
                  <Button className="btn-icon btn-2 mt-4" color="danger" type="button" onClick={this.deleteItem} data-id={item.id}>
                    <span className="btn-inner--icon">
                      <i className="fa fa-trash fa-2x" />
                    </span>
                  </Button>
                }
              </Col>
            </Row>
          </CardBody >
        </Card >
      </>
    )
  }
};

const mapStateToProps = state => {
  return state.user;
};

export default connect(
  mapStateToProps
)(Item);
