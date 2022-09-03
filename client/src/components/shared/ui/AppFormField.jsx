import { Input } from "@chakra-ui/react";
import { Field } from "formik";

const AppFormField = ({ ...props }) => {
  return <Field as={Input} focusBorderColor="tertiary" bg="whiteAlpha.50" {...props} />;
};

export default AppFormField;
