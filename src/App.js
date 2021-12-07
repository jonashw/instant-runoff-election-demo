import React from "react";
import { setSyntheticLeadingComments } from "typescript";
import BallotDemoData from './ballot-demo-data';
import {performInstantRunoff} from './instant-runoff';

const Candidate = c => 
  <div className="is-size-3" style={{display:'inline-block',width:'1.33em'}}>{!!c ? c : /*"❓"*/"🚫"}</div>;

const BallotGrid = ({ ballots, onRemove }) => 
    <div className="columns is-multiline">
      {ballots.map((b,i) =>
        <div className="column m-0" key={b.id}>
          <div className="box p-3">
            <div className="level">
              <span className="tag" style={{transform:'rotate(-90deg)'}}>
                {b.id}
              </span>
              {b.votes.map(Candidate)}
              {!!onRemove &&
                <button
                  className="delete"
                  title="Remove this ballot from the election"
                  onClick={() => onRemove(b.id)}
                ></button> }
            </div>
          </div>
        </div>
      )}
    </div>;

const ResultMessage = ({results}) => {
  var finalResult = results[results.length-1];
  if(!finalResult){
    return <></>;
  }
  var finalLeader = finalResult.leaders[0]; 
  if(!finalLeader){
    return <></>;
  }
  var decided = finalLeader.votePercentage > 50;
  var runoff_intro = <>After <strong>{results.length-1}</strong> instant run-off{results.length-1 === 1 ? '' : 's'}</>;
  return decided 
    ? <article className="message is-success">
      <div className="message-header">
        <p>We have a winner!</p>
      </div>
      <div className="message-body">
        {runoff_intro},
        this election goes to 
        {Candidate(finalLeader.candidate)} 
        with {finalLeader.voteCount} votes
        ({finalLeader.votePercentage.toFixed(2)}% of all votes)
      </div>
    </article>
    : <article className="message is-danger">
      <div className="message-header">
        <p>Undecided</p>
      </div>
      <div className="message-body">
        {runoff_intro},
        this election is undecided.  Nobody got >50% of the vote!
      </div>
    </article>;
}

const LeaderBoard = ({leaders}) => 
  <table className="table is-striped is-bordered has-text-centered">
    <thead>
      <tr>
        <th>Place</th>
        <th>Candidate</th>
        <th>Votes</th>
        <th>%</th>
      </tr>
    </thead>
    <tbody>
      {leaders.map((l, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{Candidate(l.candidate)}</td>
          <td>{l.voteCount}</td>
          <td>{l.votePercentage.toFixed(1)}</td>
        </tr>
      ))}
    </tbody>
  </table>;


export default function App() {
  var availableCandidates = "🐸,🐰,🐙,🐵,🐼,🦊,🐴,🐮,🐶,🐭".split(",");
  var [candidates,setCandidates] = React.useState({
    inUse: availableCandidates.slice(0, 5),
    notInuse: availableCandidates.slice(5)
  });
  const genBallots = () => BallotDemoData.simpleRandom(3, 200, candidates.inUse);
  const [ballots,setBallots] = React.useState([]);
  var results = performInstantRunoff(ballots ,10);
  const [tabId,setTabId] = React.useState(0);

  React.useEffect(() => {
    setTabId(results.length-1);
  }, [ballots]);

  const reset = () => {
    setBallots(genBallots());
  };
  return (
    <div className="container is-fluid">
      <h1 className="title">Ranked Choice Voting</h1>
      <h2 className="subtitle">and Instant Runoff Election</h2>
      <div className="box">
        <div className="level">
            {[
              ['Available Candidates',     'make unavailable','inUse', 'notInuse'],
              ['Unavailable Candidates', 'make available', 'notInuse', 'inUse']
            ].map(([label, commandLabel, fromKey, toKey]) =>
            candidates[fromKey].length === 0 
            ? <></> 
            : <div>
              <strong>{label}</strong>
              <br/>
              {candidates[fromKey].map((c,i) =>
                <span key={i} title={commandLabel} style={{cursor:'pointer'}} onClick={() => {
                  setCandidates({
                    [fromKey]: candidates[fromKey].filter((_,ii) => ii !== i),
                    [toKey]: [...candidates[toKey], c]
                  });
                }}>
                  {Candidate(c)}
                </span>)}
            </div>)}
          <button className="button is-primary mb-5" onClick={reset}>
            Generate random ballots
          </button>
        </div>
      </div>
      {(results.length > 0) && <>
        <ResultMessage results={results} />

        <div class="tabs">
          <ul>
            {results.map((r,id) => 
              <li className={tabId === id ? "is-active" : ""} key={id}>
                <a onClick={() => setTabId(id)}>
                  {id === 0 ? 'Original results' : `Instant Run-off #${id}`}
                  {id === results.length-1 ? ' (Final)' : ''}
                </a></li>
            )}
          </ul>
        </div>

        {[results[tabId]].filter(r => !!r).map((r,i) =>
          <div key={i}>
            <p className="mb-5">
              Ballots considered VALID at this stage = {r.ballots.length} out of {results[0].ballots.length}
            </p>
            <LeaderBoard leaders={r.leaders} />
            {!!r.losers.length && <p className="mb-5">Candidates eliminated from previous steps = {r.losers.map(Candidate)}</p>}
            <BallotGrid ballots={r.ballots} onRemove={idToRemove => setBallots(ballots.filter(b => b.id !== idToRemove))}/>
          </div>
        )}
      </>}
    </div>
  );
}