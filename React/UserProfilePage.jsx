import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import userProfileService from '../../services/userProfileService';
import toastr from 'toastr';
import UserLocations from './UserLocations';
import ProfileForm from './ProfileForm';
import debug from 'sabio-debug';
import ProfileCard from './ProfileCard';

const _logger = debug.extend('Profile');

const UserProfilePage = (props) => {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        userProfileService.userById().then(onProfileSuccess).catch(onProfileError);
    }, []);

    const onProfileSuccess = (response) => {
        const userData = response.item;
        setProfileData(userData);
    };

    const onProfileError = (err) => {
        _logger('onProfileError', err);
        toastr.error('failed to get user data');
    };

    return (
        <>
            <Row className="mt-4">
                <Col xl={4} lg={5}>
                    <ProfileCard currentUser={props.currentUser} profileData={profileData} />
                    {/* User's recent messages */}
                </Col>
                <Col xl={8} lg={7}>
                    <Tab.Container defaultActiveKey="settings">
                        <Card>
                            <Card.Body>
                                <Nav variant="pills" className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                    <Nav.Item className="nav-item">
                                        <Nav.Link href="#" eventKey="settings" className="nav-link rounded-0">
                                            Settings
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link href="#" eventKey="timeline" className="nav-link rounded-0">
                                            Timeline
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link href="#" eventKey="aboutme" className="nav-link rounded-0">
                                            About Me
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="settings">
                                        <ProfileForm />
                                        <UserLocations />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="timeline"></Tab.Pane>
                                    <Tab.Pane eventKey="aboutme"></Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>
            </Row>
        </>
    );
};
UserProfilePage.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
        roles: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    profileData: PropTypes.shape({
        id: PropTypes.number,
        userId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        mi: PropTypes.string,
        avatarUrl: PropTypes.string.isRequired,
    }),
};
export default React.memo(UserProfilePage);
