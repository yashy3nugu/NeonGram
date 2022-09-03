import React, { useContext } from "react";
import axiosInstance from "../../config/axios";
import { AuthContext } from "../ContextProviders/AuthContext";
import { Formik, Form } from "formik";
import NeonGramIcon from "../Shared/icons/NeonGramIcon";
import { Center, Text, useToast, Container, VStack } from "@chakra-ui/react";
import AuthFormField from "../Shared/ui/AuthFormField";
import * as Yup from "yup";
import ColoredFormButton from "../Shared/ui/ColoredFormButton";
import { useHistory } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password"),
});

const LoginForm = () => {
  const { toggleAuth } = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();

  return (
    <>
      <Container
        bg="primary.900"
        border="1px"
        borderColor="gray.800"
        borderRadius="xl"
        py={{ base: 20, sm: 8 }}
        flexGrow={{ base: 1, sm: 0 }}
        className="absolute top-1/2 transform -translate-y-1/2 sm:relative sm:max-w-md mx-auto w-full bg-gray-900 overflow-hidden rounded-lg border-2 border-transparent sm:border-neon-purple"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          validateOnMount={false}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const res = await axiosInstance.post("/api/login", {
                username: values.username,
                password: values.password,
              });

              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);

              toggleAuth(true);
              history.replace("/app/feed");
              // window.location.reload();
            } catch (error) {
              toggleAuth(false);
              toast({
                title: "error",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              setSubmitting(false);
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, errors, touched }) => (
            <Form autoComplete="off">
              <VStack px={10} py={3} spacing={3} w="full">
                <Center>
                  <NeonGramIcon />
                </Center>

                <AuthFormField name="username" type="text" />

                <AuthFormField name="password" type="password" />

                <ColoredFormButton
                  mt={3}
                  type="submit"
                  disabled={isSubmitting || !(isValid && dirty)}
                  width="full"
                  color="white"
                  colorScheme="tertiaryScheme"
                >
                  Sign In
                </ColoredFormButton>

                <Center mt={5} className="text-center mt-5">
                  <Text fontSize="xs">
                    Don't have an account?{" "}
                    <Text as="a" href="/signup" color="tertiary">
                      Sign Up
                    </Text>
                  </Text>
                </Center>
              </VStack>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default LoginForm;
