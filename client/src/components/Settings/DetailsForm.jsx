import { Box, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import axiosInstance from "../../config/axios";
import { useContext } from "react";
import { AuthContext } from "../../store/context/AuthContext";
import AuthFormField from "../Shared/ui/AuthFormField";
import ColoredFormButton from "../Shared/ui/ColoredFormButton";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Required")
    .max(15, "Must be 15 characters or less"),
  fname: Yup.string()
    .required("Required")
    .max(30, "Must be 30 characters or less"),
  lname: Yup.string()
    .required("Required")
    .max(30, "Must be 30 characters or less"),
  bio: Yup.string()
    .required("Required")
    .max(50, "Must be 50 characters or less"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const DetailsForm = () => {
  const { user, updateUserDetails } = useContext(AuthContext);

  return (
    <Box flexGrow={1}>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnMount={false}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          axiosInstance
            .patch("/api/updateDetails", { userDetails: values })
            .then(() => {
              updateUserDetails(values);
              setSubmitting(false);
            })
            .catch(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form autoComplete="off" >
            <VStack align="left" spacing={4}>
              <AuthFormField name="fname" type="text" label="First Name" />
              <AuthFormField name="lname" type="text" label="Last Name" />
              <AuthFormField name="username" type="text" label="Username" />
              <AuthFormField name="bio" type="text" label="Bio" />
              <AuthFormField name="email" type="text" label="Email" />

              <Box>
                <ColoredFormButton
                  disabled={!(isValid && dirty)}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Save
                </ColoredFormButton>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DetailsForm;
