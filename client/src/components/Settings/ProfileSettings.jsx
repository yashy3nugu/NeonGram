import React from "react";

import ProfilePicChanger from "./ProfilePicChanger";

import { Box, HStack, Text } from "@chakra-ui/react";

import DetailsForm from "./DetailsForm";

const ProfileSettings = () => {
  return (
    <Box
      mt={50}
      mb={50}
      bg={"primary.900"}
      maxWidth="3xl"
      mx="auto"
      px={10}
      py={10}
      borderWidth="1px"
      borderRadius="xl"
    >
      <Text fontSize="4xl" fontWeight="semibold" mb={3}>
        Settings
      </Text>
      <HStack spacing={12} alignItems="">
        <DetailsForm />

        <ProfilePicChanger />
      </HStack>
    </Box>
  );
};

export default ProfileSettings;
