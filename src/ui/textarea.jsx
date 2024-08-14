const Textarea = ({ label, state, setState, height = "100px" }) => {
  return (
    <div className="form-group">
      <label htmlFor="floatingTextarea2">{label}</label>
      <textarea
        className="form-control"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={label}
        id="floatingTextarea2"
        style={{ height: height }}
      ></textarea>
    </div>
  );
};

export default Textarea;
