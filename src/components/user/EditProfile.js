import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// reactstrap components
import {
    Button,
    Card,
    Container,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";

// core components
import App from 'App'

class EditProfile extends Component {

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    render() {
        return (
            <App>
                <Container>
                    <Card className="card-profile shadow mt--300">
                        <div className="px-4">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <img
                                            alt="..."
                                            className="rounded-circle"
                                            src={this.props.user.avatarURL ? this.props.user.avatarURL : require("assets/img/theme/user.svg")}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    className="order-lg-3 text-lg-right align-self-lg-center"
                                    lg="4"
                                >
                                    <div className="card-profile-actions py-4 mt-lg-0">
                                        <Link to="/profile/edit">
                                            <Button
                                                className="mr-4"
                                                color="default"
                                                size="sm"
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            className="mr-4"
                                            color="primary"
                                            size="sm"
                                        >
                                            Lists
                                        </Button>

                                    </div>
                                </Col>
                                <Col className="order-lg-1" lg="4">
                                    <div className="card-profile-stats d-flex justify-content-center">
                                        <div>
                                            <span className="heading">22</span>
                                            <span className="description">Lists</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center mt-5">
                            <Form>
          <Row>
            <Col md="6">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="David Santamaria"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
              <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input disabled placeholder="d.highwayman@gmail.com" type="email" />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
                            </div>
                        </div>
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
)(EditProfile);
