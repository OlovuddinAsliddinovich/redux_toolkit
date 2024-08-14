import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
  const { error } = useSelector((state) => state.auth);

  const errorMessages = useCallback(() => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(", ");
      return msg;
    });
  }, [error]);

  error && errorMessages();

  return (
    error &&
    errorMessages().map((error) => (
      <div className="alert alert-danger m-0 p-1" key={error} role="alert">
        {error}
      </div>
    ))
  );
};

export default ValidationError;
