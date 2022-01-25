import React from "react";
import {  Candidate, QuickInfo } from "./ui";
import BallotDemoData from "./ballot-demo-data";
import { performInstantRunoff } from "./instant-runoff";
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

export default ({}) => {
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

    return (<>
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
    </>);
}