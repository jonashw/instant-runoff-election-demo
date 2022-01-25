import React from "react";
import ElectionSimulator from './election-simulator';
import ExampleElectionBrowser from './example-election-browser';
import {Routes, Route, NavLink,Link } from "react-router-dom";

export default function App() {
  return (
    <div className="container is-fluid mt-5">
      <div className="is-flex is-justify-content-space-between">
        <h1 className="title"><Link to="/">Ranked Choice Voting Simulator</Link></h1>

        <div class="field has-addons">
          {[
            {label:'Simulator',to:'/'},
            {label:'Examples',to:'/examples'}
          ].map(({to,label}) =>
            <p className="control">
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? "button is-primary" : "button is-normal"}
              >
                {label}
              </NavLink>
            </p>
          )}
        </div>

        <a href="https://forms.gle/4m8ih2JKVVZCKtq96" target="_blank" className="button is-info">
          <span className="icon-text">
            <span className="icon mr-1">👍</span>
            Give feedback
            <span className="icon ml-1">👎</span>
          </span>
        </a>
      </div>
      <div className="content">
        Experiment with this simulator to better understand Ranked Choice Voting
        (RCV) and instant run-off elections for single-winner races.{" "}
        <a
          href="https://www.fairvote.org/how_rcv_works"
          target="_blank"
          rel="noreferrer"
        >
          More information
          <span className="icon" role="img" aria-label="external link">
            ↗
          </span>
        </a>
      </div>
      <hr/>
      <Routes>
        <Route path="/" element={<ElectionSimulator />} exact={true}/>
        <Route path="/examples" element={<ExampleElectionBrowser />} exact={true}/>
        <Route path="/examples/:electionId" element={<ExampleElectionBrowser />} exact={true}/>
      </Routes>
    </div>
  );
}