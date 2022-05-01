import { HttpRequest, generateJwt } from './httpRequest.js';
import { locadConfig } from '../config.js';

var APP_CONFIGURATIONS = locadConfig();

/**
 *
 */
class MessageApi {
    constructor(config) {
        this.config = config
    }

    sendText(from, to, text) {
        var body = {
            from: from.number,
            to: to.number,
            text: text,
            api_key: this.config.key,
            api_secret: this.config.secret,
            callback: this.config.sms_callback_url,
        }
        var url = 'https://rest.nexmo.com/sms/json';
        var method = 'POST';
        var payload = { form: body }
        var headers = {'Content-type': 'application/x-www-form-urlencoded'};
        return new HttpRequest(url, method, payload, headers);
    }

    checkNi(number) {
        var body = {
            number: number,
            api_key: this.config.key,
            api_secret: this.config.secret,
        }
        var url = 'https://api.nexmo.com/ni/basic/json';
        var method = 'POST';
        var payload = { json: body }
        var headers = {Accept: 'application/json'};
        return new HttpRequest(url, method, payload, headers);
    }

    listenEvents (from, to, callback) {
        // console.log(from, to, callback)
        return new DoNothing();
    }
}

var DoNothing = (function () {
    function DoNothing() {}
    DoNothing.prototype.execute = function () {
        return true;
    };
    return DoNothing;
}());

/**
 *
 */
var messageApi = new MessageApi(APP_CONFIGURATIONS.api_account);

/**
 *
 */
export { messageApi }
