import React from "react";
import BallotDemoData from "./ballot-demo-data";
import { performInstantRunoff } from "./instant-runoff";
import { LeaderBoard, Candidate, BallotGrid, ResultMessage } from "./ui";

const arrayWithoutItemAtIndex = (arr, ix) => [
  ...arr.slice(0, ix),
  ...arr.slice(ix + 1)
];

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
  var availableCandidates = "🐸,🐰,🐙,🐵,🐼,🦊,🐴,🐮,🐶,🐭".split(",");
  const [candidatesAvailable, setCandidatesAvailable] = React.useState(
    Object.fromEntries(availableCandidates.map((c,i) => [c, i <= 2]))
  );
  const candidates = availableCandidates.filter((c) => candidatesAvailable[c]);
  const [choiceCount, setChoiceCount] = React.useState(2);
  const genBallots = () => BallotDemoData.simpleRandom(choiceCount, 200, candidates);
  const [result, setResult] = React.useState(undefined);
  const [tabId, setTabId] = React.useState(0);

  const generate = () => {
    //it's most interesting to see a candidate emerge from behind in a run-off...
    var result = applyUntil(
      () => performInstantRunoff(genBallots(), 10),
      r => !!r.winner && r.winner.fromBehind,
      20
    );
    setResult(result);
    setTabId(result.stages.length - 1);
  };

  return (
    <div className="container is-fluid mt-5">
      <a href="https://forms.gle/4m8ih2JKVVZCKtq96" target="_blank" className="button is-info is-pulled-right">
        <span className="icon-text">
          <span className="icon mr-1">👍</span>
          Give me feedback
          <span className="icon ml-1">👎</span>
        </span>
      </a>
      <h1 className="title">Ranked Choice Voting</h1>
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
      <div className="box">
        <div className="level">
          <div>
            <strong># of Choices on ballot</strong>
            <br />
            <input
              className="mr-2"
              type="range"
              min="1"
              max="3"
              value={choiceCount}
              onChange={(e) => setChoiceCount(parseInt(e.target.value, 10))}
            />
            {choiceCount}
          </div>
          <div>
            <strong>Available Candidates</strong>
            <div className="is-flex">
              {availableCandidates.map((c) => (
                <label key={c} className="checkbox has-text-centered">
                  <input
                    type="checkbox"
                    checked={candidatesAvailable[c]}
                    onChange={(e) =>
                      setCandidatesAvailable({
                        ...candidatesAvailable,
                        [c]: !candidatesAvailable[c]
                      })
                    }
                  />
                  <div>{Candidate(c)}</div>
                </label>
              ))}
            </div>
          </div>

          <button className="button is-primary" onClick={generate}>
            Generate random ballots
          </button>
        </div>
        {choiceCount === 1 && (
          <QuickInfo>
            Traditional elections allow voters only a single choice.{" "}
            <strong>
              Enable 2 choices or more for a more interesting instant run-off election.
            </strong>
          </QuickInfo>
        )}
        
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

      {!!result && (
        <>
          <ResultMessage result={result} />

          <div className="tabs is-toggle">
            <ul>
              {result.stages.map((r, id) => (
                <li className={tabId === id ? "is-active" : ""} key={id}>
                  <a onClick={() => setTabId(id)}>
                    {id === 0 ? "Original results" : `Instant Run-off #${id}`}
                    {id === result.stages.length - 1 ? " (Final)" : ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {[result.stages[tabId]]
            .filter((r) => !!r)
            .map((r, i) => (
              <div key={i}>
                <div className="mb-5">
                  Ballots considered VALID at this stage = {r.ballots.length}{" "}
                  out of {result.stages[0].ballots.length}
                </div>
                <LeaderBoard leaders={r.leaders} />
                {!!r.losers.length && (
                  <div className="mb-5">
                    Candidates eliminated from previous steps ={" "}
                    {r.losers.map(Candidate)}
                  </div>
                )}
                <BallotGrid ballots={r.ballots}/>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
