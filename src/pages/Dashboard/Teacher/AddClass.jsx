import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const AddClass = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="max-w-3xl mx-auto bg-base-200 shadow-lg rounded-xl p-10 mt-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Add a New Class
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-base-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-base-100"
          />
        </div>

        {/* Title */}
        <div>
          <label className="label font-semibold">Title</label>
          <input
            type="text"
            className="input input-bordered w-full bg-base-100"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-sm text-error mt-1">Title is required.</p>
          )}
        </div>

        {/* Photo input */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Cover Photo
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full"
          />
          {errors.image && (
            <p className="text-sm text-error mt-1">Cover photo is required.</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="label font-semibold">Price</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full bg-base-100"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <p className="text-sm text-error mt-1">Price is required.</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full bg-base-100"
            rows={4}
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <p className="text-sm text-error mt-1">Description is required.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button type="submit" className="btn btn-primary px-10">
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
