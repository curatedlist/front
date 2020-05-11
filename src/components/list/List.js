import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Button,
  Media,
  UncontrolledTooltip
} from "reactstrap";


class List extends Component {

  render() {
    return (
      <tr>
        <th scope="row">
          <Media className="align-items-center">
            <i className="avatar rounded-circle mr-3 fa fa-list-ol fa-2x"></i>
            <Media>
              <Link
                to={"/list/" + this.props.list.id}
                className="mb-0 text-sm" >
                {this.props.list.name}
              </Link>
            </Media>
          </Media>
        </th>
        <td>
          <div className="avatar-group">
            <Link
              id={"tooltip" + this.props.list.owner.id}
              className="avatar avatar-sm"
              to={"/user/" + this.props.list.owner.id}
            >
              <img
                alt={this.props.list.owner.name}
                className="rounded-circle"
                src={this.props.list.owner.avatar_url ? this.props.list.owner.avatar_url : "https://joeschmoe.io/api/v1/" + this.props.list.owner.email}
              />
            </Link>
            <UncontrolledTooltip
              delay={0}
              target={"tooltip" + this.props.list.owner.id}
            >
              {this.props.list.owner.name}
            </UncontrolledTooltip>
          </div>
        </td>
        <td className="text-right">
          <Button className="btn-icon btn-2" color="default" type="button">
            <span className="btn-inner--icon">
              <i className="ni ni-like-2" />
            </span>
          </Button>
        </td>
      </tr>
    )
  }
}

export default List;
