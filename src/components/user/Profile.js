import React, { Component } from 'react'

// reactstrap components
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Table
} from "reactstrap";

// core components
import App from 'App'
import List from 'components/list/List'

class UserProfile extends Component {
    state = {
        isLoaded: false,
        user: undefined,
        avatarURL: '',
        name: ''
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        if (this.props.match.params.id !== undefined) {
            fetch(process.env.REACT_APP_API_URL + "users/" + this.props.match.params.id)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            user: result.user,
                            avatarURL: result.user.AvatarURL,
                            name: result.user.Name,
                            items: result.user.Lists
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    render() {
        var loadItems = () => {
            const { error, isLoaded, items, user } = this.state;
            if (error) {
                return <tr><td colSpan="3">Error: {error.message}</td></tr>;
            } else if (!isLoaded) {
                return <tr><td colSpan="3">Loading...</td></tr>;
            } else {
                let itemsList = items.map((item, index) => {
                    return <List key={index} item={item} index={index} owner={user} />
                });
                return itemsList;
            }
        };
        return (
            <App>
                <Container>
                    <Card className="card-profile shadow mt--300">
                        <div className="px-4">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <img
                                            alt="..."
                                            className="rounded-circle"
                                            src={this.state.avatarURL}
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
                                        >
                                            Lists
                                </Button>

                                    </div>
                                </Col>
                                <Col className="order-lg-1" lg="4">
                                    <div className="card-profile-stats d-flex justify-content-center">
                                        <div>
                                            <span className="heading">22</span>
                                            <span className="description">Lists</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center mt-5">
                                <h3>
                                    {this.state.name}
                                </h3>
                            </div>
                            <div className="mt-5 py-5 border-top text-center">
                                <Row className="justify-content-center">
                                    <Col lg="9">
                                        <Table className="align-items-center" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">List</th>
                                                    <th scope="col">Collaborators</th>
                                                    <th scope="col" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loadItems()}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card>
                </Container>

            </App>
        )
    };
};
export default UserProfile;
