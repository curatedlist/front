import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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

class UserLogin extends Component {
  state = {
    magic: new Magic(process.env.REACT_APP_MAGIC_API_KEY),
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (Object.keys(this.props.user).length !== 0) {
      this.props.history.push("/by/" + this.props.user.username);
    }
  }

  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const email = new FormData(event.target).get("email");
      if (email) {
        const token = await this.state.magic.auth.loginWithMagicLink({ email })
        const user = await userService.getOrCreate(email, token);
        this.props.setUser(user);
        if (user.username === undefined || user.username === "") {
          this.props.history.push("/create");
        } else {
          this.props.history.push("/by/" + this.props.user.username);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
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
)(withRouter(UserLogin));