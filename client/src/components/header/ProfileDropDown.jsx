import React from 'react'

const ProfileDropDown = ({ auth }) => {
    return (
        <div className={`absolute z-20 w-32 right-0 mt-3 bg-gray-800 text-left rounded-md overflow-hidden border border-neon-purple`}>
            <a href={`/user/${auth.username}`} className="block p-2 text-gray-300">
                <p>Signed in as</p>
                <strong className="font-semibold">{auth.username}</strong>
            </a>
            <hr className="mx-1.5 border-gray-600" />
            <a href="/settings" className="block text-gray-300 p-2 hover:bg-gray-700">Settings</a>
            <a href="/settings" className="block text-gray-300 p-2 hover:bg-gray-700">Saved</a>
            <hr className="mx-1.5 border-gray-600" />
            <button className="block text-neon-red p-2 hover:bg-gray-700 w-full text-left">Logout</button>
        </div>
    )
}

export default ProfileDropDown
