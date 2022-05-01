import { v4 as uuidv4 } from 'uuid';

class State {
    constructor() {
        this.data = {}
    }
    lrange (key, begin = 0, end = null) {
        if (this.data[key] == undefined) return [];
        if (!end) end = this.data[key].length;
        return this.data[key].slice(begin, end)
    }
    lpush (key, value) {
         if (this.data[key] == undefined) this.data[key] = [];
         this.data[key].push(value)
     }
}

var state = new State();

export { state }