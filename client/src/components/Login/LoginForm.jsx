import React, { useContext } from "react";
import axiosInstance from "../../config/axios";
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form } from "formik";
import NeonGramIcon from "../icons/NeonGramIcon";
import { Button, Center, Box, Text } from "@chakra-ui/react";
import AuthFormField from "../shared/AuthFormField";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password"),
});

const LoginForm = () => {
  const { toggleAuth } = useContext(AuthContext);

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
        validationSchema={loginSchema}
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
              <Center>
                <NeonGramIcon />
              </Center>
              <Box mb={3} mt={3} className="mb-3 mt-10 px-3">
                <AuthFormField name="username" type="text" />
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
