var HttpRequest = (function () {
    function HttpRequest(url, method = 'GET', payload = null, headers = null) {
        this.url = url;
        this.method = method;
        this.payload = payload;
        this.headers = {
            'Content-Type': 'application/json; charset=utf-8',
        };
        if (headers) this.headers = Object.assign(this.headers, headers);
        this.option = {
            method: this.method,
            headers: this.headers
        }
        if (this.payload) {
            this.option.body = JSON.stringify(this.payload)
        }
    }
    HttpRequest.prototype.execute = function () {
        var res = fetch(this.url, this.option)
            .then(res => res.json())
            .catch(error => {
                console.error(error);
                throw new Error(`HTTP error!!` + this.url);
            });
        return res;
    };
    return HttpRequest;
}());

class Http {
    static get (url) {
        return new HttpRequest(url).execute();
    }
    static async post (url, payload) {
        return new HttpRequest(url, 'POST', payload).execute();
    }
    static async delete (url) {
        return new HttpRequest(url, 'DELETE').execute();
    }
}

export default Http;