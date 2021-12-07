import Candidate from "./candidate";
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
export default LeaderBoard;
