import { v4 as uuidv4 } from 'uuid';
import { state } from './state.js';

export default class Session {
    constructor(id = null) {
        this.id = id? id : uuidv4();
    }
    getSessionById(id) {
        return new Session(id);
    }
    createSession() {
        return new Session();
    }
    getState() {
        return new State();
    }
}

var session = new Session();

export { session }