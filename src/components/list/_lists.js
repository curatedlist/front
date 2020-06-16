import React, { Component } from 'react';

// reactstrap components
import {
  Row,
  Col
} from "reactstrap";

import List from 'components/list/_list'

export default class ListContainer extends Component {

  render() {
    const { lists } = this.props;
    return (
      <>
        {lists !== undefined && lists.length > 0 &&
          <div className="px-4">
            <div className="py-5 ">
              <Row className="justify-content-center">
                <Col lg="11">
                  {lists.filter((list) => { return !list.deleted }).map((list, index) => {
                    return <List list={list} key={index} />
                  })
                  }
                </Col>
              </Row>
            </div>
          </div>
        }
      </>
    )
  }
}