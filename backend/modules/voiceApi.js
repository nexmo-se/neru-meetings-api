import { HttpRequest, generateJwt } from './httpRequest.js';
import { locadConfig } from '../config.js';

var APP_CONFIGURATIONS = locadConfig();

var application_id = APP_CONFIGURATIONS.meetings_api.api_application_id;
var private_key    = APP_CONFIGURATIONS.meetings_api.api_private_key 

class VoiceApi {
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
    makeVoiceCall(params) {
        if (!params) throw new Error('Empty params');
        var url = 'https://api.nexmo.com/v1/calls';
        var payload = { json: params }
        var jwtToken = this.getJwt();
        var headers = {'Authorization': 'Bearer' + jwtToken};
        return new HttpRequest(url, 'POST', payload, headers);
    }
}

var voiceApi = new VoiceApi(application_id, private_key);

export { voiceApi };

