import React from "react";

const Logo = () => {
  return (
    <>
      <div className="flex pb-2 justify-center items-center border-b border-gray-500">
        <img
          src="https://cdn3.iconfinder.com/data/icons/inficons/512/github.png"
          alt=" "
          className="w-24 rounded-full"
        />
      </div>
      <h1 className="text-2xl px-2 first-letter:text-5xl">Github Users</h1>
    </>
  );
};

export default Logo;
