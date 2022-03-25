import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { got } from 'got';
// -- OR axios // import axios from 'axios';

var HttpRequest = (function () {
    function HttpRequest(url, method = 'GET', payload = null, headers = null) {
        this.url = url;
        this.method = method;
        this.payload = payload;
        this.headers = {
            'user-agent': 'got',
            'Content-type': 'application/json'
        };
        if (headers) this.headers = Object.assign(this.headers, headers);
        // --- for got
        var gotHeaders = got.extend({ headers: this.headers } );
        this.merged = got.extend( gotHeaders );
    }
    HttpRequest.prototype.execute = async function () {
        var res;
        try {
            console.log(this.url, this.payload, this.headers);
            switch(this.method) {
                case 'DELETE':
                    res = await this.merged.delete(this.url);
                    break 
                case 'GET':
                    res = await this.merged.get(this.url);
                    break 
                case 'POST':
                    res = await this.merged.post(this.url, this.payload);
                    break 
            }
            console.log(res.body, res.statusCode);
            if (res.body && typeof res.body === 'string') res.body = JSON.parse(res.body);
            if (res.body && res.body.error) {
                throw new Error(res.body.error || 'Something went wrong');
            }
            return res.body;
        } catch (error) {
            console.error(error.code, error.stack);
            throw new Error('Something went wrong!! ' + this.url + (error.code || ""));
        }
    };
    return HttpRequest;
}());

function generateJwt(payload, privateKey)
{
    if (!(privateKey instanceof Buffer)) {
        if (!fs.existsSync(privateKey)) {
            throw new Error(privateKey + " not found.");
        } else {
            privateKey = fs.readFileSync(privateKey);
        }
    }
    if (payload.iat === undefined) payload.iat = Math.floor(Date.now() / 1000);
    if (payload.jti === undefined) payload.jti = uuidv4();
    var payloadSorted = Object.keys(payload).sort().reduce(
            (obj, key) => { 
                obj[key] = payload[key]; 
                return obj;
            },
            {}
        );
    var token = jwt.sign(
            payloadSorted,
            privateKey, 
            { algorithm: 'RS256' }
        );
    return token;
}

export default HttpRequest;
export { HttpRequest, generateJwt };