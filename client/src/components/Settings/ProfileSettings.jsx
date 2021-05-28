import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from 'formik';
import UserIcon from "../Icons/UserIcon";
import PencilIcon from "../Icons/PencilIcon";
import UploadModal from "./UploadModal";
import axios from 'axios';

const ProfileSettings = () => {

    const { auth } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState(null);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`/api/details/${auth.username}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setUserDetails(res.data));
    }, [auth])

    if (userDetails) {

        return (
            <>
                <div className="flex-grow ml-5">
                    <h1 className="text-3xl text-gray-300 mb-2">Profile</h1>
                    <hr className="border-t-0.5 border-gray-700" />
                    {userDetails && (
                        <Formik
                            initialValues={userDetails}
                            validate={values => {
                                const errors = {};
                                // finish later
                                if (!values.username) errors.username = 'Cannot be empty';
                                if (!values.fname) errors.fname = '';

                                return errors;
                            }}
                            validateOnMount={false}
                        >
                            {({ isSubmitting, isValid, dirty }) => (
                                <Form autoComplete="off" className="w-full" >

                                    <div className="my-2">
                                        <label className="block text-gray-300 text-sm mb-1 font-medium">First Name</label>
                                        <Field className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" name="fname"  />
                                    </div>

                                    <div className="my-2">
                                        <label className="block text-gray-300 text-sm mb-1 font-medium">Last Name</label>
                                        <Field type="text" name="lname" className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                    </div>

                                    <div className="my-2">
                                        <label className="block text-gray-300 text-sm mb-1 font-medium">Username</label>
                                        <Field type="text" name="username" className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                    </div>

                                    <div className="my-2">
                                        <label className="block text-gray-300 text-sm mb-1 font-medium">Email</label>
                                        <Field type="text" name="email" className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    )}


                </div>
                <div className="text-center ml-6">

                        {userDetails && userDetails.profilePicture ? (
                            <div className="rounded-full w-64 overflow-hidden border border-gray-700 mx-auto">
                                <img className="" src={userDetails.profilePicture} alt={`${userDetails.username}'s profile`} />
                            </div>
                            
                        ) :
                            (<UserIcon className="w-64" />)
                        }
                        <button onClick={() => setShowModal(true)}><PencilIcon className="w-4 text-left text-white" /></button>

                    {showModal && <UploadModal onClose={() => setShowModal(false)} />}

                </div>
            </>
        )
    }

    else {
        return <h1>Loading</h1>
    }
}

export default ProfileSettings
