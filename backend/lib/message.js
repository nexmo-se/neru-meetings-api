import HttpRequest from './httpRequest.js';
import config from './config.js'; config();
const NERU_CONFIGURATIONS = JSON.parse(process.env['NERU_CONFIGURATIONS']);

class Message {
    listenEvents (from, to, callback) {
        // console.log(from, to, callback)
        return new Foo();
    } 
    sendText(from, to, text) {
        var body = {
            callback: NERU_CONFIGURATIONS.url_sms_callback,
            from: from.number,
            to: to.number,
            text: text,
            api_key: NERU_CONFIGURATIONS.api_account.key,
            api_secret: NERU_CONFIGURATIONS.api_account.secret,
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
            api_key: NERU_CONFIGURATIONS.api_account.key,
            api_secret: NERU_CONFIGURATIONS.api_account.secret,
        }
        var url = 'https://api.nexmo.com/ni/basic/json';
        var method = 'POST';
        var payload = { json: body }
        var headers = {Accept: 'application/json'};
        return new HttpRequest(url, method, payload, headers);
    }
}

var Foo = (function () {
    function Foo() {}
    Foo.prototype.execute = function () {
        return true;
    };
    return Foo;
}());

export { Message }
 