import React, {useState} from "react";
import MenuIcon from "../icons/MenuIcon";
import CrossIcon from "./icons/CrossIcon";
import HomeIcon from "../icons/HomeIcon";
import PlusIcon from "./icons/PlusIcon";
import PlusIconSolid from "../icons/PlusIconSolid";
import { useLocation } from "react-router-dom";
import HomeIconSolid from "../icons/HomeIconSolid";

const Navbar = () => {

    const [navExpanded, setNavExpanded] = useState(false);

    const {pathname} = useLocation();

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
                    <li><a href="/">{pathname === "/" ? <HomeIconSolid className="w-6"/> : <HomeIcon className="w-6" />}</a></li>
                    <li><a href="/post" className="">{pathname === "/post"?<PlusIconSolid className="w-6" />:<PlusIcon className="w-6" />}</a></li>
                    
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