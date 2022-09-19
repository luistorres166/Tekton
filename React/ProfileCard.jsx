import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const _logger = debug.extend('ProfileCard');

const ProfileCard = (props) => {
    _logger(props.profileData);
    const profile = props.profileData;

    return (
        <Card className="text-center">
            <Card.Body>
                <img
                    src={profile.avatarUrl}
                    className="rounded-circle avatar-xl img-thumbnail"
                    object-fit="contain"
                    alt=""
                />
                <h4 className="mb-0 mt-2">
                    {profile.firstName} {profile.lastName}
                </h4>
                <p className="text-muted font-14"></p>
                <Link to="/#" type="button" className="btn btn-success btn-sm mb-2">
                    Follow
                </Link>
                <Link to="/messages" type="button" className="btn btn-danger btn-sm mb-2">
                    Messages
                </Link>
                <div className="text-start mt-3">
                    <p className="text-muted mb-2 font-13">
                        <strong>Full Name :</strong>
                        <span className="ms-2">
                            {profile.firstName} {profile.mi} {profile.lastName}
                        </span>
                    </p>

                    <p className="text-muted mb-2 font-13">
                        <strong>Mobile :</strong>
                        <span className="ms-2"></span>
                    </p>

                    <p className="text-muted mb-2 font-13">
                        <strong>Email :</strong>
                        <span className="ms-2 ">{props.currentUser.email}</span>
                    </p>
                </div>
                <ul className="social-list list-inline mt-3 mb-0">
                    <li className="list-inline-item">
                        <Link to="#" className="social-list-item border-primary text-primary">
                            <i className="mdi mdi-facebook"></i>
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="#" className="social-list-item border-danger text-danger">
                            <i className="mdi mdi-google"></i>
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="#" className="social-list-item border-info text-info">
                            <i className="mdi mdi-twitter"></i>
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="#" className="social-list-item border-secondary text-secondary">
                            <i className="mdi mdi-github"></i>
                        </Link>
                    </li>
                </ul>
            </Card.Body>
        </Card>
    );
};
ProfileCard.propTypes = {
    profileData: PropTypes.shape({
        id: PropTypes.number,
        userId: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        mi: PropTypes.string,
        avatarUrl: PropTypes.string,
    }).isRequired,

    currentUser: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
        roles: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};
export default React.memo(ProfileCard);
