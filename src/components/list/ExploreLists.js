import React, { Component } from 'react'

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table
} from "reactstrap";

// core components
import App from 'App';
import List from 'components/list/List'
import { listService } from '_services/list.service';

class ExploreLists extends Component {
  state = {
    error: null,
    isLoaded: false,
    lists: []
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    listService.getAll().then(
      (result) => {
        this.setState({
          isLoaded: true,
          lists: result.lists
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      })
  }

  render() {
    const { error, isLoaded, lists } = this.state;
    return (
      <App>
        <Container>
          <Card className="shadow mt--300">
            <CardHeader className="border-0 text-center">
              <h3 className="mb-0">Explore Lists</h3>
            </CardHeader>
            <div className="px-4">
              <div className="mt-5 py-5 text-center">
                <Row className="justify-content-center">
                  <Col lg="9">
                    {error && <em>Error: {error.message}</em>}
                    {!isLoaded && <em>Loading...</em>}
                    {lists.length != 0 &&
                      lists.map((list, index) =>
                        <List list={list} key={index} />
                      )
                    }
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Container>
      </App >
    )
  }
};
export default ExploreLists;
