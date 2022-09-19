import React, { useState, useEffect } from 'react';
import userProfileService from '../../services/userProfileService';
import { FormikProvider, Form, Field, ErrorMessage, useFormik } from 'formik';
import { Button, Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import { userProfileFormSchema } from '../../schemas/userProfileSchemas';
import FileUploader from '../../components/files/FileUploader';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const _logger = debug.extend('ProfileForm');

function ProfileForm() {
    const [profileData, setProfileData] = useState({});
    const [fileUploaded, setFileUploaded] = useState();
    const location = useLocation();
    const isCreate = location.pathname === '/pages/profile/create';

    useEffect(() => {
        if (!isCreate) {
            userProfileService.userById().then(onProfileSuccess).catch(onProfileError);
        }
    }, []);

    const onProfileSuccess = (response) => {
        const userData = response.item;
        setProfileData(userData);
    };

    const onProfileError = (err) => {
        _logger('onProfileError', err);
        toastr.error('failed to get user data');
    };

    const handleSubmit = (values) => {
        const payload = values;
        _logger(values);
        if (!isCreate) {
            let id = profileData.id;
            userProfileService.updateUser(id, payload).then(onUpdateSuccess).catch(onUpdateError);
        } else {
            userProfileService.addUser(payload).then(onCreateSuccess).catch(onCreateError);
        }
    };

    const onUpdateSuccess = (response) => {
        _logger('onUpdateSuccess', response);
        toastr.success('Update successfully submitted.');
    };

    const onUpdateError = (response) => {
        _logger('onUpdateError', response);
        toastr.error('Update not submitted. Please check for errors.');
    };

    const onCreateSuccess = (response) => {
        _logger('onCreateSuccess', response);
        toastr.success('User profile successfully created.');
    };

    const onCreateError = (response) => {
        _logger('onCreateError', response);
        toastr.error('User profile not created. Please check for errors.');
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            mi: profileData.mi,
            avatarUrl: profileData.avatarUrl,
        },
        onSubmit: handleSubmit,
        validationSchema: userProfileFormSchema,
    });

    return (
        <React.Fragment>
            <h5 className="mb-4 text-uppercase">
                <i className="mdi mdi-account-circle me-1"></i> Personal Info
            </h5>
            <Card>
                <FormikProvider value={formik}>
                    <Form className="row d-flex justify-content-center">
                        <div className="col-4 mt-3 mb-3">
                            <label htmlFor="firstName">First Name</label>
                            <Field
                                name="firstName"
                                type="text"
                                className="form-control"
                                placeholder={profileData.firstName}
                            />

                            <ErrorMessage name="firstname" component="div" className="has-error" />
                        </div>
                        <div className="col-4 mt-3 mb-3">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" placeholder={profileData.lastName} className="form-control" />
                            <ErrorMessage name="lastname" component="div" className="has-error" />
                        </div>

                        <div className="col-2 mt-3 mb-3">
                            <label htmlFor="mi">MI</label>
                            <Field name="mi" placeholder={profileData.mi} className="form-control" />
                            <ErrorMessage name="Middle Initial" component="div" className="has-error" />
                        </div>
                        <div className="row">
                            <div className="col-md-5 mx-auto">
                                <img
                                    src={profileData.avatarUrl}
                                    className="rounded float-left img-thumbnail"
                                    object-fit="contain"
                                    alt=""
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <label htmlFor="avatarUrl">Profile Image</label>
                                    {fileUploaded !== undefined && isCreate === true && (
                                        <a href={fileUploaded} target="_blank" rel="noreferrer" className="ms-3">
                                            {fileUploaded}
                                        </a>
                                    )}
                                    <FileUploader
                                        getAwsResponse={(res) => {
                                            formik.setFieldValue('avatarUrl', res.data.items[0].url);
                                            setFileUploaded(res.data.items[0].url);
                                            toastr.success('uploaded');
                                        }}
                                        isMultipleFiles={false}
                                        name="avatarUrl"
                                        className="form-control"></FileUploader>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1 mt-2 text-center">
                            <Button variant="primary" type="submit">
                                {'Submit'}
                            </Button>
                        </div>
                        <div className="mb-1 mt-1 text-center">
                            <Link to="/changepassword" type="button" className="btn btn-link btn-sm mb-2">
                                {'Click here to change password!'}
                            </Link>
                        </div>
                    </Form>
                </FormikProvider>
            </Card>
        </React.Fragment>
    );
}

export default ProfileForm;
