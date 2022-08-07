import React from "react";
import useClickOutsideListener from "../../hooks/useClickOutsideListener";
import SettingsIcon from "../icons/SettingsIcon";
import BookMarkIcon from "../icons/BookMarkIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SearchIcon from "../icons/SearchIcon";

const ProfileDropDown = ({ auth, onClose }) => {
  const ref = useClickOutsideListener(onClose);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  return (
    <div
      ref={ref}
      className={`absolute z-20 w-32 right-0 mt-3 bg-gray-800 text-left rounded-md overflow-hidden border border-neon-purple`}
    >
      <a href={`/user/${auth.username}`} className="block p-2 text-gray-300">
        <p>Signed in as</p>
        <strong className="font-semibold">{auth.username}</strong>
      </a>
      <hr className="mx-1.5 border-gray-600" />
      <a href="/settings" className="block text-gray-300 p-2 hover:bg-gray-700">
        <SettingsIcon className="w-5 inline mr-2" />
        Settings
      </a>
      <a href="/settings" className="block text-gray-300 p-2 hover:bg-gray-700">
        <BookMarkIcon className="w-5 inline mr-2" />
        Saved
      </a>
      <a href="/find" className="block text-gray-300 p-2 hover:bg-gray-700">
        <SearchIcon className="w-5 inline mr-2" />
        Search
      </a>
      <hr className="mx-1.5 border-gray-600" />
      <button
        onClick={logout}
        className="block text-neon-red p-2 hover:bg-gray-700 w-full text-left"
      >
        <LogoutIcon className="w-5 inline ml-0.5 mr-2" />
        Logout
      </button>
    </div>
  );
};

export default ProfileDropDown;
