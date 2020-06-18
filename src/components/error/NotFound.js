import React, { Component } from 'react';

// reactstrap components
import {
  Container,
} from "reactstrap";

import App from 'App'

export default class NotFound extends Component {

  render() {
    return (
      <App>
        <Container>
          <h1>Oops! That page can’t be found.</h1>
          <p>
            It looks like nothing was found at this location.
            Maybe try one of the links in the menu or press back to go to the previous page.
          </p>
        </Container>
      </App>
    );
  }
}
