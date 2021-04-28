import React, {useState} from "react";
import MenuIcon from "./icons/MenuIcon";
import CrossIcon from "./icons/CrossIcon";

const Navbar = () => {

    const [navExpanded, setNavExpanded] = useState(false);

    function toggleNavExpanded() {
        setNavExpanded(prev => !prev)
    }

    return (
        <>
        <div className="navbar bg-gray-900">
            <h1 className="logo">Neongram</h1>
            <nav>
                <ul className="navLinks">
                    <span className="menuIcon" onClick={toggleNavExpanded}><MenuIcon/></span>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Login</a></li>
                    <li><a href="/" className="signUp rounded-full py-2 px-5 bg-gray-800">Sign Up</a></li>
                    
                </ul>
                
            </nav>

            
        </div>
        {navExpanded && (
                    <div className="navDrawer bg-gray-900">
                        <ul className="navDrawerContent">
                            <span className="crossIcon" onClick={toggleNavExpanded}><CrossIcon/></span>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Login</a></li>
                            <li><a href="/" className="">Sign Up</a></li>
                        </ul>
                    </div>
                )}
        </>
    )
}

export default Navbar;