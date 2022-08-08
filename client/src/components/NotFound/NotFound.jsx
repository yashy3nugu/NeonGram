import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="w-screen h-screen bg-gray-800 text-center">
      <span className="" style={{ fontSize: "15rem" }}>
        😢
      </span>

      <h1 className="text-5xl sm:text-6xl text-gray-300 mb-3">Oops!</h1>
      <p className="text-2xl sm:text-3xl text-gray-500">
        The page you are looking for is not found
      </p>
      <button
        onClick={() => history.push("/")}
        className="mt-5 text-xl sm:text-2xl bg-neon-purple text-gray-200 py-2 px-3 rounded-lg"
      >
        Go to home
      </button>
    </div>
  );
};

export default NotFound;
