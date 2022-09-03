import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField, Field } from "formik";

const AuthFormField = ({label, ...props}) => {
  const [{ name }, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={name}>{label ? label : name}</FormLabel>
      <Field
        as={Input}
        focusBorderColor="tertiary"
        width="full"
        errorBorderColor="crimson"
        bg="whiteAlpha.50"
        {...props}
      />
      <FormErrorMessage color="crimson">{error}</FormErrorMessage>
    </FormControl>
  );
};

export default AuthFormField;
