import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Table
} from "reactstrap";

// core components
import App from 'App'
import List from 'components/list/List'

class Profile extends Component {
    render() {
        var editbutton = () => {
            const { user, currentUser } = this.props;
            if (user.ID === currentUser.ID) {
                return (
                    <Link to={"/user/" + user.ID + "/edit"}>
                        <Button
                            className="mr-4"
                            color="default"
                            size="sm" >
                            Edit
                        </Button>
                    </Link>
                )
            }
        }
        var createbutton = () => {
            const { user, currentUser } = this.props;
            if (user.ID === currentUser.ID) {
                return (
                    <Link to={"/list/create"}>
                    <Button
                        className="btn-icon" 
                        color="primary" >
                        <span className="btn-inner--icon">
                            <i className="ni ni-fat-add" ></i>
                        </span>
                        <span className="btn-inner--text">Create new List</span>
                    </Button>
                </Link>
                )
            }
        }
        var loadItems = () => {
            const { items, user } = this.props;
            let itemsList = [];
            if (items !== null && items.length > 0) {
                itemsList = items.map((item, index) => {
                    return <List key={index} item={item} index={index} owner={user} />
                });
                return (
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <Row className="align-items-center">
                                <div className="col">
                                    <h3 className="mb-0">Lists</h3>
                                </div>
                                <div className="col text-right">
                                    {createbutton()}
                                </div>
                            </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">List</th>
                                    <th scope="col">Collaborators</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {itemsList}
                            </tbody>
                        </Table>
                    </Card>
                )
            } else {
                return (
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          {user.Name} doesn't have any list.... yet
                        </p>
                        {createbutton()}
                      </Col>
                    </Row>
                )
            }
        };
        const user = this.props.user;
        return (
            <div className="px-4">
                <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                            <img
                                alt="..."
                                className="rounded-circle"
                                src={user.AvatarURL ? user.AvatarURL : "https://joeschmoe.io/api/v1/" + user.Email}
                            />
                        </div>
                    </Col>
                    <Col
                        className="order-lg-3 text-lg-right align-self-lg-center"
                        lg="4" >
                        <div className="card-profile-actions py-4 mt-lg-0">
                            {editbutton()}
                            <Button className="mr-4" color="primary" size="sm" >
                                Lists
                            </Button>
                            <Button
                                className="float-right"
                                color="info"
                                size="sm"
                            >
                                Activity
                        </Button>
                        </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                        <div className="card-profile-stats d-flex justify-content-center">
                            <div>
                                <span className="heading">0</span>
                                <span className="description">Lists</span>
                            </div>
                            <div>
                                <span className="heading">0</span>
                                <span className="description">Favorites</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="text-center mt-5">
                    <h3>
                        {user.Name}
                    </h3>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                    {loadItems()}
                </div>
            </div>
        )
    }
}
class UserProfile extends Component {
    state = {
        isLoaded: false,
        error: undefined,
        user: undefined,
        items: undefined,
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        if (this.props.match.params.id !== undefined) {
            fetch(process.env.REACT_APP_API_URL + "users/id/" + this.props.match.params.id)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            user: result.user,
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
        var loadProfile = () => {
            const { error, isLoaded, items, user } = this.state;
            if (error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else {
                return <Profile user={user} items={items} currentUser={this.props.user} />
            }
        }
        return (
            <App>
                <Container>
                    <Card className="card-profile shadow mt--300">
                        {loadProfile()}
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
)(UserProfile);
