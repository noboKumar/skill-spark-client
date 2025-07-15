import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const FeedBackModal = ({ isOpen, setIsOpen, classInfo }) => {
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: sendFeedback } = useMutation({
    mutationKey: ["send-feedback"],
    mutationFn: async (feedbackData) => {
      const { data } = await axiosSecure.post("/feedback", feedbackData);
      return data;
    },
    onSuccess: () => {
      toast.success("Feedback sent successfully!");
      setIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function close() {
    setIsOpen(false);
  }

  const onSubmit = (data) => {
    const feedbackData = {
      rating: rating,
      description: data.description,
      teacher_name: classInfo?.name,
      teacher_email: classInfo?.email,
      teacher_image: classInfo?.image,
      class_name: classInfo?.title,
      class_id: classInfo?._id,
      student_name: user?.displayName,
      student_email: user?.email,
      student_image: user?.photoURL,
    };

    sendFeedback(feedbackData);
  };

  const handleRating = (rate) => {
    setRating(rate);
    console.log(rate);
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
        <DialogPanel className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl border border-primary/20">
          <DialogTitle className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary"></DialogTitle>
          <h1 className="text-xl font-semibold mb-4">
            Teaching Evaluation Report
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="label font-semibold">Rate:</span>
              <Rating
                onClick={handleRating}
                initialValue={rating}
                allowFraction={true}
                SVGstyle={{ display: "inline" }}
                size={40}
                fillColor="#facc15"
                emptyColor="#e5e7eb"
                transition
              />
            </div>
            <div>
              <label className="label font-semibold">Description</label>
              <input
                type="text"
                className="textarea input-bordered w-full bg-base-100"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-sm text-error mt-1">
                  description is required
                </p>
              )}
            </div>
            <button className="btn btn-primary rounded-full">Send</button>
          </form>

          <div className="mt-6 flex justify-end">
            <button
              onClick={close}
              className="btn btn-outline btn-sm btn-error"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default FeedBackModal;
