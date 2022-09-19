import axios from 'axios';
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from './serviceHelpers';

const endpoint = API_HOST_PREFIX + '/api/users';

const login = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint + '/login',
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const register = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const currentUser = () => {
    const config = {
        method: 'GET',
        url: endpoint + '/current',
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const logout = () => {
    const config = {
        method: 'GET',
        url: endpoint + '/logout',
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const confirm = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint + '/confirm',
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const userService = { login, register, currentUser, logout, confirm };

export default userService;
