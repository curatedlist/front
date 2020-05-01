import React, { Component } from 'react'
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  Media,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import App from 'App';

class ListItem extends Component {
  render() {
    return (
      <>
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              {this.props.index}
            </Media>
          </th>
          <td>
            <Media className="align-items-center">
              <a
                className="avatar rounded-circle mr-3"
                href={this.props.item.URL}
              >
                <img
                  className="avatar"
                  alt={this.props.item.Name}
                  src={this.props.item.PicURL}
                />
              </a>
              <Media>
                <span className="mb-0 text-sm">
                  <a href={this.props.item.URL}>
                    {this.props.item.Name}
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
          </td>
        </tr>
      </>
    )
  }
}

class ListDetails extends Component {
  render() {
    var loadItems = () => {
      let itemsList = this.props.list.Items.map((item, index) => {
        return <ListItem key={index} item={item} index={index} />
      });
      return itemsList;
    };
    return (
      <Card className="card-profile shadow mt--300">
        <div className="px-4">
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image justify-content-center">
                <Link to={"/user/" + this.props.list.Owner.ID}>
                  <img
                    alt={this.props.list.Owner.Name}
                    className="rounded-circle"
                    src={this.props.list.Owner.AvatarURL?this.props.list.Owner.AvatarURL:require("assets/img/theme/user.svg")}
                  />
                </Link>
              </div>
            </Col>
            <Col
              className="order-lg-3 text-lg-right align-self-lg-center"
              lg="4"
            >
              <div className="card-profile-actions py-4 mt-lg-0">
                <Button className="btn-icon btn-3" color="primary" type="button"
                  onClick={e => e.preventDefault()}
                >
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
                  <span className="heading">22</span>
                  <span className="description">Likes</span>
                </div>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <h3 className="mb-0">{this.props.list.Name}</h3>
            {this.props.list.Description}
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

class ListPage extends Component {
  state = {
    error: null,
    isLoaded: false,
    list: []
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    fetch(process.env.REACT_APP_API_URL + "lists/" + this.props.match.params.id)
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
        return <ListDetails list={list} />
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
export default ListPage;
