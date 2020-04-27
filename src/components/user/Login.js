import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

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
    Row,
    Col
} from "reactstrap";

import { Magic } from 'magic-sdk';

// core components
import App from 'App';

class UserLogin extends Component {
    state = {
        magic: new Magic(process.env.REACT_APP_MAGIC_API_KEY),
        isLoggedIn: false
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.isLoggedIn()
    }

    isLoggedIn = () => {
        this.state.magic.user.isLoggedIn()
            .then((isLoggedIn) => {
                this.setState({
                    isLoggedIn: isLoggedIn
                })
            })
    }

    handleLogin = (event) => {
        event.preventDefault();
        const email = new FormData(event.target).get("email");
        if (email) {
            this.state.magic.auth.loginWithMagicLink({ email })
                .then((token) => {
                    this.setState({
                        isLoggedIn: true
                    });
                },
                    (error) => {
                        this.setState({
                            isLoggedIn: false
                        });
                    })
        };
    };

    render() {
        if (this.state.isLoggedIn) {
            return (
                <>
                    <Redirect
                        to="/"
                    />
                </>
            );
        } else {
            return (
                <App>
                    <Container className="pt-lg-7">
                        <Row className="justify-content-center">
                            <Col lg="5">
                                <Card className="bg-secondary shadow border-0">
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <Form onSubmit={this.handleLogin} role="form">
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Email" type="email" name="email" required="required" />
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    Sign in
                          </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                </App>
            )
        }
    };
};
export default UserLogin;
