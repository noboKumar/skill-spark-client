import React from "react";
import { Link } from "react-router";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    image,
    price,
    description,
    total_enrollment,
    name, // instructor name
    email, // instructor email
  } = course;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="glass-effect rounded-[2rem] overflow-hidden border border-base-300/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <p className="text-white text-sm font-medium line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5 flex flex-col flex-grow">
        <div className="space-y-2">
          <h3 className="text-xl font-bold heading-font leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {name && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaUserTie className="text-primary/70" />
              <span>{name}</span>
            </div>
          )}
        </div>

        {/* Stats & Price Row */}
        <div className="flex items-center justify-between pt-4 border-t border-base-300/30">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <FaUsers className="text-primary" />
            <span>{total_enrollment} Students</span>
          </div>
          <div className="text-xl font-bold text-primary flex items-center gap-1">
            <span className="text-sm font-medium text-gray-500">$</span>
            {price}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 mt-auto">
          <Link to={`/classes/${_id}`} className="block">
            <button className="btn gradient-primary btn-block rounded-2xl text-white border-none shadow-lg hover:shadow-primary/30 transform active:scale-95 transition-all duration-300">
              Enroll Now
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
