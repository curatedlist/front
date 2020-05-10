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

class EditProfile extends Component {
    state = {
        id: this.props.user.ID,
        name: this.props.user.Name,
        email: this.props.user.Email,
        avatarURL: this.props.user.AvatarURL,
    };   

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(process.env.REACT_APP_API_URL + "users/id/" + this.props.user.ID, {
            method: 'PUT',
            body: data,
        }).then(() => {
            var newUser = {};
            data.forEach((value, key) => {newUser[key] = value});
            this.props.setUser({...this.props.user, ...newUser});
            this.props.history.push("/user/" + this.props.user.ID)
        });
        
    };


    render() {
        if (Object.keys(this.props.user).length === 0 || this.props.user.ID !== parseInt(this.props.match.params.id)) {
            return (
                <>
                    <Redirect
                        to={"/user/" + this.props.match.params.id}
                    />
                </>
            );
        } else {
            return (
                <App>
                    <Container>
                        <Card className="card-profile shadow mt--300">
                            <div className="px-4">
                                <Form onSubmit={this.handleSubmit}>
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={this.state.avatarURL ? this.state.avatarURL : "https://joeschmoe.io/api/v1/" + this.state.email}
                                                />
                                            </div>
                                        </Col>
                                        <Col
                                            className="order-lg-3 text-lg-right align-self-lg-center"
                                            lg="4"
                                        >
                                            <div className="card-profile-actions py-4 mt-lg-0">
                                                <Button
                                                    className="mr-4"
                                                    color="primary"
                                                    size="sm"
                                                    type="submit"
                                                >
                                                    Save
                                            </Button>

                                            </div>
                                        </Col>
                                        <Col className="order-lg-1" lg="4">
                                        </Col>
                                    </Row>
                                    <div className="text-center mt-5">
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input
                                                        name="Name"
                                                        placeholder={this.state.name}
                                                        defaultValue={this.state.name}
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
                                                        <Input disabled placeholder={this.state.email} name="Email" value={this.state.email} type="email" />
                                                    </InputGroup>
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
)(withRouter(EditProfile));
