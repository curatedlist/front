import React from 'react';

// reactstrap components
import {
  Row,
  Col
} from 'reactstrap';

import List from 'components/list/_list';

export default function ListContainer(props) {
  const { lists } = props;
  return (
    <>
      {lists !== undefined && lists.length > 0 &&
        <div className="px-4">
          <div className="py-5 ">
            <Row className="justify-content-center">
              <Col lg="11">
                {lists.filter((list) => { return !list.deleted }).map((list, index) => {
                  return <List list={list} key={list.id} />
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