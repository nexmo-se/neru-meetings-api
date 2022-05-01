import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Yml from 'yml';

function locadConfig() {
    var __dirname = dirname( fileURLToPath( import.meta.url ) );
    var yml = Yml.load(__dirname + '/config.yml');
    return yml.configurations
}
export { locadConfig }

import { session } from './modules/session.js';
import { state } from './modules/state.js';
import { messageApi as messageProvider } from './modules/messageApi.js';
import { meetingsApi as meetingsProvider } from './modules/meetingsApi.js';

export { session, state, messageProvider, meetingsProvider }
