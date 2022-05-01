import { HttpRequest, generateJwt } from './httpRequest.js';
import { locadConfig } from '../config.js';

var APP_CONFIGURATIONS = locadConfig();

var application_id = APP_CONFIGURATIONS.meetings_api.api_application_id;
var private_key    = APP_CONFIGURATIONS.meetings_api.api_private_key 

class MeetingsApi {
    constructor(application_id, private_key) {
        this.application_id = application_id
        this.private_key = private_key
    }
    getJwt() {
        const jwtToken = generateJwt(
            { 
                application_id: this.application_id
            }, 
            this.private_key
        );
        return jwtToken;
    }
    /**
     * 
     */
    getDialInNumbers() {
        var url = 'https://api-eu.vonage.com/beta/meetings/dial-in-numbers';
        var jwtToken = this.getJwt();
        var headers = {'Authorisation': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'GET', null, headers);
    }
    /**
     * 
     */
    listAllMeetingsRooms() {
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms';
        var jwtToken = this.getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'GET', null, headers);
    }
    /**
     * eg. "69a71520-7401-4e36-b2d1-e389064f21b3"
     */
    getMeetingsRoom(id) {
        if (!id) throw new Error('Empty id');
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms/' + id;
        var jwtToken = this.getJwt();
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
        var jwtToken = this.getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'POST', payload, headers);
    }
    /**
     * 
     */
    UpdateMeetingsRoom(params) {
        if (!params) throw new Error('Empty params');
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms/' + id;
        var payload = { json: params }
        var jwtToken = this.getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'PATCH', payload, headers);
    }
    /**
     * 
     */
    delMeetingsRoom(id) {
        if (!id) throw new Error('Empty id');
        var url = 'https://api-eu.vonage.com/beta/meetings/rooms/' + id;
        var jwtToken = this.getJwt();
        var headers = {'Authorization': 'Bearer ' + jwtToken};
        return new HttpRequest(url, 'DELETE', null, headers);
    }
}

var meetingsApi = new MeetingsApi(application_id, private_key);

export { meetingsApi };

