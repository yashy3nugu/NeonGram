import React, { useState, useContext } from "react";
import MenuIcon from "../Icons/MenuIcon";
import CrossIcon from "../Icons/CrossIcon";
import HomeIcon from "../Icons/HomeIcon";
import PlusIcon from "../Icons/PlusIcon";
import PlusIconSolid from "../Icons/PlusIconSolid";
import GlobeIcon from "../Icons/GlobeIcon";
import GlobeIconSolid from "../Icons/GlobeIconSolid";
import NeonGramIcon from "../Icons/NeonGramIcon";
import ProfileDropDown from "./ProfileDropDown";
import { useLocation } from "react-router-dom";
import HomeIconSolid from "../Icons/HomeIconSolid";
import { AuthContext } from "../contextProviders/authContext";

const Navbar = () => {

    const { auth, toggleAuth } = useContext(AuthContext);

    const [navExpanded, setNavExpanded] = useState(false);

    const [dropDownOpen, setDropDownOpen] = useState(false);

    const { pathname } = useLocation();

    function toggleNavExpanded() {
        setNavExpanded(prev => !prev)
    }

    return (
        <>
            {/* <div className="navbar  bg-gray-900"> */}
            <div className="fixed z-10 top-0 flex items-center justify-between w-full py-8 px-3 bg-gray-900">
                {/* <h1 className="logo">Neongram</h1> */}
                <NeonGramIcon />
                <nav className="p-1">
                    <ul className="m-0 p-0 list-none flex">
                        <span className="inline" onClick={toggleNavExpanded}><MenuIcon /></span>
                        <li className="mx-6 inline"><a href="/">{pathname === "/" ? <HomeIconSolid className="w-8 text-neon-purple" /> : <HomeIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />}</a></li>
                        <li className="mx-6 inline"><a href="/post" className="">{pathname === "/post" ? <PlusIconSolid className="w-8 text-neon-purple" /> : <PlusIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />}</a></li>
                        <li className="mx-6 inline"><a href="/explore">{pathname === "/explore" ? <GlobeIconSolid className="w-8 text-neon-purple" /> : <GlobeIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />}</a></li>
                            <button onClick={() => setDropDownOpen(prev => !prev)} className="relative mx-6 rounded-full">
                                <img src={auth.profilePicture} className="w-8 rounded-full border-2 border-transparent hover:border-neon-green transition ease-in-out duration-200" alt={auth.username} />
                                {dropDownOpen && <ProfileDropDown auth={auth} />}
                            </button>




                    </ul>



                </nav>


            </div>
            {navExpanded && (
                <div className="navDrawer bg-gray-900">
                    <ul className="navDrawerContent">
                        <span className="crossIcon" onClick={toggleNavExpanded}><CrossIcon /></span>
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