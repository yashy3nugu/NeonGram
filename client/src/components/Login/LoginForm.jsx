import React, { useContext } from "react";
import axiosInstance from "../../config/axios";
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from "formik";
import NeonGramIcon from "../icons/NeonGramIcon";
import { useFormik } from "formik";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Center,
  Box,
  Text,
} from "@chakra-ui/react";
import AuthFormField from "../shared/AuthFormField";

const LoginForm = () => {
  const { toggleAuth } = useContext(AuthContext);

  // const formik = useFormik({
  //   initialValues: {
  //     username: "",
  //     password: "",
  //   },
  //   validate: (values) => {
  //     const errors = {};
  //     if (!values.username) {
  //       errors.username = "username required";
  //     }
  //     if (!values.password) {
  //       errors.password = "password required";
  //     }
  //     return errors;
  //   },
  //   validateOnMount: false,
  //   onSubmit: (values, { setSubmitting }) => {
  //     setSubmitting(true);
  //     axiosInstance
  //       .post("/api/login", {
  //         username: values.username,
  //         password: values.password,
  //       })
  //       .then((res) => {
  //         localStorage.setItem("accessToken", res.data.accessToken);
  //         localStorage.setItem("refreshToken", res.data.refreshToken);
  //         toggleAuth(true);
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 400) {
  //           alert("wrong password");
  //         }
  //       });
  //     setSubmitting(false);
  //   },
  // });

  return (
    <Box
      bg="gray.900"
      border="2px"
      borderColor="tertiary"
      borderRadius="0.5rem"
      className="absolute top-1/2 transform -translate-y-1/2 sm:relative sm:max-w-md mx-auto w-full bg-gray-900 overflow-hidden rounded-lg border-2 border-transparent sm:border-neon-purple"
    >
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validate={(values) => {
          console.log(values);
          const errors = {};
          if (!values.username) {
            errors.username = "Plaease enter your username";
          }
          if (!values.password) {
            errors.password = "Please enter your password";
          }
          return errors;
        }}
        validateOnMount={false}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          axiosInstance
            .post("/api/login", {
              username: values.username,
              password: values.password,
            })
            .then((res) => {
              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);
              toggleAuth(true);
              window.location.reload();
            })
            .catch((err) => {
              if (err.response.status === 400) {
                alert("wrong password");
              }
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, errors, touched }) => (
          <Form autoComplete="off">
            <Box px={10} py={3} w="24rem">
              <Center className="text-center">
                <NeonGramIcon className="text-2xl sm:text-4xl text-white font-medium" />
              </Center>
              <Box mb={3} mt={3} className="mb-3 mt-10 px-3">
                <AuthFormField name="username" />
                
              </Box>

              <Box mb={3} className="mb-5 px-3">
                <AuthFormField name="password" type="password" />
                
              </Box>

              <Box>
                <Button
                  mt={3}
                  type="submit"
                  disabled={isSubmitting || !(isValid && dirty)}
                  width="full"
                  color="white"
                  colorScheme="tertiaryScheme"
                >
                  Sign In
                </Button>
              </Box>
              <Center mt={5} className="text-center mt-5">
                {/* <p className="text-gray-300 text-sm">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-neon-purple">
                    Sign Up
                  </a>
                </p> */}
                <Text fontSize="xs">
                  Don't have an account?{" "}
                  <Text as="a" href="/signup" color="tertiary">
                    Sign Up
                  </Text>
                </Text>
              </Center>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
