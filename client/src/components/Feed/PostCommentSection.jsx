import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import { AuthContext } from "../../store/context/AuthContext";
import axiosInstance from "../../config/axios";
import { Button, Input, HStack, Box, Text } from "@chakra-ui/react";
import AppFormField from "../Shared/ui/AppFormField";

const PostCommentSection = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`api/comment/${post._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setComments(res.data));
  }, [post]);

  return (
    <>
      {comments.length > 0 && (
        <Box
          px={2}
          py={4}
          // bg="primary.800"
          bg="whiteAlpha.50"
          mb={3}
          // border="1px"
          rounded="lg"
          borderColor="gray.700"
        >
          <Box overflowY="auto" maxHeight={"5rem"}>
            {comments.map((comment, idx) => {
              return (
                <Box key={idx}>
                  <Text
                    as="span"
                    fontWeight="semibold"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {comment.user.username}
                  </Text>{" "}
                  <Text fontSize={{ base: "sm", md: "md" }} as="span">
                    {comment.content}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      <Formik
        initialValues={{
          comment: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.comment) {
            errors.comment = "comment required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          try {
            // await axiosInstance.post(
            //   `api/comment/${post._id}`,
            //   {
            //     content: values.comment,
            //   },
            //   {
            //     headers: {
            //       Authorization: `Bearer ${localStorage.getItem(
            //         "accessToken"
            //       )}`,
            //     },
            //   }
            // );
            setComments((prev) => [
              ...prev,
              { content: values.comment, user: { username: user.username } },
            ]);
            values.comment = "";
            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form autoComplete="off">
            <HStack alignItems="center">
              <AppFormField
                as={Input}
                size="sm"
                type="text"
                maxLength="600"
                colorScheme="pink"
                variant="filled"
                name="comment"
                placeholder="Add a comment..."
                focusBorderColor="tertiary"
              />
              {/* <IconButton
                colorScheme="tertiaryScheme"
                color="white"
                type="submit"
                size="sm"
                disabled={isSubmitting || !(isValid && dirty)}
                
                isLoading={isSubmitting}
                icon={<PlusIcon boxSize={6} />}
              /> */}
              <Button
                type="submit"
                variant="ghost"
                colorScheme="tertiaryScheme"
                size="sm"
                disabled={isSubmitting || !(isValid && dirty)}
              >
                Post
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PostCommentSection;
