import React, { Component } from 'react'
import { connect } from "react-redux";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

// core components
import App from 'App'

class CreateList extends Component {

    state = {
        id: this.props.user.ID
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(data)) 
        }
        fetch(process.env.REACT_APP_API_URL + "lists/", requestOptions)
            .then(res => res.json())
            .then((result) => {
                this.props.history.push("/list/" + result.id)
            });

    };


    render() {
        return (
            <App>
                <Container>
                    <Card className="card-profile bg-secondary shadow">
                        <Form onSubmit={this.handleSubmit}>
                            <input type="hidden" name="user_id" value={this.state.id} />
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">New list</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            size="sm"
                                            type="submit" >
                                            Save
                                    </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <h6 className="heading-small text-muted mb-4">
                                    List data
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="name">
                                                    Name
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="name"
                                                    placeholder="List name"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label>About this list</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="A few words about this list..."
                                                    name="description"
                                                    rows="3"
                                                    defaultValue=""
                                                    type="textarea"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Form>
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
    mapStateToProps
)(CreateList);
