import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';
import { setUser } from "redux/actions";

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

// Services & Helpes
import { userService } from '_services/user.service'

class Edit extends Component {
  state = {
    user: this.props.user
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  editProfile = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const user = userService.update(this.state.user.idToken, this.state.user.id, Object.fromEntries(data));
    this.props.setUser(user);
    this.props.history.push("/by/" + this.props.user.username)
  };

  render() {
    if (Object.keys(this.state.user).length === 0 || this.state.user.username !== this.props.match.params.username) {
      return (
        <>
          <Redirect
            to={"/by/" + this.props.match.params.username}
          />
        </>
      );
    } else {
      return (
        <App>
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Form onSubmit={this.editProfile}>
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={this.state.user.avatar_url ? this.state.user.avatar_url : "https://joeschmoe.io/api/v1/" + this.state.user.email}
                        />
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4" >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="primary"
                          size="sm"
                          type="submit" >
                          Save
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            name="name"
                            placeholder={this.state.user.name}
                            defaultValue={this.state.user.name}
                            type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Input
                            name="username"
                            placeholder={this.state.user.username}
                            defaultValue={this.state.user.username}
                            type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input disabled placeholder={this.state.user.email} name="email" value={this.state.user.email} type="email" />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            placeholder="A few words about this you..."
                            name="bio"
                            rows="2"
                            type="textarea"
                            defaultValue={this.state.user.bio}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </div>
            </Card>
          </Container>
        </App>
      )
    }
  };
};

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(Edit));
