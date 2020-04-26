import React, { Component } from 'react'

// core components
import Cover from 'components/cover/Cover';
import CustomNavbar from "components/navbar/CustomNavbar";
import Footer from "components/footer/Footer";


export default class App extends Component {
  state = {
    user: undefined
  };

  onLoggedIn = (email) => {
    fetch(process.env.REACT_APP_API_URL + "users/email/" + email )
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          user: result.user
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
    return (
      <>
        <CustomNavbar user={this.state.user} onLoggedIn={this.onLoggedIn} />
        <main className="profile-page">
          <div className="position-relative">
            <Cover>
              {this.props.hero}
            </Cover>
          </div>
          <section className="section section-lg">
            {this.props.children}
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
