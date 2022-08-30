import React, { useState, useContext } from "react";
import axiosInstance from "../../config/axios";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../contextProviders/authContext";
import FollowButton from "./FollowButton";
import SearchIcon from "../icons/SearchIcon";
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  LinkBox,
  LinkOverlay,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import AppFormField from "../shared/AppFormField";

import useAlert from "../../hooks/useAlert";
import AppAlert from "../shared/AppAlert";
import ColoredFormIconButton from "../shared/ColoredFormIconButton";
import useModal from "../../hooks/useModal";
import UnfollowModal from "../shared/UnfollowModal";
import FollowerCard from "./FollowerCard";

const searchSchema = Yup.object().shape({
  search: Yup.string().required(""),
});

const FindFollowers = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { auth } = useContext(AuthContext);

  const { setAlert, alertDetails, isAlertOpen } = useAlert();

  const { isModalOpen, onModalClose, modalDetails, setModal } = useModal();

  return (
    <>
      {isAlertOpen && <AppAlert details={alertDetails} />}
      {modalDetails && (
        <UnfollowModal
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          modalDetails={modalDetails}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      )}

      <Box
        mt={{ lg: 50 }}
        mb={{ md: 50 }}
        bg={"primary.900"}
        maxWidth={"3xl"}
        mx="auto"
        px={10}
        py={10}
        borderWidth="1px"
        borderRadius="xl"
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

export default FindFollowers;
