import React from "react";

const Button = ({ nextPage, label, type, className }) => {
  return (
    <button type={type} className={className} onClick={nextPage}>
      {label}
    </button>
  );
};

export default Button;