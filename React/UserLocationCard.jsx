import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function UserLocationCard(props) {
    const location = props.locationData;

    return (
        <>
            <Card className=" col-3 mt-1">
                <Card.Body>
                    <Card.Title>{location.locationType.name}</Card.Title>
                    <div className="col-md-12">
                        <p className="location-address">{location.lineOne},</p>
                        {location.lineTwo ? (
                            <React.Fragment>
                                <p className="location-address">{location.lineTwo}</p>
                            </React.Fragment>
                        ) : (
                            ''
                        )}
                        <p className="location-address">
                            {location.city}, {location.state.name}
                        </p>
                        {location.zip ? (
                            <React.Fragment>
                                <p className="location-address">{location.zip}</p>
                            </React.Fragment>
                        ) : (
                            ''
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

UserLocationCard.propTypes = {
    locationData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        locationType: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        lineOne: PropTypes.string.isRequired,
        lineTwo: PropTypes.string,
        city: PropTypes.string.isRequired,
        zip: PropTypes.string,
        state: PropTypes.shape({
            code: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
};

export default React.memo(UserLocationCard);
