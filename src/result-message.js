import Candidate from "./candidate";
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
export default ResultMessage;
