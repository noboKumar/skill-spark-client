import React from "react";
import teacherImg from "../../../assets/become-a-teacher.jpg";

const BecomeATeacher = () => {
  return (
    <div className="flex justify-between items-center p-10 border-2 border-gray-300 bg-base-200 rounded-lg shadow-lg">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold heading-font text-[color:var(--color-text)]">Inspire the Future. Teach with Skill Spark.</h1>
        <p className="text-xl">
          Share your expertise and shape the next generation of learners.
          Whether you're a professional, educator, or passionate expert — Skill
          Spark gives you the platform to reach thousands of eager students
          worldwide. Start your journey as an online mentor today and make an
          impact from anywhere.
        </p>
        <button className="btn text-white rounded-full btn-primary font-bold">Join as a Teacher</button>
      </div>
      <div>
        <img className="rounded-lg border-2 border-gray-300" src={teacherImg} alt="" />
      </div>
    </div>
  );
};

export default BecomeATeacher;
