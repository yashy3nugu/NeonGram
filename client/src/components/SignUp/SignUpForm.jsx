import React, {useContext} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import NeonGramIcon from "../icons/NeonGramIcon";
import {
  Button,
  Center,
  Box,
  Text,
  VStack,
  Container,
  useToast,
} from "@chakra-ui/react";
import AuthFormField from "../shared/AuthFormField";
import * as Yup from "yup";
import ColoredFormButton from "../shared/ColoredFormButton";
import { AuthContext } from "../contextProviders/authContext";


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
        className="loginForm container mx-auto w-full max-w-md bg-gray-900 border-2 border-transparent sm:border-neon-purple rounded-lg"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const res = await axios.post("/api/register", values);
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
                history.push("/");
              }, 4000);

              // history.push("/");
            } catch (error) {
              toast({
                title: "error",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form autoComplete="off" className="px-10 py-10">
              <VStack px={10} py={3} spacing={3} w="full">
                <Center>
                  <NeonGramIcon />
                </Center>
                <AuthFormField label="Email" name="email" type="email" />

                <Box w="full" className="mb-3 mt-10 px-3">
                  <AuthFormField name="fname" type="text" label="First name" />
                </Box>

                <Box w="full" className="mb-3 mt-10 px-3">
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
                    disabled={isSubmitting || !(isValid && dirty)}
                    width="full"
                  >
                    Sign Up
                  </ColoredFormButton>
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
