import React from 'react';
import checklist from './checklist.svg';
import global from './global.svg';
import review from './review.svg';
import './App.css';

function App() {
  return (
    <main role="main">

      <div className="position-relative p-3 p-md-5 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal">Curated lists</h1>
          <p className="lead font-weight-normal">Collaborative or invidual shareable lists of curated content</p>
          <a className="btn btn-outline-secondary" href="#">Create your curated list</a>
        </div>
        <img src={checklist} alt="Curated list" width="550px" height="550px" />
      </div>

      <div className="d-md-flex flex-md-equal w-100">
        <div className="bg-dark pt-3 px-3 pt-md-5 text-center text-white">
          <div className="my-3 py-3">
            <h2 className="display-5">Collaborate</h2>
            <p className="lead">Caringly elaborate your list with other people.</p>
            <img src={review} alt="Collaborate" width="300px" height="300px" />
          </div>

        </div>
        <div className="bg-secondary pt-3 px-3 pt-md-5 text-center text-white">
          <div className="my-3 p-3">
            <h2 className="display-5">Share</h2>
            <p className="lead">Share your list.</p>
          </div>
          <img src={global} alt="Share" width="250px" height="250px" />
        </div>
      </div>

    </main>

  );
}

export default App;
