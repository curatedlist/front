import React, { useState, useEffect } from 'react';

// Dependencies & libraries
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Magic } from 'magic-sdk';

import { setUser } from 'redux/actions';

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
} from 'reactstrap';

// core components
import App from 'App';

// Services & Helpes
import { userService } from '_services/user.service'

function Login(props) {
  const [magic] = useState(new Magic(process.env.REACT_APP_MAGIC_API_KEY));
  const { addToast } = useToasts()

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);


  const handleLogin = (event) => {
    event.preventDefault();
    const email = new FormData(event.target).get("email");
    if (email) {
      magic.auth.loginWithMagicLink({ email })
        .then(token => {
          userService.getOrCreate(token, email)
            .then(user => {
              magic.user.getIdToken()
                .then(idToken => {
                  user.idToken = idToken;
                  props.setUser(user);
                  if (user.username === "") {
                    props.history.push("/create");
                  } else {
                    props.history.push("/by/" + user.username);
                  }
                });
            }).catch(error => {
              addToast(error.message, { appearance: 'error', autoDismiss: true });
              magic.user.logout();
            });
        })
    }
  };


  if (Object.keys(props.user).length !== 0) {
    return (
      <>
        <Redirect to={"/by/" + props.user.username} />
      </>
    );
  }
  return (
    <App>
      <Container>
        <Card className="card-profile bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form onSubmit={handleLogin} role="form">
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

const mapStateToProps = state => {
  return state.user;
};


export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(Login));
