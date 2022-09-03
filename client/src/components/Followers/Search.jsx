import React, { useState, useContext } from "react";
import axiosInstance from "../../config/axios";
import { Formik, Form } from "formik";
import { AuthContext } from "../ContextProviders/AuthContext";

import SearchIcon from "../shared/icons/SearchIcon";
import { Box, HStack, VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import AppFormField from "../shared/ui/AppFormField";

import useAlert from "../../hooks/useAlert";
import AppAlert from "../shared/ui/AppAlert";
import ColoredFormIconButton from "../shared/ui/ColoredFormIconButton";
import useModal from "../../hooks/useModal";
import UnfollowModal from "../shared/modal/UnfollowModal";
import FollowerCard from "./FollowerCard";

const searchSchema = Yup.object().shape({
  search: Yup.string().required(""),
});

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { auth, toggleAuth } = useContext(AuthContext);

  const { setAlert, alertDetails, isAlertOpen } = useAlert();

  const { isModalOpen, onModalClose, modalDetails, setModal } = useModal();

  const unFollowUser = async () => {
    // setUnfollowLoading(true);
    await axiosInstance.post("/api/unfollow/", {
      followingUserId: modalDetails._id,
    });
    // setUnfollowLoading(false);
    let searchUsers = [...searchResults];
    let unfollowedUser;
    let unfollowedUserIndex;

    searchUsers.forEach((searchUser, idx) => {
      if (searchUser._id === modalDetails._id) {
        unfollowedUserIndex = idx;
      }
    });

    unfollowedUser = { ...searchUsers[unfollowedUserIndex] };

    let index;

    unfollowedUser.followers.forEach((follower, idx) => {
      if (follower === auth._id) {
        index = idx;
      }
    });

    unfollowedUser.followers.splice(index, 1);

    searchUsers[unfollowedUserIndex] = unfollowedUser;

    setSearchResults(searchUsers);

    let currentAuth = { ...auth };

    let authIndex;

    currentAuth.following.forEach((followingUser, idx) => {
      if (modalDetails._id === followingUser) {
        authIndex = idx;
      }
    });

    currentAuth.following.splice(authIndex, 1);

    toggleAuth(currentAuth);
    onModalClose();

    // setUnfollowLoading(false);
  };

  return (
    <>
      {isAlertOpen && <AppAlert details={alertDetails} />}
      {modalDetails && (
        <UnfollowModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          modalDetails={modalDetails}
          unFollowUser={unFollowUser}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      )}

      <Box
        mt={{ md: 50 }}
        mb={{ md: 50 }}
        bg={"primary.900"}
        maxWidth={"3xl"}
        mx="auto"
        w={{ base: "full", md: "sm", lg: "md", xl: "lg" }}
        px={10}
        py={10}
        flexGrow={1}
        borderWidth={{ md: "1px" }}
        borderRadius={{ md: "xl" }}
      >
        <Box>
          <Formik
            initialValues={{
              search: "",
            }}
            validationSchema={searchSchema}
            validateOnMount={false}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const { data } = await axiosInstance.get("/api/search", {
                  params: {
                    username: values.search,
                  },
                });

                setSearchResults(data);
                setSubmitting(false);
              } catch (error) {
                setAlert("error", error.response.data.message);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form autoComplete="off">
                <HStack>
                  <AppFormField
                    type="text"
                    name="search"
                    placeholder="search"
                  />

                  <ColoredFormIconButton
                    type="submit"
                    disabled={isSubmitting || !(isValid && dirty)}
                    isLoading={isSubmitting}
                    icon={<SearchIcon />}
                  />
                </HStack>
              </Form>
            )}
          </Formik>

          <Box py={4} mt={3}>
            <VStack maxHeight="30rem" overflowY="auto" spacing={4}>
              {searchResults.map((user, idx) => (
                <FollowerCard
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  user={user}
                  key={idx}
                  setModal={setModal}
                />
              ))}
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Search;
