const Button = ({ value, type, isLoading = false }) => {
  return (
    <button
      className="btn btn-primary w-100 py-2"
      disabled={isLoading}
      type={type}
    >
      {isLoading ? "Loading..." : value}
    </button>
  );
};

export default Button;
