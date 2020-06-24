import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { withToastManager } from 'react-toast-notifications';

import { setUser } from "redux/actions";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
} from "reactstrap";

import { Magic } from 'magic-sdk';

// core components
import App from 'App';

// Services & Helpes
import { userService } from '_services/user.service'

class Login extends Component {
  state = {
    magic: new Magic(process.env.REACT_APP_MAGIC_API_KEY)
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  handleLogin = event => {
    event.preventDefault();
    const email = new FormData(event.target).get("email");
    if (email) {
      this.state.magic.auth.loginWithMagicLink({ email })
        .then(token => {
          userService.getOrCreate(token, email)
            .then(user => {
              this.state.magic.user.getIdToken()
                .then(idToken => {
                  user.idToken = idToken;
                  this.props.setUser(user);
                  if (user.username === "") {
                    this.props.history.push("/create");
                  } else {
                    this.props.history.push("/by/" + this.props.user.username);
                  }
                })
            }).catch(error => {
              this.props.toastManager.add(error.message, { appearance: 'error', autoDismiss: true })
            });
        })
    }
  };

  render() {
    if (Object.keys(this.props.user).length !== 0) {
      return (
        <>
          <Redirect to={"/by/" + this.props.user.username} />
        </>
      );
    }
    return (
      <App>
        <Container>
          <Card className="card-profile bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={this.handleLogin} role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="e-mail" type="email" name="email" required="required" />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit" >
                    Login / Sign up
                    </Button>
                </div>
              </Form>
            </CardBody>
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
  mapStateToProps,
  { setUser }
)(withToastManager(withRouter(Login)));
