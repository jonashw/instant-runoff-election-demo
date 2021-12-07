const Candidate = (c) => (
  <div
    key={c}
    className="is-size-3 has-text-centered"
    style={{ display: "inline-block", width: "1.33em" }}
  >
    {!!c ? c : /*"❓"*/ "🚫"}
  </div>
);
export default Candidate;
