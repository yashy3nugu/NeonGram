import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from 'formik';
import ProfilePicChanger from './ProfilePicChanger';
import UserIcon from "../Icons/UserIcon";
import PencilIcon from "../Icons/PencilIcon";
import UploadModal from "./UploadModal";
import axios from 'axios';

const ProfileSettings = () => {

    const { auth } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState(null);

    const [pictureDropDown, setPictureDropDown] = useState(false);


    useEffect(() => {
        axios.get(`/api/details/${auth.username}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setUserDetails(res.data));
    }, [auth]);

    const fileInput = useRef(null);

    const handleFile = (e) => {

    }



    if (userDetails) {

        return (
            <>
                <div className="flex-grow">
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
                                        <Field className="w-full text-white bg-gray-800 rounded px-3 py-1 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" name="fname" />
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
                <div className="text-center mt-6 lg:mt-0 lg:ml-5">

                    <div className="relative rounded-full w-32 sm:w-44 lg:w-56 overflow-hidden border border-gray-700 mx-auto" onClick={() => setPictureDropDown(prev => !prev)}>
                        {userDetails && userDetails.profilePicture ? (

                            <img className="" src={userDetails.profilePicture} alt={`${userDetails.username}'s profile`} />


                        ) :
                            (<UserIcon className="text-gray-400 w-full" />)
                        }

                    </div>
                    {true && <ProfilePicChanger userDetails={userDetails}/>}








                </div>
            </>
        )
    }

    else {
        return <h1>Loading</h1>
    }
}

export default ProfileSettings
