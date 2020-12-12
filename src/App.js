import React from 'react';

// core components
import Cover from 'components/cover/Cover';
import CustomNavbar from 'components/navbar/CustomNavbar';
import Footer from 'components/footer/Footer';

export default function App(props) {
  return (
    <>
      <CustomNavbar />
      <main className="profile-page">
        <div className="position-relative">
          <Cover>
            {props.hero}
          </Cover>
        </div>
        <section className="section section-lg">
          {props.children}
        </section>
      </main>
      <Footer />
    </>
  );
}
