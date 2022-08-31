import { Box, Input } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axiosInstance from "../../config/axios";
import { useContext } from "react";
import { AuthContext } from "../contextProviders/authContext";
import AuthFormField from "../shared/AuthFormField";
import ColoredFormButton from "../shared/ColoredFormButton";
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
  const { auth, toggleAuth } = useContext(AuthContext);

  return (
    <Box flexGrow={1}>
      <Formik
        initialValues={auth}
        validationSchema={validationSchema}
        // validate={(values) => {
        //   const errors = {};

        //   if (!values.username) {
        //     errors.username = "";
        //   } else if (values.username.length > 15) {
        //     errors.username = "Username is too long";
        //   }

        //   if (!values.fname) errors.fname = "Cannot be empty";
        //   if (!values.lname) errors.lname = "Cannot be empty";
        //   if (!values.bio) errors.bio = "Cannot be empty";
        //   if (!values.email) {
        //     errors.email = "Cannot be empty";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }

        //   return errors;
        // }}
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
            <AuthFormField name="fname" type="text" label="First Name" />
            <AuthFormField name="lname" type="text" label="Last Name" />
            <AuthFormField name="username" type="text" label="Username" />
            <AuthFormField name="bio" type="text" label="Bio" />
            <AuthFormField name="email" type="text" label="Email" />

            <ColoredFormButton
              disabled={!(isValid && dirty)}
              isLoading={isSubmitting}
              type="submit"
            >
              Save
            </ColoredFormButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DetailsForm;
