import React from "react";

const Navbar = () => {
    return (
        // <div className="navbar bg-gray-900">
        //     <a className="logo" href="/">Neongram</a>
        //     <a className="signUp rounded-full py-2 px-5 bg-gray-800" href="/">Sign Up</a>
        //     <a className="navLink" href="/">Login</a>
        //     <a className="navLink" href="/">Home</a>
        // </div>
        <div className="navbar bg-gray-900">
        <h1 className="logo">Neongram</h1>
        <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Login</a></li>
          <li><a href="/" className="signUp rounded-full py-2 px-5 bg-gray-800">Sign Up</a></li>
        </ul>
      </nav>
        </div>
    )
}

export default Navbar;