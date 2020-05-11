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

class ExploreLists extends Component {
  state = {
    error: null,
    isLoaded: false,
    lists: []
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    fetch(process.env.REACT_APP_API_URL + "lists/")
      .then(res => res.json())
      .then(
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
          });
        }
      )

  }

  render() {
    var loadLists = () => {
      const { error, isLoaded, lists } = this.state;
      if (error) {
        return <tr><td colSpan="3">Error: {error.message}</td></tr>;
      } else if (!isLoaded) {
        return <tr><td colSpan="3">Loading...</td></tr>;
      } else {
        let itemsList = lists.map((list, index) => {
          return <List list={list} key={index} />
        });
        return itemsList;
      }
    };
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
                    <Table className="align-items-center" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">List</th>
                          <th scope="col">Owner</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {loadLists()}
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
  }
};
export default ExploreLists;
