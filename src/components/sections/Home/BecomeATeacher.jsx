import React from "react";
import teacherImg from "../../../assets/become-a-teacher.jpg";
import { Link } from "react-router";

const BecomeATeacher = () => {
  return (
    <div className="flex flex-col-reverse gap-5 lg:flex-row justify-between items-center px-5 md:px-20 py-10 border-2 border-gray-300 bg-base-200 rounded-4xl shadow-lg mb-20">
      <div className="space-y-4 flex-1">
        <h1 className="text-2xl md:text-4xl font-bold heading-font text-[color:var(--color-text)]">
          Inspire the Future. Teach with Skill Spark.
        </h1>
        <p className="text-xl 2xl:w-4/5">
          Share your expertise and shape the next generation of learners.
          Whether you're a professional, educator, or passionate expert — Skill
          Spark gives you the platform to reach thousands of eager students
          worldwide. Start your journey as an online mentor today and make an
          impact from anywhere.
        </p>
        <Link to={"/teach-on-skill-spark"}>
          <button className="btn text-white rounded-full btn-primary font-bold">
            Join as a Teacher
          </button>
        </Link>
      </div>
      <div>
        <img
          className="rounded-4xl border-2 border-gray-300"
          src={teacherImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default BecomeATeacher;
