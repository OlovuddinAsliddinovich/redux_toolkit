const Input = ({ type = "text", label, state, setState }) => {
  return (
    <div className="form-floating">
      <input
        type={type}
        className="form-control"
        id={label}
        placeholder="name@example.com"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <label htmlFor={label} className="text-dark">
        {label}
      </label>
    </div>
  );
};

export default Input;
