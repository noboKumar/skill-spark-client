import { FaBan } from "react-icons/fa";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4 text-center">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-error mb-2">Access Denied</h1>
      <p className="text-lg text-gray-500 mb-6">
        You do not have permission to view this page.
      </p>
      <Link to="/" className="btn btn-primary rounded-full">
        Go Back Home
      </Link>
    </div>
  );
};

export default Unauthorized;
