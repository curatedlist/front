import React, { Component } from 'react'
import { Link } from "react-router-dom";

// reactstrap components
import {
  Badge,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import App from 'App';

function BigHero() {
  return (
    <Container>
      <div className="row-grid justify-content-between align-items-center row">
        <div className="mb-6 mb-lg-0 col-lg-6">
          <h1 className="display-3 text-white">
            Curatedli.st
            <span className="text-white">Collaborative Curated Content</span>
          </h1>
          <p className="lead text-white mt-4">Collaborative curated content lists that won't suck. Share your content with others and get feedback. Review other's content.</p>
          <Link to="/all">
            <Button
              className="btn-white mt-4"
              color="default">
              Explore Lists
            </Button>
          </Link>
        </div>
        <div className="mb-lg-auto col-lg-5">
          <div className="transform-perspective-right">
            <img
              alt="..."
              className="img-center img-fluid"
              src={require("assets/img/theme/checklist.svg")} />
          </div>
        </div>
      </div>
    </Container>
  )
}

function Features() {
  return (
    <Container>
      <Row className="row-grid align-items-center">
        <Col className="order-md-2" md="6">
          <img
            alt="..."
            className="img-fluid floating"
            src={require("assets/img/theme/review.svg")} />
        </Col>
        <Col className="order-md-1" md="6">
          <div className="pr-md-5">
            <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
              <i className="ni ni-spaceship" />
            </div>
            <h3>Awesome features</h3>
            <p>
              This is where curated content starts.
            </p>
            <ul className="list-unstyled mt-5">
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <Badge
                      className="badge-circle mr-3"
                      color="success" >
                      <i className="ni ni-bullet-list-67" />
                    </Badge>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Carefully curated content
                      </h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <Badge
                      className="badge-circle mr-3"
                      color="success" >
                      <i className="ni ni-world" />
                    </Badge>
                  </div>
                  <div>
                    <h6 className="mb-0">Collaborative editing</h6>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="d-flex align-items-center">
                  <div>
                    <Badge
                      className="badge-circle mr-3"
                      color="success" >
                      <i className="ni ni-send" />
                    </Badge>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      Share your content
                      </h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

class Home extends Component {

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  render() {
    return (
      <App hero={<BigHero />}>
        <Features />
      </App>
    );
  }
}
export default Home;
