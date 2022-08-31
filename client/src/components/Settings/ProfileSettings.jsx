import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from "formik";
import ProfilePicChanger from "./ProfilePicChanger";
import UserIcon from "../icons/UserIcon";
import axiosInstance from "../../config/axios";
import ButtonSpinner from "../icons/ButtonSpinner";
import { Avatar, Box, Button, HStack, VStack, Text } from "@chakra-ui/react";
import ColoredFormButton from "../shared/ColoredFormButton";
import PencilIcon from "../icons/PencilIcon";
import DetailsForm from "./DetailsForm";

const ProfileSettings = () => {
  const { auth, toggleAuth } = useContext(AuthContext);

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
      <HStack spacing={12} alignItems="" >
        <DetailsForm />

        <ProfilePicChanger />
      </HStack>
    </Box>
  );
};

export default ProfileSettings;
