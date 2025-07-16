import React from "react";
import { Helmet } from "react-helmet";
import { FaSadTear } from "react-icons/fa";
import { Link } from "react-router";

const NotFound404 = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 text-center">
            <Helmet>
        <title>404 not found</title>
      </Helmet>
      <h1 className="text-9xl font-extrabold text-primary mb-6">404</h1>

      <FaSadTear
        className="text-8xl text-gray-400 mb-6"
        aria-label="Sad face icon"
      />

      <h2 className="text-3xl font-bold text-gray-700 mb-8">
        Oops! Page Not Found
      </h2>

      <Link to="/" className="btn btn-primary btn-lg">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound404;
