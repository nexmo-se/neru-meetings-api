import { neru, Messages } from 'neru-alpha';

const NERU_CONFIGURATIONS = JSON.parse(process.env['NERU_CONFIGURATIONS']);
export { NERU_CONFIGURATIONS }

function locadConfig() {
    const NERU_CONFIGURATIONS = JSON.parse(process.env['NERU_CONFIGURATIONS']);
    return NERU_CONFIGURATIONS
}
export { locadConfig }

var session   = neru.getSessionById("app-custom-ab165ab2-9001-4bad-8c6c-79bcafcd9658");
var state     = session.getState();
var messageProvider = new Messages(session);

import { meetingsApi as meetingsProvider } from './modules/meetingsApi.js';
export { session, state, messageProvider, meetingsProvider }
