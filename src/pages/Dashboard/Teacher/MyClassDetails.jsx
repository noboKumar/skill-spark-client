import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import AssignmentModal from "./AssignmentModal";

const MyClassDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold text-center mb-10 text-primary">
          Class Progress
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Enrollment Card */}
          <div className="bg-base-200 p-6 rounded-xl shadow-md border border-gray-300 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Enrollment
            </h2>
            <p className="text-4xl font-bold text-primary mt-2">0</p>
          </div>

          {/* Total Assignment Card */}
          <div className="bg-base-200 p-6 rounded-xl shadow-md border border-gray-300 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Assignment
            </h2>
            <p className="text-4xl font-bold text-primary mt-2">0</p>
          </div>

          {/* Total Assignment Submit Card */}
          <div className="bg-base-200 p-6 rounded-xl shadow-md border border-gray-300 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Assignment Submitted
            </h2>
            <p className="text-4xl font-bold text-primary mt-2">0</p>
          </div>
        </div>
      </div>

      {/* Class Assignment Section */}
      <div className="mt-16">
        <h1 className="text-3xl font-bold text-center mb-5 text-primary">
          Class Assignment
        </h1>
        <button
          onClick={open}
          className="btn btn-primary mb-5 rounded-full text-lg flex items-center justify-center mx-auto"
        >
          Create <FiPlusCircle />
        </button>
      </div>
      <AssignmentModal isOpen={isOpen} setIsOpen={setIsOpen}></AssignmentModal>
    </div>
  );
};

export default MyClassDetails;
