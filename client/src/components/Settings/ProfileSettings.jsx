import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from "formik";
import ProfilePicChanger from "./ProfilePicChanger";
import UserIcon from "../icons/UserIcon";
import axiosInstance from "../../config/axios";
import ButtonSpinner from "../icons/ButtonSpinner";
import { Avatar, Box, Button, HStack, VStack } from "@chakra-ui/react";
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
      <HStack>
        <DetailsForm />
        {/* <Box flexGrow={1}>
          <Formik
            initialValues={auth}
            validate={(values) => {
              const errors = {};

              if (!values.username) {
                errors.username = "";
              } else if (values.username.length > 15) {
                errors.username = "Username is too long";
              }

              if (!values.fname) errors.fname = "Cannot be empty";
              if (!values.lname) errors.lname = "Cannot be empty";
              if (!values.bio) errors.bio = "Cannot be empty";
              if (!values.email) {
                errors.email = "Cannot be empty";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              return errors;
            }}
            enableReinitialize
            validateOnMount={false}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              axiosInstance
                .patch("/api/updateDetails", { userDetails: values })
                .then(() => {
                  toggleAuth(values);
                  setSubmitting(false);
                  // toggleAuth((prev) => {
                  //   return {
                  //     ...prev,
                  //     username: values.username,
                  //   };
                  // });
                })
                .catch(() => setSubmitting(false));
            }}
          >
            {({ isSubmitting, isValid, dirty, errors }) => (
              <Form autoComplete="off" className="w-full">
                <div className="my-2">
                  <label className="block text-gray-300 text-sm mb-1 font-medium">
                    First Name
                  </label>
                  <Field
                    className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    type="text"
                    name="fname"
                  />
                </div>

                <div className="my-2">
                  <label className="block text-gray-300 text-sm mb-1 font-medium">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lname"
                    className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div className="my-2">
                  <label className="block text-gray-300 text-sm mb-1 font-medium">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <p class="text-neon-red text-xs italic mt-1">
                    {errors.username}
                  </p>
                </div>

                <div className="my-2">
                  <label className="block text-gray-300 text-sm mb-1 font-medium">
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <p class="text-red-500 text-xs italic mt-1">{errors.email}</p>
                </div>

                <div className="my-2">
                  <label className="block text-gray-300 text-sm mb-1 font-medium">
                    Bio
                  </label>
                  <Field
                    type="text"
                    name="bio"
                    className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !(isValid && dirty)}
                    className="w-1/5 sm:w-1/6 bg-neon-purple hover:bg-purple-900 transition ease-in-out text-white rounded-md py-1 px-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <ButtonSpinner className="w-6 animate-spin mx-auto" />
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Box> */}
        <ProfilePicChanger userDetails={auth} />
      </HStack>
    </Box>
  );
};

export default ProfileSettings;
