import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import NeonGramIcon from "../Shared/icons/NeonGramIcon";
import {
  Center,
  Box,
  VStack,
  Container,
  useToast,
  Text,
} from "@chakra-ui/react";
import AuthFormField from "../Shared/ui/AuthFormField";
import * as Yup from "yup";
import ColoredFormButton from "../Shared/ui/ColoredFormButton";

import axiosInstance from "../../config/axios";

const signupSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters"),
  fname: Yup.string().required("Please enter your first name"),
  lname: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
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

  const toast = useToast();
  return (
    <>
      <Container
        bg="primary.900"
        border="1px"
        borderColor="gray.800"
        borderRadius="xl"
        flexGrow={{ base: 1, sm: 0 }}
        // width={{ base: "full", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        
      >
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const res = await axiosInstance.post("/api/register", values);
              setSubmitting(false);
              toast({
                title: "success",
                description: "You have successfully registered",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);

              setTimeout(() => {
                history.push("/app/feed");
              }, 4000);

              // history.push("/");
            } catch (error) {
              toast({
                title: "error",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form autoComplete="off" >
              <VStack px={10} py={3} spacing={3} w="full">
                <Center>
                  <NeonGramIcon />
                </Center>
                <AuthFormField label="Email" name="email" type="email" />

                <Box w="full" >
                  <AuthFormField name="fname" type="text" label="First name" />
                </Box>

                <Box w="full" >
                  <AuthFormField name="lname" type="text" label="Last name" />
                </Box>

                <Box w="full">
                  <AuthFormField name="username" type="text" label="Username" />
                </Box>

                <Box w="full">
                  <AuthFormField
                    name="password"
                    type="password"
                    label="Password"
                  />
                </Box>

                <Box w="full">
                  <AuthFormField
                    name="confirmPassword"
                    type="password"
                    label="Confirm password"
                  />
                </Box>
                <Box w="full">
                  <ColoredFormButton
                    my={3}
                    type="submit"
                    disabled={!(isValid && dirty)}
                    isLoading={isSubmitting}
                    width="full"
                  >
                    Sign Up
                  </ColoredFormButton>
                  <Text fontSize="xs" textAlign="center">
                    Don't have an account?{" "}
                    <Text as={Link} to="/login" color="tertiary">
                      Login
                    </Text>
                  </Text>
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default SignUpForm;
