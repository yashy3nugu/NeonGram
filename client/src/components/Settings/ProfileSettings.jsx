import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../contextProviders/authContext";
import { Formik, Form, Field } from 'formik';
import UserIcon from "../Icons/UserIcon";
import PencilIcon from "../Icons/PencilIcon";
import UploadModal from "./UploadModal";
import axios from 'axios';
import { set } from 'mongoose';

const ProfileSettings = () => {

    const { auth, toggleAuth } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState(null);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`/api/details/${auth.username}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => setUserDetails(res.data));
    },[auth])


    return (
        <>
        <div className="flex-grow ml-5">
            <h1 className="text-3xl text-white mb-2">Profile</h1>
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

                            <div>
                                <label className="block text-white font-semibold">First Name</label>
                                <Field type="text" name="fname" className="w-full" />
                            </div>

                            <div>
                                <label className="block text-white">Last Name</label>
                                <Field type="text" name="lname" className="w-full"/>
                            </div>

                            <div>
                                <label className="block text-white">Username</label>
                                <Field type="text" name="username" className="w-full"/>
                            </div>

                            <div>
                                <label className="block text-white">Password</label>
                                <Field type="text" name="email" className="w-full"/>
                            </div>

                        </Form>
                    )}
                </Formik>
            )}


        </div>
        <div className="text-center">
           
            <div>
                {userDetails && userDetails.profilePic ? "yee" : <UserIcon  className="w-64"/>}
                <button onClick={() => setShowModal(true)}><PencilIcon className="w-4 text-left text-white"/></button>
            </div>

            {showModal && <UploadModal onClose={()=>setShowModal(false)}/>}
            
        </div>
        </>
    )
}

export default ProfileSettings
