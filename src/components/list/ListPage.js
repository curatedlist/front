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
  Container,
  Row,
  Col,
  CardBody,
  CardTitle
} from "reactstrap";

// core components
import App from 'App';

import { listService } from '_services/list.service';

class ListItem extends Component {

  componentDidMount() {
    this.setState({
      list: this.props.list
    })
  }

  deleteItem = async (event) => {
    event.preventDefault();
    const itemId = event.currentTarget.getAttribute('data-id');
    this.props.deleteItem(itemId);
  };

  render() {
    const { item, index, user, list } = this.props;
    return (
      <>
        <Card className="mb-4 shadow">
          <CardBody>
            <Row className="align-items-center">
              <Col sm="1" className="pl-0">
                <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                  {index}
                </div>
              </Col>
              <Col sm="2" className="pr-0">
                <Media className="align-items-center">
                  <a
                    className="avatar rounded-circle mr-3"
                    href={item.url} >
                    <img
                      className="avatar"
                      alt={item.name}
                      src={item.pic_url} />
                  </a>
                </Media>
              </Col>
              <Col sm="7">
                <a
                  className=""
                  href={item.url} >
                  <CardTitle className="h5 font-weight-bold mb-0 ">
                    {item.name}
                  </CardTitle>
                </a>
                <p className="mt-3 mb-0 ml-3 text-muted text-sm">
                  {item.description.substring(0, 100) + '...'}
                </p>
              </Col>
              <Col sm="2" className="pl-0">
                {Object.keys(user).length !== 0 && user.id === list.owner.id &&
                  <Button className="btn-icon btn-2 mt-4" color="danger" type="button" onClick={this.deleteItem} data-id={item.id}>
                    <span className="btn-inner--icon">
                      <i className="fa fa-trash fa-2x" />
                    </span>
                  </Button>
                }
              </Col>
            </Row>
          </CardBody >
        </Card >
      </>
    )
  }
}

const ListItemWithRouter = withRouter(ListItem);

class ListDetails extends Component {
  state = {
    user_id: this.props.user.id,
    list_id: this.props.list.id,
    list: this.props.list
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
        this.setState({
          name: '',
          description: '',
          url: '',
        });
      });
  };

  deleteItem = (itemId) => {
    listService.deleteItem(this.state.list_id, itemId)
      .then(item => {
        const index = this.state.list.items.findIndex(it => it.id === item.id)
        let newList = Object.assign({}, this.state.list)
        newList.items[index] = item
        this.setState({
          list: newList
        })
      });
  }

  favList = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
    }
    var url = new URL(process.env.REACT_APP_API_URL + "lists/" + this.state.list_id + "/fav")
    url.search = new URLSearchParams({ 'user_id': this.props.user.id.toString() }).toString();
    fetch(url, requestOptions)
      .then(res => res.json())
      .then((result) => {
      });
  };

  render() {
    var loadItems = () => {
      let itemsList = this.props.list.items.filter((item) => { return !item.deleted }).map((item, index) => {
        return <ListItemWithRouter key={item.id} index={index + 1} item={item} list={this.state.list} user={this.props.user} deleteItem={this.deleteItem} />
      });
      return itemsList;
    };
    var createbutton = () => {
      const { user, list } = this.props;
      if (list.owner.id === user.id) {
        return (
          <Card className="mb-4 shadow">
            <CardBody>

              <Form onSubmit={this.addItem}>
                <input type="hidden" name="user_id" value={this.props.user.id} />
                <input type="hidden" name="list_id" value={this.state.list_id} />
                <Row>
                  <Col md="5">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        name="name"
                        value={this.state.name}
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
                        value={this.state.url}
                        type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about this item..."
                        name="description"
                        value={this.state.description}
                        rows="2"
                        type="textarea"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <Button
                      className="btn-icon"
                      color="primary"
                      type="submit" >
                      <span className="btn-inner--icon">
                        <i className="fa fa-plus-circle fa-2x" ></i>
                      </span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        )
      }
    }
    const { list } = this.state;
    const { user } = this.props;
    return (
      <Card className="card-profile shadow mt--300">
        <div className="px-4">
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image justify-content-center">
                <Link to={"/by/" + list.owner.username}>
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
                {Object.keys(user).length !== 0 && !user.favs.includes(list.id) &&
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    onClick={this.favList} >
                    <span className="btn-inner--icon">
                      <i className="ni ni-like-2" />
                    </span>
                    <span className="btn-inner--text">Like</span>
                  </Button>
                }
                {Object.keys(user).length !== 0 && user.favs.includes(list.id) &&
                  <Button
                    className="btn-icon btn-3"
                    color="secondary"
                    disabled
                    type="button">
                    <span className="btn-inner--icon ">
                      <i className="ni ni-like-2" />
                    </span>
                    <span className="btn-inner--text">Liked!</span>
                  </Button>
                }
              </div>
            </Col>
            <Col className="order-lg-1" lg="4">
              <div className="card-profile-stats d-flex justify-content-center">
                <div>
                  <span className="heading">{list.favs}</span>
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
                {loadItems()}
                {createbutton()}
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