import React from 'react';
import { connect } from 'react-redux';

// reactstrap components
import {
  Button,
  Card,
  Container,
  CardFooter,
  Row,
  Col,
  CardBody
} from 'reactstrap';


function Item(props) {

  const deleteItem = async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.getAttribute('data-id');
    props.deleteItem(itemId);
  };


  const { item, index, user, list } = props;
  return (
    <>


<div className="team-4">
<Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="10">
              <Card className="card-horizontal">
                <Row>
                  <Col xl="5">
                    <div className="card-image no-mask">
                      <a href={item.url}>
                        <img
                          alt={item.name}
                          className="img"
                          src={item.pic_url}
                        ></img>
                      </a>
                    </div>
                  </Col>
                  <Col xl="7">
                    <CardBody className="mt-3">
                      <div className="card-profile-stats">
                        <div className="text-left p-0">
                          <span className="heading pb-3">
                              <Button
                                className="btn-icon-only rounded-circle"
                                color="primary"
                                type="button"
                              >
                                {index}
                              </Button><span className="ml-2">{item.name}</span>
                            </span>
                          <span className="description">{item.description.substring(0, 100) + '...'}</span>
                        </div>
                      </div>
                    </CardBody>
                    {Object.keys(user).length !== 0 && user.id === list.owner.id &&
                      <CardFooter>
                        <Button
                          className="rounded-circle float-right"
                          color="danger"
                          onClick={deleteItem}
                          data-id={item.id}
                          size="sm"
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </CardFooter>
                    }
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
</div>
    </>
  )
};

const mapStateToProps = state => {
  return state.user;
};

export default connect(
  mapStateToProps
)(Item);
