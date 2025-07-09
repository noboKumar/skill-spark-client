import React from "react";
import Lottie from "lottie-react";
import { FaEye } from "react-icons/fa";
import animationData from "../assets/Login-animation.json";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { googleSignIn } = useAuth();
  // TODO: add Password visibility toggle functionality
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // TODO: add swal and redirect after login
  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="w-full shrink-0 md:flex items-center md:gap-10 justify-center">
        {/* Placeholder image instead of animation */}
        <div className="w-1/3">
          <Lottie animationData={animationData} />
        </div>

        {/* Form */}
        <div className="space-y-5 ">
          <h1 className="md:text-4xl text-xl font-bold">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="user@example.com"
                className="input w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="MySecureP@ss123"
                  className="input w-full"
                />
                <FaEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="btn btn-primary rounded-full mt-4 w-full"
            >
              Login
            </button>
            {(errors.email || errors.password) && (
              <span className="text-error">All fields are required</span>
            )}

            {/* Divider + Google button */}
            <div className="divider">Or continue with</div>
            <button
              onClick={handleGoogleLogIn}
              type="button"
              className="btn btn-wide rounded-full bg-base-100 border-[#e5e5e5] mx-auto flex items-center justify-center"
            >
              <svg
                aria-label="Google logo"
                className="rounded-2xl mr-2"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff" />
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  />
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  />
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              Google
            </button>
          </form>
          <p className="text-center py-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline font-semibold text-primary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
