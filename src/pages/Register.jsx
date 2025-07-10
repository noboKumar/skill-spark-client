import Lottie from "lottie-react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
import animationData from "../assets/register-animation.json";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { saveUserInDb } from "../API/utils";

const Register = () => {
  // TODO: add Password visibility toggle functionality
  const { createUser, googleSignIn, setUser, updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // TODO: add swal and redirect after registration
  // TODO: try to upload local image to firebase storage
  const handleRegister = (data) => {
    const imageFile = data.image[0]; // react-hook-form returns FileList

    const formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      )
      .then((res) => {
        const imageUrl = res.data.data.url;

        // Create user in Firebase
        createUser(data.email, data.password)
          .then((result) => {
            const user = result.user;
            console.log({ user, data });

            saveUserInDb({
              email: data.email,
              displayName: data.username,
              photoURL: imageUrl,
            });

            updateUser({
              displayName: data.username,
              photoURL: imageUrl,
            })
              .then(() => {
                setUser({
                  ...user,
                  displayName: data.username,
                  photoURL: imageUrl,
                });
              })
              .catch((err) => {
                console.error("Error updating profile:", err);
              });
          })
          .catch((err) => {
            console.error("Error creating user:", err);
          });
      })
      .catch((err) => {
        console.error("Image upload failed:", err);
      });
  };

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        saveUserInDb({
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-full shrink-0 md:flex items-center md:gap-10 justify-center">
        {/* Placeholder image instead of animation */}
        <Lottie animationData={animationData} />

        {/* Form */}
        <div className="space-y-5">
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
            </div>

            {/* Photo input */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Profile Photo
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input"
              />
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
              className="btn btn-primary mt-4 w-full rounded-full"
            >
              Register
            </button>
            {(errors.username || errors.email || errors.password) && (
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
