import React, { Component } from 'react'

// core components
import Cover from 'components/cover/Cover';
import CustomNavbar from "components/navbar/CustomNavbar";
import Footer from "components/footer/Footer";


export default class App extends Component {
  render() {
    return (
      <>
        <CustomNavbar />
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
