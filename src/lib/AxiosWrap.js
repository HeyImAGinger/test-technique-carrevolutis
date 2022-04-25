/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from 'axios';
import config from "../config/config";

/**
 * Create an Axios Client with defaults
 */

const client = axios.create({
    baseURL: config.API_HOST
});

const request = function(options) {
    const onSuccess = function(response) {
        return response.data;
    };

    const onError = function(error) {
        console.debug('Request Failed:', error.config);
        if (error.response) {
            console.debug('Status:', error.response.status);
            console.debug('Data:', error.response.data);
            console.debug('Headers:', error.response.headers);
        } else {
            console.debug('Error Message:', error.message);
        }
        return Promise.reject(error.response || error.message);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;