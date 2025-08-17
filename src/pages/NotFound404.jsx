import Lottie from "lottie-react";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import error from "../assets/404 Error (1).json";

const NotFound404 = () => {
  return (
    <div className="text-center">
      <Helmet>
        <title>404 not found</title>
      </Helmet>

      <Lottie className="w-72 mx-auto" animationData={error}></Lottie>

      <Link to="/" className="btn btn-primary btn-lg">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound404;
