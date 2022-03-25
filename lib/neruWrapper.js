import Meetings from './meetings.js';
import { neru, Messages } from 'neru-alpha';

// --- remove this when deploying to neru
// import { notNeru } from './notNeru.js';
//import { Message as MyMessage} from './message.js'; // todo remove this
// import config from './config.js'; config();

var session;
var messaging;

session  = neru.createSession();
messaging = new Messages(session);


// --- remove this when deploying to neru
// const NOT_NERU = (process.env['NOT_NERU'])? process.env['NOT_NERU'] : true;
// if (NOT_NERU) {
//     session = notNeru.createSession();
//     messaging = new MyMessage(); // todo remove this
// }


var messaging = new Messages(session);
var state = session.getState();
var meetings = new Meetings();
export { neru, session, messaging, state, meetings }
