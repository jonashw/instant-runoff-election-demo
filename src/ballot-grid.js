import Candidate from "./candidate";

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

export default BallotGrid;
