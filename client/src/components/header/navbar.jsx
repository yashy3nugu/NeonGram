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

    const { auth } = useContext(AuthContext);

    const [navExpanded, setNavExpanded] = useState(false);

    const [dropDownOpen, setDropDownOpen] = useState(false);

    const { pathname } = useLocation();

    function toggleNavExpanded() {
        setNavExpanded(prev => !prev)
    }

    return (
        <>
            {/* <div className="navbar  bg-gray-900"> */}
            <div className="flex items-center justify-between w-full py-8 px-3 bg-gray-900">
                {/* <h1 className="logo">Neongram</h1> */}
                <a href="/">
                    <NeonGramIcon />
                </a>
                
                <nav className="p-1">
                    <ul className="m-0 p-0 list-none flex">
                        {!navExpanded ? (
                            <span className="inline sm:invisible" onClick={toggleNavExpanded}><MenuIcon className="w-8 text-gray-300" /></span>
                        ) : (
                            <span className="inline sm:invisible" onClick={toggleNavExpanded}><CrossIcon className="w-8 text-gray-300" /></span>
                        )}
                        
                        <li className="py-2 mx-6 hidden sm:inline"><a href="/">{pathname === "/" ? <HomeIconSolid className="w-8 text-neon-purple" /> : <HomeIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />}</a></li>
                        <li className="py-2 mx-6 hidden sm:inline"><a href="/post" className="">{pathname === "/post" ? <PlusIconSolid className="w-8 text-neon-purple" /> : <PlusIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />}</a></li>
                        <li className="py-2 mx-6 hidden sm:inline"><a href="/explore">{pathname === "/explore" ? <GlobeIconSolid className="w-8 text-neon-purple" /> : <GlobeIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />}</a></li>
                        <button onClick={() => setDropDownOpen(prev => !prev)} className="relative py-2 mx-6 rounded-full hidden sm:inline">
                            <img src={auth.profilePicture} className="w-8 rounded-full border-2 border-transparent hover:border-neon-green transition ease-in-out duration-200" alt={auth.username} />
                            {dropDownOpen && <ProfileDropDown auth={auth} />}
                        </button>




                    </ul>



                </nav>


            </div>
            {navExpanded && (
                <div className="bg-gray-900 text-center sidebar">
                    <a href = {`/user/${auth.username}`} className=" block mb-4">
                        <img src={auth.profilePicture} className="w-16 rounded-full mx-auto" alt={auth.username} />
                        <strong className="text-gray-300 font-semibold">{auth.username}</strong>
                    </a>
                    <hr className="border-gray-600 mx-10"/>

                    <ul className="">
                        <li className="py-2 mx-6">
                            <a href="/">
                                {pathname === "/" ? (
                                    <>
                                        <HomeIconSolid className="block mx-auto w-6 max-w-6 text-neon-purple" />
                                        <span className="text-neon-purple">Home</span>
                                    </>
                                ) : (
                                    <>
                                        <HomeIcon className=" block mx-auto max-w-6 w-6 text-gray-300" />
                                        <span className="text-gray-300">Home</span>
                                    </>
                                )}
                            </a>
                        </li>
                        <li className="py-2 mx-6">
                            <a href="/post" className="">
                                {pathname === "/post" ? (
                                    <>
                                        <PlusIconSolid className="block mx-auto w-6 max-w-6 text-neon-purple" />
                                        <span className="text-neon-purple">Post</span>
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="block mx-auto max-w-6 w-6 text-gray-300" />
                                        <span className="text-gray-300">Post</span>
                                    </>
                                )}
                            </a>
                        </li>
                        <li className="py-2 mx-6">
                            <a href="/explore">
                                {pathname === "/explore" ? (
                                    <>
                                        <GlobeIconSolid className="block mx-auto w-6 max-w-6 text-neon-purple" />
                                        <span className="text-neon-purple">Explore</span>
                                    </>
                                ) : (
                                    <>
                                        <GlobeIcon className="block mx-auto max-w-6 w-6 text-gray-300" />
                                        <span className="text-gray-300">Explore</span>
                                    </>
                                )}
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Navbar;