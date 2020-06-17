import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';
import { setUser } from "redux/actions";
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
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

  validateUsername = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (values.username === this.state.user.username) {
      return errors;
    }
    return userService.getByUsername(values.username)
      .then((user) => {
        errors.username = "Not valid"
        return errors
      }).catch(error => {
        return errors;
      })
  }

  handleSubmit = (values) => {
    userService.update(this.props.user.idToken, this.state.user.id, values).then(user => {
      this.props.setUser(user);
      this.props.history.push("/by/" + this.props.user.username)
    })
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
              <CardBody>
                <Formik
                  initialValues={{ name: this.state.user.name, username: this.state.user.username, bio: this.state.user.bio, email: this.state.user.email }}
                  validate={this.validateUsername}
                  onSubmit={this.handleSubmit}>
                  {(props) => (
                    <Form>
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="3">
                          <div className="card-profile-image">
                            <img
                              alt={this.state.user.name ? this.state.user.name : this.state.user.email}
                              className="rounded-circle"
                              src={this.state.user.avatar_url ? this.state.user.avatar_url : "https://joeschmoe.io/api/v1/" + this.state.user.email}
                            />
                          </div>
                        </Col>
                      </Row>
                      <h3 class="mt-8  mb-4">User information</h3>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="name">
                              Full name
                              </label>
                            <Field
                              name="name"
                              placeholder="Your name"
                              type="text"
                              className="form-control" />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="username">
                              Username
                            </label>
                            <div className={props.touched.username ? (props.errors.username ? "has-danger" : "has-success") : null}>
                              <Field
                                className={classnames("form-control", {
                                  "is-valid": props.touched.username && !props.errors.username,
                                  "is-invalid": props.touched.username && props.errors.username
                                })}
                                name="username"
                                required
                                placeholder="Your username"
                                type="text" />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="email">
                              Email address
                            </label>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Field className="form-control" disabled name="email" value={this.state.user.email} type="email" />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="bio">
                              About me
                              </label>
                            <Field
                              className="form-control"
                              placeholder="A few words about this you..."
                              name="bio"
                              rows={8}
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Button
                          className="my-4"
                          color="primary"
                          size="xl"
                          type="submit"
                          disabled={props.isSubmitting}>
                          Save
                        </Button>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </CardBody>
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
