
// --- remove this when deploying to neru
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import Yml from 'yml';


const config = () => {
    
    // --- remove this when deploying to neru
    // const __dirname = dirname(fileURLToPath(import.meta.url));
    // const configYml = Yml.load(__dirname + '/../neru.yml');
    // process.env['NOT_NERU'] = configYml.NotNeru === undefined || configYml.NotNeru;
    // if (process.env['NOT_NERU']) {
    //     process.env['NERU_CONFIGURATIONS'] = JSON.stringify(configYml.instance.configurations);
    // }

};

export default config;
