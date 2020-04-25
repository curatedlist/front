import React, { Component } from 'react'

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

// core components
import App from 'App';

class UserLogin extends Component {

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    render() {
        return (
            <App>
                <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                        <Col lg="5">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <Form role="form">
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
    };
};
export default UserLogin;
