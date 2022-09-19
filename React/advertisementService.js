import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const api = `${API_HOST_PREFIX}/advertisement`;
const addAdvertisement = (payload) => {
    const config = {
        method: 'POST',
        url: `${api}`,
        withCredentials: true,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const Advertisement = { addAdvertisement };
export default Advertisement;
