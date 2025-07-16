import React from "react";
import { DialogPanel } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogTitle } from "@headlessui/react";
import { MdAssignmentAdd } from "react-icons/md";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AssignmentModal = ({ isOpen, setIsOpen }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  function close() {
    setIsOpen(false);
  }

  const { mutate: assignmentData } = useMutation({
    mutationKey: ["assignment-data"],
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post(`/assignments/${id}`, formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assignments"]);
      reset();
      setIsOpen(false);
      toast.success("Assignment added successfully!");
    },
    onError: (error) => {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment.");
    },
  });

  const onSubmit = (data) => {
    data.classId = id;
    assignmentData(data);
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-40 w-screen bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
        <DialogPanel className="w-full max-w-lg rounded-xl bg-base-100 p-6 shadow-xl">
          <DialogTitle className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MdAssignmentAdd size={20} /> Add Assignment
          </DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div>
              <label className="label font-semibold">Assignment Title</label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-sm text-error mt-1">Title is required</p>
              )}
            </div>

            {/* Assignment Deadline */}
            <div>
              <label className="label font-semibold">Assignment Deadline</label>
              <input
                type="date"
                className="input input-bordered w-full bg-base-100"
                {...register("deadline", { required: true })}
              />
              {errors.deadline && (
                <p className="text-sm text-error mt-1">deadline is required</p>
              )}
            </div>

            {/* Assignment Description */}
            <div>
              <label className="label font-semibold">
                Assignment Description
              </label>
              <textarea
                className="textarea textarea-bordered w-full bg-base-100"
                rows={4}
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <p className="text-sm text-error mt-1">
                  Description is required
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-end gap-3">
              <Button
                type="submit"
                className="btn btn-primary rounded-full text-white"
              >
                Add assignment
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AssignmentModal;
