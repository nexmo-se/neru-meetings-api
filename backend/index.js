import config from './lib/config.js'; config();
const NERU_CONFIGURATIONS = JSON.parse(process.env['NERU_CONFIGURATIONS']);
import { neru, session, messaging, state, meetings } from './lib/neruWrapper.js';
import { Message as MyMessage} from './lib/message.js'; 
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import st from 'serve-static';

// =========================================
const router = neru.Router();
console.log("session created: ", session.id)

/**
 * Frontend resources
 */
router.use("/public/static/", st(path.join(__dirname, "./public/static/")));
router.use('/public/manifest.json', st(path.join(__dirname, "./public/manifest.json")));
router.get('/public/*', function(req, res, next) {
    res.sendFile('index.html', {root: path.join(__dirname, './public')});
});

router.get('/meetingsRoom', async (req, res, next) => {
    try {
        var data = await meetings.listAllMeetingsRooms().execute();
        return res.json(data._embedded);
    } catch (error) {
        next(error);
    }
});

router.post('/meetingsRoom', async (req, res, next) => {
    try {
        var payload = req.body;
        if (payload.type == 'instant') {
            delete(payload.expires_at)
            delete(payload.expire_after_use)
        }
        console.log(payload)
        var data = await meetings.CreateMeetingsRoom(payload).execute();
        console.log(data)
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

router.delete('/meetingsRoom', async (req, res, next) => {
    try {
        console.log(req.query)
        var data = await meetings.delMeetingsRoom(req.query.id).execute();
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/dialInNumbers', async (req, res, next) => {
    try {
        var data = await meetings.getDialInNumbers().execute();
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/onMeetings', async (req, res, next) => {
    try {
        const payload = req.method == 'POST'? req.body : req.query;
        payload._received_at = (new Date).toISOString();
        await state.lpush("meetings_api_events", payload);
        return res.json(['success']);
    } catch (error) {
        next(error);
    }
});

router.get('/meetingsCallbacks', async (req, res, next) => {
    try {
        var data = await state.lrange("meetings_api_events", 0);
        if (!data) data = [];
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/sendsms', async (req, res, next) => {
    try {
        const payload = req.body;
        if (payload.to == '') throw new Error ('Wrong To number')
        if (payload.text == '') throw new Error ('Empty text') 
        const to = { type: "sms", number: payload.to };
        const from = { type: "sms", number: NERU_CONFIGURATIONS.concat.number };
        await messaging.listenEvents(from, to, "onMessagesEvent").execute();
        var data = await messaging.sendText(from, to, payload.text).execute();
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

router.all('/onMessagesEvent', async (req, res, next) => {
    try {
        const payload = req.method == 'POST'? req.body : req.query;
        await state.lpush("messages_api_events", payload);
        return res.json(["success"]);
    } catch (error) {
        next(error);
    }
});

router.get('/messagesEvents', async (req, res, next) => {
    try {
        var data1 = await state.lrange("messages_api_events", 0);
        if (!data1) data1 = [];
        var data2 = await state.lrange("meetings_api_events", 0);
        if (!data2) data2 = [];
        var data = data2.concat(data1);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get('/ni', async (req, res, next) => {
    const number = req.query.number;
    try {
        var messaging = new MyMessage()
        var data = await messaging.checkNi(number).execute();
        if (data && data.national_format_number) data = data.national_format_number
        else data = number;
        return res.json(data);
    } catch (error) {
        console.error(error)
        return res.json(number);
    }
});
export { router };