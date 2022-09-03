import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import { AuthContext } from "../ContextProviders/AuthContext";
import axiosInstance from "../../config/axios";
import { Button, Input, HStack, Box, Text } from "@chakra-ui/react";
import AppFormField from "../shared/ui/AppFormField";

const PostCommentSection = ({ post }) => {
  const { auth } = useContext(AuthContext);
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
          className="max-h-32 text-gray-300 rounded bg-gray-800 px-3 py-2 mb-4 text-sm overflow-scroll"
        >
          <Box overflowY="auto" maxHeight={"5rem"}>
            {comments.map((comment, idx) => {
              return (
                <Box className="my-0.5" key={idx}>
                  <Text
                    as="span"
                    fontWeight="semibold"
                    className="font-semibold"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {comment.user.username}
                  </Text>{" "}
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    as="span"
                    className="text-gray-300"
                  >
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
            await axiosInstance.post(
              `api/comment/${post._id}`,
              {
                content: values.comment,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            );
            setComments((prev) => [
              ...prev,
              { content: values.comment, user: { username: auth.username } },
            ]);
            values.comment = "";
            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form autoComplete="off" className="flex">
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
                className="w-full bg-gray-800 rounded mr-2 px-2 text-xs text-gray-300 focus:outline-none"
                focusBorderColor="tertiary"
              />
              {/* <IconButton
                colorScheme="tertiaryScheme"
                color="white"
                type="submit"
                size="sm"
                disabled={isSubmitting || !(isValid && dirty)}
                className="w-8 text-neon-green disabled:opacity-50 disabled:cursor-not-allowed"
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
