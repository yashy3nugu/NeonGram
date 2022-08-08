import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from "formik";
import ProfilePicChanger from "./ProfilePicChanger";
import UserIcon from "../icons/UserIcon";
import axiosInstance from "../../config/axios";
import ButtonSpinner from "../icons/ButtonSpinner";

const ProfileSettings = () => {
  const { auth, toggleAuth } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState(null);

  const [pictureDropDown, setPictureDropDown] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/details/${auth.username}`)
      .then((res) => setUserDetails(res.data));
  }, [auth]);

  if (userDetails) {
    return (
      <>
        <div className="flex-grow">
          <h1 className="text-3xl text-gray-300 mb-2">Profile</h1>
          <hr className="border-t-0.5 border-gray-700" />
          {userDetails && (
            <Formik
              initialValues={userDetails}
              validate={(values) => {
                const errors = {};

                if (!values.username) {
                  errors.username = "";
                } else if (values.username.length > 15) {
                  errors.username = "Username is too long";
                }

                if (!values.fname) errors.fname = "Cannot be empty";
                if (!values.lname) errors.lname = "Cannot be empty";
                if (!values.bio) errors.bio = "Cannot be empty";
                if (!values.email) {
                  errors.email = "Cannot be empty";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }

                return errors;
              }}
              enableReinitialize
              validateOnMount={false}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axiosInstance
                  .patch("/api/updateDetails", { userDetails: values })
                  .then(() => {
                    setUserDetails(values);
                    setSubmitting(false);
                    toggleAuth((prev) => {
                      return {
                        ...prev,
                        username: values.username,
                      };
                    });
                  })
                  .catch(() => setSubmitting(false));
              }}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form autoComplete="off" className="w-full">
                  <div className="my-2">
                    <label className="block text-gray-300 text-sm mb-1 font-medium">
                      First Name
                    </label>
                    <Field
                      className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      type="text"
                      name="fname"
                    />
                  </div>

                  <div className="my-2">
                    <label className="block text-gray-300 text-sm mb-1 font-medium">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lname"
                      className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div className="my-2">
                    <label className="block text-gray-300 text-sm mb-1 font-medium">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <p class="text-neon-red text-xs italic mt-1">
                      {errors.username}
                    </p>
                  </div>

                  <div className="my-2">
                    <label className="block text-gray-300 text-sm mb-1 font-medium">
                      Email
                    </label>
                    <Field
                      type="text"
                      name="email"
                      className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <p class="text-red-500 text-xs italic mt-1">
                      {errors.email}
                    </p>
                  </div>

                  <div className="my-2">
                    <label className="block text-gray-300 text-sm mb-1 font-medium">
                      Bio
                    </label>
                    <Field
                      type="text"
                      name="bio"
                      className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !(isValid && dirty)}
                      className="w-1/5 sm:w-1/6 bg-neon-purple hover:bg-purple-900 transition ease-in-out text-white rounded-md py-1 px-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <ButtonSpinner className="w-6 animate-spin mx-auto" />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
        <div className="text-center mt-6 lg:mt-0 lg:ml-5">
          <div
            className="relative rounded-full w-32 sm:w-44 lg:w-56 overflow-hidden border border-gray-700 mx-auto"
            onClick={() => setPictureDropDown((prev) => !prev)}
          >
            {userDetails && userDetails.profilePicture ? (
              <img
                className=""
                src={userDetails.profilePicture}
                alt={`${userDetails.username}'s profile`}
              />
            ) : (
              <UserIcon className="text-gray-400 w-full" />
            )}
          </div>
          {true && <ProfilePicChanger userDetails={userDetails} />}
        </div>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default ProfileSettings;
