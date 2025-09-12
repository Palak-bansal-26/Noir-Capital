import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-400 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-yellow-400 transition"
    />
  </div>
);

export default InputField;
