import Candidate from "./candidate";
const ResultMessage = ({ result }) => {
  var runoff_intro = (
    <>
      After <strong>{result.stages.length - 1}</strong> instant run-off
      {result.stages.length - 1 === 1 ? "" : "s"}
    </>
  );
  return !!result.winner ? (
    <article className="message is-success">
      <div className="message-header">
        <p>We have a winner!</p>
      </div>
      <div className="message-body">
        {runoff_intro}, this election goes to {Candidate(result.winner.candidate)}
        with {result.winner.voteCount} votes (
        {result.winner.votePercentage.toFixed(2)}% of all votes).
        {result.winner.fromBehind && <strong className="ml-2">This candidate came from behind!</strong>}
      </div>
    </article>
  ) : (
    <article className="message is-danger">
      <div className="message-header">
        <p>Undecided</p>
      </div>
      <div className="message-body">
        {runoff_intro}, this election is undecided. Nobody got &gt;50% of the vote!
      </div>
    </article>
  );
};
export default ResultMessage;
