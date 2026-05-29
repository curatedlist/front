import React, { useEffect } from 'react';

// Dependencies & libraries
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { GoogleLogin } from '@react-oauth/google';

import { setUser } from 'redux/actions';
import { saveSession } from '_helpers/auth';

// reactstrap components
import {
  Card,
  CardBody,
  Container,
} from 'reactstrap';

// core components
import App from 'App';

// Services & Helpes
import { userService } from '_services/user.service'

function Login(props) {
  const { addToast } = useToasts()

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const handleSuccess = (credentialResponse) => {
    const idToken = credentialResponse.credential;
    userService.getOrCreate(idToken)
      .then(user => {
        user.idToken = idToken;
        saveSession(user);
        props.setUser(user);
        if (user.username === "") {
          props.history.push("/create");
        } else {
          props.history.push("/by/" + user.username);
        }
      })
      .catch(error => {
        addToast(error.message, { appearance: 'error', autoDismiss: true });
      });
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
            <div className="text-center">
              <h4 className="mb-4">Sign in to curatedli.st</h4>
              <div className="d-inline-block">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => addToast('Login failed', { appearance: 'error', autoDismiss: true })}
                  useOneTap
                />
              </div>
            </div>
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
