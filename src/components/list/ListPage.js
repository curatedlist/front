import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { withToastManager } from 'react-toast-notifications';

// reactstrap components
import {
  Alert,
  Button,
  Card,
  FormGroup,
  Container,
  Row,
  Col,
  CardBody,
} from "reactstrap";

// core components
import App from 'App';
import Item from 'components/list/_item';

import { listService } from '_services/list.service';

class ListDetails extends Component {
  state = {
    list: this.props.list
  }

  addItem = (item) => {
    let newList = Object.assign({}, this.state.list);
    newList.items.push(item);
    this.setState({
      list: newList
    });
  }

  replaceItem = (item) => {
    const index = this.state.list.items.findIndex(it => it.id === item.id);
    let newList = Object.assign({}, this.state.list);
    newList.items[index] = item;
    this.setState({
      list: newList
    });
  }

  handleAddItem = (values, { resetForm }) => {
    listService.addItem(this.props.user.idToken, this.props.list.id, values).then((item) => {
      resetForm();
      this.addItem(item);
      this.props.toastManager.add("Item added succesfully", { appearance: 'info', autoDismiss: true })
    }).catch(error => {
      this.props.toastManager.add(error.message, { appearance: 'error', autoDismiss: true })
    });
  };

  deleteItem = (itemId) => {
    listService.deleteItem(this.props.user.idToken, this.props.list.id, itemId).then(item => {
      this.replaceItem(item);
      this.props.toastManager.add("Item deleted succesfully", { appearance: 'info', autoDismiss: true })
    }).catch(error => {
      this.props.toastManager.add(error.message, { appearance: 'error', autoDismiss: true })
    });
  }

  favList = (event) => {
    listService.fav(this.props.user.idToken, this.props.list.id).then(list => {
      this.props.user.favs.push(list.id);
      this.setState({
        list: list
      });
      this.props.toastManager.add("List Favorited", { appearance: 'info', autoDismiss: true })
    }).catch(error => {
      this.props.toastManager.add(error.message, { appearance: 'error', autoDismiss: true })
    });
  };

  unfavList = (event) => {
    listService.unfav(this.props.user.idToken, this.props.list.id).then(list => {
      const index = this.props.user.favs.indexOf(this.props.list.id)
      if (index !== -1) this.props.user.favs.splice(index);
      this.setState({
        list: list
      });
      this.props.toastManager.add("List unfaved", { appearance: 'info', autoDismiss: true })
    }).catch(error => {
      this.props.toastManager.add(error.message, { appearance: 'error', autoDismiss: true })
    });
  };

  render() {
    var createbutton = () => {
      const { user, list } = this.props;
      if (list.owner.id === user.id) {
        return (
          <Card className="mb-4 shadow">
            <CardBody>
              <Formik
                initialValues={{ name: '', url: '', description: '' }}
                onSubmit={this.handleAddItem}>
                {(props) => (
                  <Form>
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <Field
                            className="form-control form-control-alternative"
                            name="name"
                            placeholder="Item name"
                            type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup>
                          <Field
                            className="form-control form-control-alternative"
                            placeholder="URL"
                            name="url"
                            type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="10">
                        <FormGroup>
                          <Field
                            className="form-control form-control-alternative"
                            placeholder="A few words about this item..."
                            name="description"
                            rows="2"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <Button
                          className="btn-icon"
                          color="primary"
                          disabled={props.isSubmitting}
                          type="submit" >
                          <span className="btn-inner--icon">
                            <i className="fa fa-plus-circle fa-2x" ></i>
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
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
                {Object.keys(user).length !== 0 && user.id !== list.owner.id && !user.favs.includes(list.id) &&
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
                {Object.keys(user).length !== 0 && user.id !== list.owner.id && user.favs.includes(list.id) &&
                  <Button
                    className="btn-icon btn-3"
                    color="secondary"
                    type="button"
                    onClick={this.unfavList} >
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
              <Col lg="11">
                {this.props.list.items.filter((item) => { return !item.deleted }).map((item, index) => {
                  return <Item key={item.id} index={index + 1} item={item} list={this.state.list} user={this.props.user} deleteItem={this.deleteItem} />
                })}
                {createbutton()}
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    )
  }
}

const ListDetailsWithRouterAndToast = withToastManager(withRouter(ListDetails));

class ListPage extends Component {
  state = {
    error: undefined,
    isLoaded: false,
    list: []
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    listService.get(this.props.match.params.id)
      .then(
        (list) => {
          this.setState({
            isLoaded: true,
            list: list
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
    const { error, isLoaded, list } = this.state;
    return (
      <App>
        <Container>
          {error &&
            <Alert color="danger">
              <strong>Error!</strong> {error.message}
            </Alert>
          }
          {!error && !isLoaded &&
            <div class="text-center">
              <div class="spinner-grow text-primary" style={{ width: 6 + 'rem', height: 6 + 'rem' }} role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          }
          {!error && isLoaded && <ListDetailsWithRouterAndToast key={list.id} list={list} user={this.props.user} />}
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