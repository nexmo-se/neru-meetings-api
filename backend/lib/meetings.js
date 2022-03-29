import config from './config.js'; config();
import { HttpRequest, generateJwt } from './httpRequest.js';

const NERU_CONFIGURATIONS = JSON.parse(process.env['NERU_CONFIGURATIONS']);

export default class Meetings {
    /**
     * 
     */
    getDialInNumbers() {
        var url = 'https://api-eu.vonage.com/beta/meetings/dial-in-numbers';
        var jwtToken = getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'GET', null, headers);
    }
    /**
     * 
     */
    listAllMeetingsRooms() {
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms';
        var jwtToken = getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'GET', null, headers);
    }
    /**
     * eg. "69a71520-7401-4e36-b2d1-e389064f21b3"
     */
    getMeetingsRoom(id) {
        if (!id) throw new Error('Empty id');
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms/' + id;
        var jwtToken = getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'GET', null, headers);
    }
    /**
     * 
     */
    CreateMeetingsRoom(params) {
        if (!params) throw new Error('Empty params');
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms';
        var payload = { json: params }
        var jwtToken = getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'POST', payload, headers);
    }
    /**
     * 
     */
    delMeetingsRoom(id) {
        if (!id) throw new Error('Empty id');
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms/' + id;
        var jwtToken = getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'DELETE', null, headers);
    }
}

function getJwt() {
    const jwtToken = generateJwt(
        { 
            application_id: NERU_CONFIGURATIONS.meetings_api.api_application_id 
        }, 
        NERU_CONFIGURATIONS.meetings_api.api_private_key
    );
    return jwtToken;
}

export {Meetings}