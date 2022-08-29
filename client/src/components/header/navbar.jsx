import React, { useState, useContext } from "react";
import MenuIcon from "../icons/MenuIcon";
import CrossIcon from "../icons/CrossIcon";
import HomeIcon from "../icons/HomeIcon";
import PlusIcon from "../icons/PlusIcon";
import PlusIconSolid from "../icons/PlusIconSolid";
import GlobeIcon from "../icons/GlobeIcon";
import GlobeIconSolid from "../icons/GlobeIconSolid";
import NeonGramIcon from "../icons/NeonGramIcon";
import ProfileDropDown from "./ProfileDropDown";
import { useLocation } from "react-router-dom";
import HomeIconSolid from "../icons/HomeIconSolid";
import { AuthContext } from "../contextProviders/authContext";
import { Box, Flex, Text, Icon, IconButton } from "@chakra-ui/react";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const [navExpanded, setNavExpanded] = useState(false);

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const { pathname } = useLocation();

  function toggleNavExpanded() {
    setNavExpanded((prev) => !prev);
  }

  return (
    <>
      {/* <div className="navbar  bg-gray-900"> */}
      <Flex
        align="center"
        justify="center"
        py={8}
        px={3}
        className="flex items-center justify-between w-full py-8 px-3 bg-gray-900"
      >
        {/* <h1 className="logo">Neongram</h1> */}
        <Text as="a" href="/" className="ml-10">
          <NeonGramIcon />
        </Text>

        <Box as="nav">
          <Box as="ul">
            <IconButton variant="text" icon={<PlusIcon boxSize={10} color="purp" />} />
          </Box>
        </Box>

        {/* <nav className="p-1">
          <ul className="m-0 p-0 list-none flex">
            {!navExpanded ? (
              <span className="inline sm:invisible" onClick={toggleNavExpanded}>
                <MenuIcon className="w-8 text-gray-300" />
              </span>
            ) : (
              <span className="inline sm:invisible" onClick={toggleNavExpanded}>
                <CrossIcon className="w-8 text-gray-300" />
              </span>
            )}

            <li className="py-2 mx-6 hidden sm:inline">
              <a href="/">
                {pathname === "/" ? (
                  <HomeIconSolid className="w-8 text-neon-purple" />
                ) : (
                  <HomeIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />
                )}
              </a>
            </li>
            <li className="py-2 mx-6 hidden sm:inline">
              <a href="/post" className="">
                {pathname === "/post" ? (
                  <PlusIconSolid className="w-8 text-neon-purple" />
                ) : (
                  <PlusIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />
                )}
              </a>
            </li>
            <li className="py-2 mx-6 hidden sm:inline">
              <a href="/explore">
                {pathname === "/explore" ? (
                  <GlobeIconSolid className="w-8 text-neon-purple" />
                ) : (
                  <GlobeIcon className="w-8 text-gray-300 hover:text-neon-green transition ease-in-out duration-200" />
                )}
              </a>
            </li>
            <span
              onClick={() => setDropDownOpen(true)}
              className="relative py-2 mx-6 rounded-full hidden sm:inline"
            >
              <img
                src={auth.profilePicture}
                className="w-8 rounded-full border-2 border-transparent hover:border-neon-green transition ease-in-out duration-200"
                alt={auth.username}
              />
              {dropDownOpen && (
                <ProfileDropDown
                  auth={auth}
                  onClose={() => setDropDownOpen(false)}
                />
              )}
            </span>
          </ul>
        </nav> */}
      </Flex>
      {navExpanded && (
        <div className="bg-gray-900 text-center sidebar">
          <a href={`/user/${auth.username}`} className=" block mb-4">
            <img
              src={auth.profilePicture}
              className="w-16 rounded-full mx-auto"
              alt={auth.username}
            />
            <strong className="text-gray-300 font-semibold">
              {auth.username}
            </strong>
          </a>
          <hr className="border-gray-600 mx-10" />

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
  );
};

export default Navbar;
