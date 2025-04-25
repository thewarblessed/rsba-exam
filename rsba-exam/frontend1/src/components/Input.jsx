import React from 'react';

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="input input-bordered w-full mb-3"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
