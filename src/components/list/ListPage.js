import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  Media,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import App from 'App';

class ListItem extends Component {

  componentDidMount() {
    this.setState({
      list: this.props.list
    })
  }

  deleteItem = (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.getAttribute('data-id');
    const requestOptions = {
      method: 'PATCH',
    }
    fetch(process.env.REACT_APP_API_URL + "lists/" + this.props.list.id + "/items/" + itemId + "/delete", requestOptions)
      .then(res => res.json())
      .then((result) => {
        const index = this.state.list.items.findIndex( item => item.id === result.item.id)
        this.state.list.items[index] = result.item
        this.props.history.push("/list/" + this.props.list.id)
      });
  };

  render() {
    const { item, key } = this.props;
    return (
      <>
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              {key}
            </Media>
          </th>
          <td>
            <Media className="align-items-center">
              <a
                className="avatar rounded-circle mr-3"
                href={item.url} >
                <img
                  className="avatar"
                  alt={item.name}
                  src={item.pic_url} />
              </a>
              <Media>
                <span className="mb-0 text-sm">
                  <a href={item.url}>
                    {item.name}
                  </a>
                </span>
              </Media>
            </Media>
          </td>
          <td className="text-right">
            <Button className="btn-icon btn-2" color="default" type="button">
              <span className="btn-inner--icon">
                <i className="ni ni-like-2" />
              </span>
            </Button>
            <Button className="btn-icon btn-2" color="danger" type="button" onClick={this.deleteItem} data-id={item.id}>
              <span className="btn-inner--icon">
                <i className="ni ni-fat-delete" />
              </span>
            </Button>
          </td>
        </tr>
      </>
    )
  }
}

const ListItemWithRouter = withRouter(ListItem);

class ListDetails extends Component {
  //TODO: remove
  state = {
    user_id: this.props.user.id,
    list_id: this.props.list.id,
    list: this.props.list
  }

  componentDidMount() {
    this.setState({
      user_id: this.props.user.id,
      list_id: this.props.list.id,
      list: this.props.list
    })
  }

  addItem = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(data))
    }
    fetch(process.env.REACT_APP_API_URL + "lists/" + this.state.list_id + "/items/", requestOptions)
      .then(res => res.json())
      .then((result) => {
        this.state.list.items.push(result.item)
        this.props.history.push("/list/" + this.state.list_id)
      });

  };

  render() {
    var loadItems = () => {
      let itemsList = this.props.list.items.map((item, index) => {
        if (!item.deleted) {
          return <ListItemWithRouter key={index} item={item} list={this.state.list} />
        } else {
          return <></>
        }
      });
      return itemsList;
    };
    var createbutton = () => {
      const { user, list } = this.props;
      if (list.owner.id === user.id) {
        return (
          <tr>
            <td colSpan="3">
              <Form onSubmit={this.addItem}>
                <input type="hidden" name="user_id" value={this.props.user.id} />
                <input type="hidden" name="list_id" value={this.state.list_id} />
                <Row>
                  <Col md="5">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        name="name"
                        placeholder="Item name"
                        type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="URL"
                        name="url"
                        type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <Button
                      className="btn-icon"
                      color="primary"
                      type="submit" >
                      <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" ></i>
                      </span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </td>
          </tr>
        )
      }
    }
    const { list } = this.state;
    return (
      <Card className="card-profile shadow mt--300">
        <div className="px-4">
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image justify-content-center">
                <Link to={"/user/" + list.owner.id}>
                  <img
                    alt={list.owner.name}
                    className="rounded-circle"
                    src={list.owner.avatar_url ? list.owner.avatar_url : "https://joeschmoe.io/api/v1/" + list.owner.email} />
                </Link>
              </div>
            </Col>
            <Col
              className="order-lg-3 text-lg-right align-self-lg-center"
              lg="4" >
              <div className="card-profile-actions py-4 mt-lg-0">
                <Button className="btn-icon btn-3" color="primary" type="button"
                  onClick={e => e.preventDefault()} >
                  <span className="btn-inner--icon">
                    <i className="ni ni-like-2" />
                  </span>
                  <span className="btn-inner--text">Like</span>
                </Button>
              </div>
            </Col>
            <Col className="order-lg-1" lg="4">
              <div className="card-profile-stats d-flex justify-content-center">
                <div>
                  <span className="heading">0</span>
                  <span className="description">Likes</span>
                </div>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <h3 className="mb-0">{list.name}</h3>
            {list.description}
          </div>

          <div className="mt-5 py-5 text-center">
            <Row className="justify-content-center">
              <Col lg="9">
                <Table className="align-items-center" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {loadItems()}
                    {createbutton()}
                  </tbody>
                </Table>

              </Col>
            </Row>
          </div>
        </div>
      </Card>
    )
  }
}

const ListDetailsWithRouter = withRouter(ListDetails);

class ListPage extends Component {
  state = {
    error: null,
    isLoaded: false,
    list: []
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    fetch(process.env.REACT_APP_API_URL + "lists/id/" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            list: result.list
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

  render() {
    var loadList = () => {
      const { error, isLoaded, list } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return <ListDetailsWithRouter key={list.id} list={list} user={this.props.user} />
      }
    };
    return (
      <App>
        <Container>
          {loadList()}
        </Container>
      </App>
    )
  }
};
const mapStateToProps = state => {
  return state.user;
};

export default connect(
  mapStateToProps
)(ListPage);