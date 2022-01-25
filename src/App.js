import React from "react";
import BallotDemoData from "./ballot-demo-data";
import { performInstantRunoff } from "./instant-runoff";
import {  Candidate } from "./ui";
import ElectionDisplay from "./election-display";

const applyUntil = (fn,predicate,maxTries) => {
  var tries=0;
  var result;
  while(tries < maxTries) {
    tries++;
    console.log('try #' + tries);
    result = fn();
    if(predicate(result)){
      return result;
    }
  } 
  return result;
};

const QuickInfo = ({children}) =>
  <article className="message is-info">
    <div className="message-body">
      <span className="icon" role="img" aria-label="info">
        ℹ️
      </span>
      {children}
    </div>
  </article>;

export default function App() {
  var allCandidates = "🐸,🐰,🐙,🐵,🐼,🦊,🐴,🐮,🐶,🐭".split(",");
  const defaultSettings = () => ({
    candidatesInTheRunning: Object.fromEntries(allCandidates.map((c,i) => [c, i <= 2])),
    ballotCount: 200
  });
  const [settings, setSettings] = React.useState(defaultSettings());
  const candidates = allCandidates.filter((c) => settings.candidatesInTheRunning[c]);
  const genBallots = () => BallotDemoData.simpleRandom(candidates.length, settings.ballotCount, candidates);
  const [result, setResult] = React.useState(undefined);

  const reset = () => {
    setResult(null);
    setSettings(defaultSettings());
  }

  const generate = () => {
    //it's most interesting to see a candidate emerge from behind in a run-off...
    var result = applyUntil(
      () => performInstantRunoff(genBallots(), 10),
      r => !!r.winner && r.winner.fromBehind,
      2
    );
    setResult(result);
  };

  return (
    <div className="container is-fluid mt-5">
      <a href="https://forms.gle/4m8ih2JKVVZCKtq96" target="_blank" className="button is-info is-pulled-right">
        <span className="icon-text">
          <span className="icon mr-1">👍</span>
          Give feedback
          <span className="icon ml-1">👎</span>
        </span>
      </a>
      <h1 className="title">Ranked Choice Voting Simulator</h1>
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
      <div>
        <div className="level">
          <div>
            <button className="button is-primary is-large" onClick={generate}>
              Simulate election
            </button>
            {!!result && <div className="has-text-centered">
              <button className="button is-text" onClick={reset}>
                Reset
              </button>
            </div>}
          </div>
          <div>
            <strong>Candidates in the running</strong>
            <div className="is-flex">
              {allCandidates.map((c) => (
                <label key={c} className="checkbox has-text-centered">
                  <input
                    type="checkbox"
                    checked={settings.candidatesInTheRunning[c]}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        candidatesInTheRunning: {
                          ...settings.candidatesInTheRunning,
                          [c]: !settings.candidatesInTheRunning[c]
                        }
                      })
                    }
                  />
                  <div>{Candidate(c)}</div>
                </label>
              ))}
            </div>
          </div>
          <div>
            <strong>Number of voters to simulate</strong>
            <br />
            <input
              className="mr-2"
              type="range"
              step="50"
              min="50"
              max="1000"
              value={settings.ballotCount}
              onChange={(e) => setSettings({...settings, ballotCount: parseInt(e.target.value, 10)})}
            />
            {settings.ballotCount}
          </div>
        </div>
        
        {candidates.length < 3 && (
          <QuickInfo>
            In traditional elections, it often feels like only 2 candidates
            matter.{" "}
            <strong>
              Select at least 3 candidates for a more interesting instant run-off election
            </strong>
          </QuickInfo>
        )}
      </div>

      {!!result && ( <ElectionDisplay result={result}/>)}
    </div>
  );
}