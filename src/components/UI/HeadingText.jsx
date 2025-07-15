import React from "react";

const HeadingText = ({ children, className }) => {
  return (
    <h1 className={`text-4xl font-bold text-center py-4 heading-font ${className}`}>
      {children}
    </h1>
  );
};

export default HeadingText;
