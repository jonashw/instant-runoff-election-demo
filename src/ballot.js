export default ({ candidates, ballot, editable, onChange }) => {
  return (
    <div className="card">
      <table className="table is-fullwidth is-bordered has-text-centered">
        <thead>
          <tr>
            {ballot.map((_, i) => (
              <th>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody className="is-size-1">
          <tr>
            {ballot.map((bc, i) => (
              <td className="p-1">
                {!editable ? (
                  bc
                ) : (
                  <select
                    style={{ height: "unset" }}
                    className="select is-size-1"
                    onChange={(e) => {
                      if (onChange) {
                        var newBallot = [...ballot];
                        newBallot[i] = e.target.value;
                        onChange(newBallot);
                      }
                    }}
                  >
                    {candidates.map((c) => (
                      <option value={c} selected={c === bc}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
