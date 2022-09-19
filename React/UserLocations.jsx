import React, { useState, useEffect } from 'react';
import locationService from '../../services/locationService';
import debug from 'sabio-debug';
import UserLocationCard from './UserLocationCard';

import Pagination from 'rc-pagination';
import '../filemanager/rcpagination.css';
import '../../assets/scss/icons.scss';

const _logger = debug.extend('User Locations');

function UserLocations() {
    const [locations, setLocations] = useState({ locationData: [], userLocationCards: [] });
    const [paginateData, setPaginateData] = useState({ totalCount: 0, currentPage: 1, pageIndex: 0, pageSize: 4 });

    useEffect(() => {
        locationService
            .getLocationsFromCurrentUser(paginateData.pageIndex, paginateData.pageSize)
            .then(onGetLocationsFromCurrentUserSuccess)
            .catch(onGetLocationsFromCurrentUserError);
    }, []);

    const onPageChange = (page) => {
        setPaginateData((prevState) => {
            const pd = { ...prevState };
            pd.currentPage = page;
            return pd;
        });
        locationService
            .getLocationsFromCurrentUser(page - 1, paginateData.pageSize)
            .then(onGetLocationsFromCurrentUserSuccess)
            .catch(onGetLocationsFromCurrentUserError);
    };

    const onGetLocationsFromCurrentUserSuccess = (response) => {
        setLocations((prevState) => {
            const locationData = { ...prevState };
            locationData.locationData = response.item.pagedItems;
            locationData.userLocationCards = response.item.pagedItems.map(mapLocationCard);
            return locationData;
        });
        setPaginateData((prevState) => {
            const pd = { ...prevState };
            pd.totalCount = response.item.totalCount;
            return pd;
        });
    };

    const onGetLocationsFromCurrentUserError = (err) => {
        _logger('onGetLocationsFromCurrentUserError', err);
    };

    const mapLocationCard = (location) => {
        return <UserLocationCard locationData={location} key={`location_${location.id}`} />;
    };

    return (
        <React.Fragment>
            <h5 className="mb-4 text-uppercase">
                <i className="mdi mdi-account-circle me-1"></i> LOCATIONS
            </h5>
            <div className="container col-md-auto">
                <div className="col-md-12">
                    <div className="row">{locations.userLocationCards}</div>
                </div>
                <div className="col d-flex justify-content-start mt-3 mb-3">
                    <Pagination
                        className="filemanagerpagination"
                        pageSize={paginateData.pageSize}
                        total={paginateData.totalCount}
                        current={paginateData.currentPage}
                        onChange={onPageChange}></Pagination>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserLocations;
