import { notFound } from "../assets";

const ErrorPage = () => {
  return (
    <div className="w-100">
      <img
        src={notFound}
        alt="img"
        className="w-100"
        style={{ height: "100vh", objectFit: "cover" }}
      />
    </div>
  );
};

export default ErrorPage;
