import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  return (
    <div >
      <span  style={{ fontSize: "15rem" }}>
        😢
      </span>

      <h1 >Oops!</h1>
      <p >
        The page you are looking for is not found
      </p>
      <button
        onClick={() => history.push("/")}
        
      >
        Go to home
      </button>
    </div>
  );
};

export default NotFound;
