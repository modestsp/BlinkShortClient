import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex font-semibold flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-white">Oops!</h1>
      <p className="text-white text-4xl">Page Not Found</p>
      <Link className="text-white text-2xl hover:text-gray-300 mt-4" to="/">
        Go back
      </Link>
    </div>
  );
};

export default Error;
