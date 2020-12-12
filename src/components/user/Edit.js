import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setUser } from 'redux/actions';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import { useToasts } from 'react-toast-notifications';

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
} from 'reactstrap';

// core components
import App from 'App'

// Services & Helpes
import { userService } from '_services/user.service'

function Edit(props) {
  const [user, setUser] = useState(props.user);
  const { addToast } = useToasts()

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);


  const validateUsername = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (values.username === user.username) {
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

  const handleSubmit = (values) => {
    userService.update(props.user.idToken, user.id, values).then(user => {
      setUser(user);
      props.history.push("/by/" + user.username)
    }).catch(error => {
      addToast(error.message, { appearance: 'error', autoDismiss: true })
    });
  };


  if (Object.keys(user).length === 0 || user.username !== props.match.params.username) {
    return (
      <>
        <Redirect
          to={"/by/" + props.match.params.username}
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
                initialValues={{ name: user.name, username: user.username, bio: user.bio, email: user.email }}
                validate={validateUsername}
                onSubmit={handleSubmit}>
                {(props) => (
                  <Form>
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <img
                            alt={user.name ? user.name : user.email}
                            className="rounded-circle"
                            src={user.avatar_url ? user.avatar_url : "https://joeschmoe.io/api/v1/" + user.email}
                          />
                        </div>
                      </Col>
                    </Row>
                    <h3 className="mt-8  mb-4">User information</h3>
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
                            <Field className="form-control" disabled name="email" value={user.email} type="email" />
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

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(Edit));
