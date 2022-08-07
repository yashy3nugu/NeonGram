import React from "react";
import { createPortal } from "react-dom";
import useClickOutsideListener from "../../hooks/useClickOutsideListener";
import ButtonSpinner from "../icons/ButtonSpinner";
import UserIcon from "../icons/UserIcon";

const UnfollowModal = ({ user, onClose, unfollowUser, loading }) => {
  const ref = useClickOutsideListener(onClose);

  return createPortal(
    <div className="unfollow-modal z-10 fixed top-0 left-0 right-0 bottom-0">
      <div
        ref={ref}
        className="unfollow-modal__actions bg-gray-900 text-center w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 rounded-3xl overflow-hidden"
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.username}
            className="w-28 rounded-full mx-auto"
          />
        ) : (
          <UserIcon className="w-28 text-gray-400 mx-auto" />
        )}

        <p className="text-gray-300">Unfollow @{user.username}?</p>
        <div className="mt-6">
          <button
            onClick={() => unfollowUser(user._id)}
            className="py-2 block w-full text-center text-neon-red font-bold border-t border-gray-700 hover:bg-gray-700 focus:bg-gray-700"
          >
            {loading ? (
              <ButtonSpinner className="w-6 mx-auto animate-spin" />
            ) : (
              "Unfollow"
            )}
          </button>
          <button
            onClick={onClose}
            className="py-2 block w-full text-center text-gray-200 border-t border-gray-700 hover:bg-gray-700 focus:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default UnfollowModal;
