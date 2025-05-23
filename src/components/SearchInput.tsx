import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search photos..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        p-3
        border
        border-gray-300
        rounded-md
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
        duration-200
        placeholder-gray-400
        dark:bg-gray-800
        dark:text-gray-100
        dark:border-gray-700
        dark:focus:ring-blue-400
      "
    />
  );
};

export default SearchInput;
