import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import NeonGramIcon from "../icons/NeonGramIcon";
import { Button, Center, Box, Text, VStack } from "@chakra-ui/react";
import AuthFormField from "../shared/AuthFormField";
import * as Yup from "yup";
import useAlert from "../../hooks/useAlert";
import AppAlert from "../shared/AppAlert";

const signupSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password"),
  fname: Yup.string().required("Please enter your first name"),
  lname: Yup.string().required("Please enter your last name"),
  email: Yup.string().required("Please enter your email"),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match"),
    })
    .required("Please confirm your password"),
});

const initialValues = {
  email: "",
  fname: "",
  lname: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const history = useHistory();
  const { setAlert, alertDetails, isAlertOpen } = useAlert();
  return (
    <>
      {isAlertOpen && <AppAlert details={alertDetails} />}
      <Box
        bg="gray.900"
        border="2px"
        borderColor="tertiary"
        borderRadius="0.5rem"
        className="loginForm container mx-auto w-full max-w-md bg-gray-900 border-2 border-transparent sm:border-neon-purple rounded-lg"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              await axios.post("/api/register", values);
              setSubmitting(false);
              history.push("/");
            } catch (error) {
              setAlert("error", error.response.data.message);
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form autoComplete="off" className="px-10 py-10">
              <VStack px={10} py={3} w="32rem" spacing={3}>
                <Center>
                  <NeonGramIcon />
                </Center>
                <Box w="full" className="mb-3 mt-10 px-3">
                  <AuthFormField name="email" type="email" />
                </Box>

                <Box w="full" className="mb-3 mt-10 px-3">
                  <AuthFormField name="fname" type="text" label="first name" />
                </Box>

                <Box w="full" className="mb-3 mt-10 px-3">
                  <AuthFormField name="lname" type="text" label="last name" />
                </Box>

                <Box w="full">
                  <AuthFormField name="username" type="text" />
                </Box>

                <Box w="full">
                  <AuthFormField name="password" type="password" />
                </Box>

                <Box w="full">
                  <AuthFormField name="confirmPassword" type="password" />
                </Box>
                <Box w="full">
                  <Button
                    my={3}
                    type="submit"
                    disabled={isSubmitting || !(isValid && dirty)}
                    width="full"
                    color="white"
                    colorScheme="tertiaryScheme"
                  >
                    Sign Up
                  </Button>
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default SignUpForm;
