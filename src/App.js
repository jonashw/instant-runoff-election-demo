import React from "react";
import BallotDemoData from "./ballot-demo-data";
import { performInstantRunoff } from "./instant-runoff";
import { LeaderBoard, Candidate, BallotGrid, ResultMessage } from "./ui";

const arrayWithoutItemAtIndex = (arr, ix) => [
  ...arr.slice(0, ix),
  ...arr.slice(ix + 1)
];

export default function App() {
  var availableCandidates = "🐸,🐰,🐙,🐵,🐼,🦊,🐴,🐮,🐶,🐭".split(",");
  const [candidatesAvailable, setCandidatesAvailable] = React.useState(
    Object.fromEntries(availableCandidates.slice(0, 3).map((c) => [c, true]))
  );
  const candidates = availableCandidates.filter((c) => candidatesAvailable[c]);
  const [choiceCount, setChoiceCount] = React.useState(2);
  const removeBallotById = (idToRemove) => {
    let index = ballots.findIndex((b) => b.id === idToRemove);
    if (index === -1) {
      return;
    }
    setBallots(arrayWithoutItemAtIndex(ballots, index));
    setUndos([...undos, () => setBallots(ballots)]);
  };

  const [undos, setUndos] = React.useState([]);
  const undo = () => {
    let undofn = undos.slice().pop();
    if (!undofn) {
      return;
    }
    undofn();
    setUndos(undos.slice(0, -1));
  };
  const genBallots = () =>
    BallotDemoData.simpleRandom(choiceCount, 200, candidates);
  const [ballots, setBallots] = React.useState([]);
  var results = performInstantRunoff(ballots, 10);
  const [tabId, setTabId] = React.useState(0);

  React.useEffect(() => {
    setTabId(results.length - 1);
  }, [ballots, results.length]);

  const reset = () => {
    setBallots(genBallots());
  };
  return (
    <div className="container is-fluid">
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
            {choiceCount === 1 && (
              <div>
                <span className="icon" role="img" aria-label="info">
                  ℹ️
                </span>
                Traditional elections allow voters only a single choice. Enable
                2 choices or more for a more interesting instant run-off
                election.
              </div>
            )}
          </div>
          <div>
            <strong>Available Candidates</strong>
            <div className="is-flex">
              {availableCandidates.map((c) => (
                <label className="checkbox has-text-centered">
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
            {candidates.length < 3 && (
              <div>
                <span className="icon" role="img" aria-label="info">
                  ℹ️
                </span>
                Select at least 3 candidates for a more interesting instant
                run-off election
              </div>
            )}
          </div>

          <button className="button is-primary" onClick={reset}>
            Generate random ballots
          </button>
        </div>
      </div>
      {results.length > 0 && (
        <>
          <ResultMessage results={results} />

          <div class="tabs is-toggle">
            <ul>
              {results.map((r, id) => (
                <li className={tabId === id ? "is-active" : ""} key={id}>
                  <a onClick={() => setTabId(id)}>
                    {id === 0 ? "Original results" : `Instant Run-off #${id}`}
                    {id === results.length - 1 ? " (Final)" : ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {[results[tabId]]
            .filter((r) => !!r)
            .map((r, i) => (
              <div key={i}>
                <p className="mb-5">
                  Ballots considered VALID at this stage = {r.ballots.length}{" "}
                  out of {results[0].ballots.length}
                </p>
                <LeaderBoard leaders={r.leaders} />
                {!!r.losers.length && (
                  <p className="mb-5">
                    Candidates eliminated from previous steps ={" "}
                    {r.losers.map(Candidate)}
                  </p>
                )}
                <button
                  className="button is-text"
                  onClick={undo}
                  disabled={undos.length === 0}
                >
                  undo
                </button>
                <BallotGrid ballots={r.ballots} onRemove={removeBallotById} />
              </div>
            ))}
        </>
      )}
    </div>
  );
}
