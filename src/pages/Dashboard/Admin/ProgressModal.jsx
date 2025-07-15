import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaUsers, FaTasks, FaCheckCircle } from "react-icons/fa";

const ProgressModal = ({ isOpen, setIsOpen, classId }) => {
  const { data: progressData } = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/progress/${classId}`);
      return data;
    },
    enabled: !!classId && isOpen,
  });
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
        <DialogPanel className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl border border-primary/20">
          <DialogTitle className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
            <FaTasks className="text-3xl" />
            Class Progress
          </DialogTitle>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <FaUsers className="text-primary text-xl" />
              <span className="font-medium">Total Enrollment:</span>{" "}
              <span className="font-semibold">
                {progressData?.total_enrollment}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaTasks className="text-primary text-xl" />
              <span className="font-medium">Total Assignments:</span>{" "}
              <span className="font-semibold">
                {progressData?.total_assignment}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="font-medium">Assignments Submitted:</span>{" "}
              <span className="font-semibold">
                {progressData?.total_submitted}
              </span>
            </div>
          </div>

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

export default ProgressModal;
