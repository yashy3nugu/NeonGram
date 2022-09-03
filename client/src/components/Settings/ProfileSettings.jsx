import React from "react";

import ProfilePicChanger from "./ProfilePicChanger";

import { Box, Stack, Text } from "@chakra-ui/react";

import DetailsForm from "./DetailsForm";

const ProfileSettings = () => {
  return (
    <Box
      mt={{ md: 50 }}
      mb={{ md: 50 }}
      bg={"primary.900"}
      w={{ base: "full", md: "sm", lg: "md", xl: "lg" }}
      mx="auto"
      px={10}
      py={10}
      borderWidth={{ md: "1px" }}
      borderRadius={{ md: "xl" }}
    >
      <Text fontSize="4xl" fontWeight="semibold" mb={3}>
        Settings
      </Text>
      <Stack direction={{base:"column-reverse", lg: "row"}} spacing={{base:5, lg:12}} alignItems="">
        <DetailsForm />
        <ProfilePicChanger />
      </Stack>
    </Box>
  );
};

export default ProfileSettings;
