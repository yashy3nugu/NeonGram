import React from "react";
import axiosInstance from "../../config/axios";
import { Formik, Form } from "formik";
import NeonGramIcon from "../Shared/icons/NeonGramIcon";
import { Center, Text, useToast, Container, VStack } from "@chakra-ui/react";
import AuthFormField from "../Shared/ui/AuthFormField";
import * as Yup from "yup";
import ColoredFormButton from "../Shared/ui/ColoredFormButton";
import { Link, useHistory } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password"),
});

const LoginForm = () => {
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

              toast({
                title: "success",
                description: "You have successfully logged in",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);

              setTimeout(() => {
                history.push("/app/feed");
              }, 4000);
            } catch (error) {
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
          {({ isSubmitting, isValid, dirty }) => (
            <Form autoComplete="off">
              <VStack px={10} py={3} spacing={3} w="full">
                <Center>
                  <NeonGramIcon />
                </Center>

                <AuthFormField name="username" label="Username" type="text" />

                <AuthFormField name="password" label="Password" type="password" />

                <ColoredFormButton
                  mt={3}
                  type="submit"
                  disabled={!(isValid && dirty)}
                  isLoading={isSubmitting}
                  width="full"
                  color="white"
                  colorScheme="tertiaryScheme"
                >
                  Sign In
                </ColoredFormButton>

                <Center mt={5} >
                  <Text fontSize="xs">
                    Don't have an account?{" "}
                    <Text as={Link} to="/signup" color="tertiary">
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
