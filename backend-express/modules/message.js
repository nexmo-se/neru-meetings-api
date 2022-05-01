import { state } from '../config.js';
import { session } from '../config.js';
import { messageProvider } from '../config.js';
import { locadConfig } from '../config.js';

var APP_CONFIGURATIONS = locadConfig()

/**
 *
 */
class Message {

    async sendSms (req, res, next) {
        try {
            const payload = req.body;
            if (payload.to == '') throw new Error ('Wrong To number')
            if (payload.text == '') throw new Error ('Empty text') 

            const to = { type: "sms", number: payload.to };
            const from = { type: "sms", number: APP_CONFIGURATIONS.contact.number };

            await messageProvider.listenEvents(from, to, "onMessageEvent").execute();

            var data = await messageProvider.sendText(from, to, payload.text).execute();
            
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async findAllMessageEvents (req, res, next) {
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
    } 

    async onMessageEvent (req, res, next) {
        try {
            const payload = req.method == 'POST'? req.body : req.query;
            await state.lpush("messages_api_events", payload);

            return res.json(["success"]);
        } catch (error) {
            next(error);
        }
    } 

    async ni (req, res, next) {
        try {
            var { number } = req.params ?? null;
            if (!number) throw new Error ("empty param number");

            var data = await messageProvider.checkNi(number).execute();

            if (data && data.national_format_number) data = data.national_format_number
            else data = number;

            return res.json(data);
        } catch (error) {
            return res.json(req.query.number);
        }
    }
}

/**
 *
 */
var message = new Message();

/**
 *
 */
export { message }
