import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useRole from "../hooks/useRole";
import { FaChalkboardTeacher } from "react-icons/fa";
import useStatus from "../hooks/useStatus";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const TeachOnSkillSpark = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const { requestStatus } = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: sendRequest, isPending } = useMutation({
    mutationKey: ["teacher-request"],
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post("/teacher-requests", formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Request submitted!");
    },
    onError: () => {
      toast.error("Submission failed.");
    },
  });

  const onSubmit = (data) => {
    data.image = user?.photoURL;
    data.email = user?.email;
    if (requestStatus?.status === "rejected") {
      data.status = "pending";
    }
    sendRequest(data);
    reset();
  };
  if (roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (role === "teacher") {
    return (
      <>
        <div className="flex flex-col items-center justify-center bg-success/10 border border-success p-6 rounded-xl shadow-sm mt-10 max-w-xl mx-auto">
          <FaChalkboardTeacher className="text-4xl text-success mb-3" />
          <h2 className="text-xl font-semibold text-success">
            You're already a teacher!
          </h2>
          <p className="text-lg text-success-content mt-2 text-center">
            You already have teaching access on{" "}
            <span className="font-bold">SkillSpark</span>. Feel free to manage
            your courses or view student progress from your dashboard.
          </p>
        </div>
      </>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-10 bg-base-200 shadow-lg rounded-xl border border-gray-300">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Apply as a Teacher
      </h1>
      <p className="text-center mb-10 text-gray-600">
        Fill out the form to submit your application.
      </p>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="avatar flex justify-center">
          <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring-2 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>
        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Full Name"
            className="input input-bordered w-full bg-base-200"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-error text-sm mt-1">Name is required.</p>
          )}
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full bg-base-200"
            readOnly
            defaultValue={user?.email}
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Experience Level</span>
          </label>
          <select
            defaultValue=""
            className="select select-bordered w-full bg-base-200"
            {...register("experience", { required: true })}
          >
            <option disabled value="">
              Select Experience
            </option>
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
          {errors.experience && (
            <p className="text-error text-sm mt-1">
              Experience level is required.
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Course Title</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Complete React BootCamp"
            className="input input-bordered w-full bg-base-200"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">Title is required.</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Category</span>
          </label>
          <select
            defaultValue=""
            className="select select-bordered w-full bg-base-200"
            {...register("category", { required: true })}
          >
            <option disabled value="">
              Select Category
            </option>
            <option value="web-development">Web Development</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="data-science">Data Science</option>
            <option value="ui-ux">UI/UX Design</option>
          </select>
          {errors.category && (
            <p className="text-error text-sm mt-1">Category is required.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-center">
          <button
            type="submit"
            className="btn btn-primary px-10"
            disabled={isPending}
          >
            {isPending
              ? "Pending..."
              : requestStatus?.status === "rejected"
              ? "Request Again"
              : "Submit for Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeachOnSkillSpark;
