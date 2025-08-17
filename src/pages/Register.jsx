import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import animationData from "../assets/register-animation.json";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { uploadImage } from "../API/utils";
import useSaveUser from "../hooks/useSaveUser";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, googleSignIn, setUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: saveUser } = useSaveUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const registerPromise = async () => {
      try {
        // upload image to firebase through tanStack mutation
        const imageUrl = await uploadImage(data.image[0]);

        // Firebase: create user
        const result = await createUser(data.email, data.password);
        const user = result.user;

        // tanStack mutation to save role in DB
        await saveUser({
          email: data.email,
          displayName: data.username,
          photoURL: imageUrl,
        });

        // firebase: update profile image and name
        await updateUser({
          displayName: data.username,
          photoURL: imageUrl,
        });

        setUser({
          ...user,
          displayName: data.username,
          photoURL: imageUrl,
        });
        navigate("/");
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    };

    toast.promise(registerPromise(), {
      loading: "Creating your account...",
      success: "Welcome! Your account has been created.",
      error: "Registration failed. Please try again.",
    });
  };

  const handleGoogleLogIn = async () => {
    const googleRegisterPromise = async () => {
      const result = await googleSignIn();
      const user = result.user;

      await saveUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      navigate("/");
    };

    toast.promise(googleRegisterPromise, {
      loading: "Creating your account...",
      success: "Welcome! Your account has been created.",
      error: "Registration failed. Please try again.",
    });
  };

  return (
    <div>
      <Helmet>
        <title>Skill Spark | register</title>
      </Helmet>
      <div className="w-full shrink-0 md:flex items-center md:gap-10 justify-center">
        {/* Placeholder image instead of animation */}
        <div className="w-full md:w-1/2 lg:w-1/3 max-w-md">
          <Lottie animationData={animationData} />
        </div>

        {/* Form */}
        <div className="space-y-5 lg:min-w-xl">
          <h1 className="md:text-4xl text-xl font-bold">Create an Account</h1>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                placeholder="John Doe"
                className="input w-full"
              />
              {errors.username && (
                <span className="text-error text-sm">
                  Please Enter Your Username
                </span>
              )}
            </div>

            {/* Photo input */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Profile Photo
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full"
              />
              {errors.image && (
                <span className="text-error text-sm">
                  Please Upload Your Profile Photo
                </span>
              )}
            </div>

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
              {errors.email && (
                <span className="text-error text-sm">
                  Please Enter Your Email
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                      message:
                        "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, and a special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="MySecureP@ss123"
                  className="input w-full"
                />
                <button
                  className="absolute top-1/2 right-3 -translate-y-1/2 z-10 text-gray-500 cursor-pointer"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="btn btn-primary mt-4 w-full rounded-full"
            >
              Register
            </button>

            {/* Divider + Google button */}
            <div className="divider">Or continue with</div>
            <button
              onClick={handleGoogleLogIn}
              type="button"
              className="btn w-full rounded-full bg-base-100 border-[#e5e5e5] mx-auto flex items-center justify-center"
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
            Already have an account?{" "}
            <Link to="/login" className="underline font-semibold text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
