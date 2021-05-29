import React, { useState, useContext} from "react";
import MenuIcon from "../Icons/MenuIcon";
import CrossIcon from "../Icons/CrossIcon";
import HomeIcon from "../Icons/HomeIcon";
import PlusIcon from "../Icons/PlusIcon";
import PlusIconSolid from "../Icons/PlusIconSolid";
import GlobeIcon from "../Icons/GlobeIcon";
import GlobeIconSolid from "../Icons/GlobeIconSolid";
import { useLocation } from "react-router-dom";
import HomeIconSolid from "../Icons/HomeIconSolid";
import { AuthContext } from "../contextProviders/authContext";

const Navbar = () => {

    const { auth, toggleAuth } = useContext(AuthContext);

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
                    <li className="mx-6 "><a href="/">{pathname === "/" ? <HomeIconSolid className="w-8 text-neon-purple"/> : <HomeIcon className="w-8 text-gray-300" />}</a></li>
                    <li className="mx-6"><a href="/post" className="">{pathname === "/post"?<PlusIconSolid className="w-8 text-neon-purple" />:<PlusIcon className="w-8 text-gray-300" />}</a></li>
                    <li className="mx-6"><a href="/explore">{pathname === "/explore"? <GlobeIconSolid className="w-8 text-neon-purple" />: <GlobeIcon className="w-8 text-gray-300"/>}</a></li>
                    <button className="mx-6 "><img src={auth.profilePicture} className="w-8 rounded-full" alt={auth.username}/></button>
                    
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