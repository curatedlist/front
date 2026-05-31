import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

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
} from 'reactstrap';

// core components
import App from 'App';
import Item from 'components/list/_item';
import ItemSearchField from 'components/list/_itemSearchField';

import { listService } from '_services/list.service';

function ListDetails(props) {
  const [list, setList] = useState(props.list);

  const addItem = (item) => {
    let newList = Object.assign({}, list);
    newList.items.push(item);
    setList(newList);
  }

  const replaceItem = (item) => {
    const index = list.items.findIndex(it => it.id === item.id);
    let newList = Object.assign({}, list);
    newList.items[index] = item;
    setList(newList);
  }

  const handleAddItem = (values, { resetForm }) => {
    listService.addItem(props.user.idToken, props.list.id, values).then((item) => {
      resetForm();
      addItem(item);
      toast.success("Item added succesfully")
    }).catch(error => {
      toast.error(error.message)
    });
  };

  const deleteItem = (itemId) => {
    listService.deleteItem(props.user.idToken, props.list.id, itemId).then(item => {
      replaceItem(item);
      toast.success("Item deleted succesfully")
    }).catch(error => {
      toast.error(error.message)
    });
  }

  const favList = (event) => {
    listService.fav(props.user.idToken, props.list.id).then(list => {
      props.user.favs.push(list.id);
      setList(list);
      toast.success("List Favorited")
    }).catch(error => {
      toast.error(error.message)
    });
  };

  const unfavList = (event) => {
    listService.unfav(props.user.idToken, props.list.id).then(list => {
      const index = props.user.favs.indexOf(props.list.id)
      if (index !== -1) props.user.favs.splice(index);
      setList(list);
      toast.success("List unfaved")
    }).catch(error => {
      toast.error(error.message)
    });
  };


  var createbutton = () => {
    const { user, list } = props;
    if (list.owner.id === user.id) {
      return (
        <Card className="mb-4 shadow">
          <CardBody>
            <Formik
              initialValues={{ name: '', url: '', description: '', pic_url: '' }}
              onSubmit={handleAddItem}>
              {(props) => (
                <Form>
                  <Row>
                    <Col md="5">
                      <FormGroup>
                        <ItemSearchField
                          idToken={user.idToken}
                          value={props.values.name}
                          setFieldValue={props.setFieldValue} />
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
  const { user } = props;
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
                  onClick={favList} >
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
                  onClick={unfavList} >
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

        <div className="text-center">
          <h3 className="mb-0">{list.name}</h3>
          {list.description}
        </div>

        <div className="py-5 text-center">
          <Row className="justify-content-center">
            <Col lg="11">
              {props.list.items.filter((item) => { return !item.deleted }).map((item, index) => {
                return <Item key={item.id} index={index + 1} item={item} list={list} user={props.user} deleteItem={deleteItem} />
              })}
              {createbutton()}
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  )
}

function ListPage(props) {
  const { id } = useParams();
  const [listRequest, setListRequest] = useState({
    list: [],
    loading: true,
    error: undefined
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    listService.get(id)
      .then(
        (list) => {
          setListRequest({
            list: list,
            loading: false,
            error: undefined,
          });
        },
        (error) => {
          setListRequest({
            list: [],
            loading: false,
            error: error,
          });
        }
      )
  }, [id]);

  const {list, error, loading} = listRequest
  return (
    <App>
      <Container>
        {error &&
          <Alert color="danger">
            <strong>Error!</strong> {error.message}
          </Alert>
        }
        {!error && loading &&
          <div className="text-center">
            <div
              className="spinner-grow text-primary"
              style={{ width: 6 + 'rem', height: 6 + 'rem' }}
              role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        {!error && !loading &&
          <>
            <Helmet>
              <title>{list.name} by {list.owner.username} | curatedli.st</title>
              <meta property="og:title" content={list.name + " by " + list.owner.username + " | curatedli.st"} />
              <meta property="og:description" content={list.description} />
              <meta property="og:image" content={list.owner.avatar_url ? list.owner.avatar_url : "https://joeschmoe.io/api/v1/" + list.owner.email} />
            </Helmet>
            <ListDetails key={list.id} list={list} user={props.user} />
          </>
        }
      </Container>
    </App>
  )
};

const mapStateToProps = state => {
  return state.user;
};

export default connect(
  mapStateToProps
)(ListPage);