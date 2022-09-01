import React from "react";

import ProfileSettings from "./ProfileSettings";

import { Box } from "@chakra-ui/react";

const Settings = () => {
  return (
    // <div className="flex flex-col lg:flex-row container mx-auto bg-gray-900 p-3">
    //   <Sidebar changeSetting={changeSetting} selected={setting} />

    //   {setting === "Profile" && <ProfileSettings />}
    //   {setting === "Account" && <AccountSettings />}
    // </div>
    <Box>
      <ProfileSettings />
    </Box>
  );
};

export default Settings;
