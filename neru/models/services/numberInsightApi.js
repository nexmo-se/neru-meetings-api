import { HttpRequest } from './httpRequest.js';

/**
 *
 */
export default class NumberInsightApi {
    static check(number) {
        var body = {
            number: number,
            api_key: process.env.API_ACCOUNT_ID,
            api_secret: process.env.API_SECRET,
        }
        var url = 'https://api.nexmo.com/ni/basic/json';
        var method = 'POST';
        var payload = { json: body }
        var headers = {Accept: 'application/json'};
        return new HttpRequest(url, method, payload, headers);
    }
}
