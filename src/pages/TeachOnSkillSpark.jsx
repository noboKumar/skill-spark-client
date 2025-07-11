import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const TeachOnSkillSpark = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };
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
            <option disabled value="">Select Experience</option>
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
            placeholder="Ex: Complete React Bootcamp"
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
          <button type="submit" className="btn btn-primary px-10">
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeachOnSkillSpark;
