import Meetings from './meetings.js';
import { neru, Messages } from 'neru-alpha';

// --- when deploying to neru
import { notNeru } from './notNeru.js';
import { Message as MyMessage} from './message.js'; 
import config from './config.js'; config();



var session;
var messaging

//session  = neru.createSession();
session  = neru.getSessionById("app-custom-ab165ab2-9001-4bad-8c6c-79bcafcd9658");
messaging = new Messages(session);




// --- when deploying to neru
const NOT_NERU = (process.env['NOT_NERU'])? process.env['NOT_NERU'] : true;
if (NOT_NERU) {
    session = notNeru.createSession();
    messaging = new MyMessage(); 
}




var state = session.getState();
var meetings = new Meetings();
export { neru, session, messaging, state, meetings }

