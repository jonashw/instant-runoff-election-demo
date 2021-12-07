const Candidate = (c) => (
  <div
    className="is-size-3 has-text-centered"
    style={{ display: "inline-block", width: "1.33em" }}
  >
    {!!c ? c : /*"❓"*/ "🚫"}
  </div>
);

const BallotGrid = ({ ballots, onRemove }) => (
  <div className="columns is-multiline">
    {ballots.map((b, i) => (
      <div className="column m-0" key={b.id}>
        <div className="box p-3">
          <div className="level">
            <div className="level-left">
              <span className="tag">{b.id}</span>
              {b.votes.map(Candidate)}
              {!!onRemove && (
                <button
                  className="delete"
                  title="Remove this ballot from the election"
                  onClick={() => onRemove(b.id)}
                ></button>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ResultMessage = ({ results }) => {
  var finalResult = results[results.length - 1];
  if (!finalResult) {
    return <></>;
  }
  var finalLeader = finalResult.leaders[0];
  if (!finalLeader) {
    return <></>;
  }
  var decided = finalLeader.votePercentage > 50;
  var runoff_intro = (
    <>
      After <strong>{results.length - 1}</strong> instant run-off
      {results.length - 1 === 1 ? "" : "s"}
    </>
  );
  return decided ? (
    <article className="message is-success">
      <div className="message-header">
        <p>We have a winner!</p>
      </div>
      <div className="message-body">
        {runoff_intro}, this election goes to {Candidate(finalLeader.candidate)}
        with {finalLeader.voteCount} votes (
        {finalLeader.votePercentage.toFixed(2)}% of all votes)
      </div>
    </article>
  ) : (
    <article className="message is-danger">
      <div className="message-header">
        <p>Undecided</p>
      </div>
      <div className="message-body">
        {runoff_intro}, this election is undecided. Nobody got >50% of the vote!
      </div>
    </article>
  );
};

const LeaderBoard = ({ leaders }) => (
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
  </table>
);

export { LeaderBoard, Candidate, BallotGrid, ResultMessage };
