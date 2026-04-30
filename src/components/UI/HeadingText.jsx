import React from "react";

const HeadingText = ({ children, className }) => {
  return (
    <h1 className={`text-4xl md:text-5xl font-extrabold text-center py-10 heading-font gradient-text ${className}`}>
      {children}
    </h1>
  );
};

export default HeadingText;
