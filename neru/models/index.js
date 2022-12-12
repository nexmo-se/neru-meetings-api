import { neru, State } from 'neru-alpha';
import MeetingsModel from './meetings.js';
import MessagesModel from './messages.js';

// const globalSession = neru.getGlobalSession();
var session = neru.getSessionById(`app-custom-${process.env.API_APPLICATION_ID}`);
var state   = new State(session);
// const appUrl = neru.getAppUrl();

var meetings = new MeetingsModel(neru, session, state);
var messages = new MessagesModel(neru, session, state);

export { 
    session, 
    state,
    meetings,
    messages,
}