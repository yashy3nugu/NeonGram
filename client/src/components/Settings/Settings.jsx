import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

const Settings = () => {


    const [setting, setSetting] = useState("Profile");

    const changeSetting = (e) => setSetting(e.target.textContent)

    return (
        <div className="flex flex-row container mx-auto max-w-5xl bg-gray-900 mt-4 p-3">
        <Sidebar changeSetting={changeSetting} selected={setting}/>

        {setting === "Profile" && <ProfileSettings />}
        {setting === "Account" && <AccountSettings />}
            
        </div>
    )
}

export default Settings
