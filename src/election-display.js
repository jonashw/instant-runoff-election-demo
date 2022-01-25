import React from "react";
import { LeaderBoard, Candidate, BallotGrid, ResultMessage } from "./ui";

const ElectionDisplay = ({result}) => {
  const [tabId, setTabId] = React.useState(0);
  
  React.useEffect(() => {
    if(!result){
      return;
    }
    setTabId(result.stages.length - 1);
  }, [result]);

  if(!result){
    return <>No election result available</>;
  }
  return <>
    <hr/>
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
      .filter(stage => !!stage)
      .map((stage, i) => (
        <div key={i}>
          <div className="mb-5">
            Ballots considered VALID at this stage = {stage.ballots.length}{" "}
            out of {result.stages[0].ballots.length}
          </div>

          <LeaderBoard leaders={stage.leaders} />

          {!!stage.losers.length && (
            <div className="mb-5">
              Candidates eliminated in previous stages :{" "}
              {stage.losers.map(Candidate)}
            </div>
          )}

          <p className="mb-5">Ballots as of this stage (with eliminated candidates removed):</p>

          <BallotGrid ballots={stage.ballots}/>
        </div>
      ))}
  </>;
}

export default ElectionDisplay;