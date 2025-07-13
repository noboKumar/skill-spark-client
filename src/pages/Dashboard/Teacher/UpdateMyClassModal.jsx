import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

const UpdateMyClassModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-40 w-screen bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaEdit /> Update Class Info
          </DialogTitle>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-gray-700"
          >
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

            {/* Cover Photo */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Cover Photo
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full"
              />
              {errors.image && (
                <p className="text-sm text-error mt-1">
                  Cover photo is required.
                </p>
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
                <p className="text-sm text-error mt-1">
                  Description is required.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" className="btn btn-ghost" onClick={close}>
                Cancel
              </Button>
              <button type="submit" className="btn btn-primary px-6">
                Update Class
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateMyClassModal;
