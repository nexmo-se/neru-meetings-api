import { State, Messages } from 'neru-alpha';
import NumberInsightApi from './services/numberInsightApi.js';

const APP_CONFIGURATIONS = JSON.parse(process.env['NERU_CONFIGURATIONS']);

/**
 *
 */
export default class MessagesModel {
    constructor(neru, session, state) {
        if (!session) {
            session = neru.createSession();
            state   = new State(session);
        }
        this.messagesProvider = new Messages(session);
        this.session  = session;
        this.state    = state;
    }
  
    async sendSms (req, res, next) {
        try {
            const payload = req.body;
            if (payload.to == '') throw new Error ('Wrong To number')
            if (payload.text == '') throw new Error ('Empty text') 

            const to = { type: "sms", number: payload.to };
            const from = { type: "sms", number: APP_CONFIGURATIONS.vonage_number };

            var data = await this.messagesProvider.sendText(
                from, 
                to, 
                payload.text
            ).execute();
            
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async findAllMessageEvents (req, res, next) {
        try {
            var data1 = await this.state.lrange("messages_api_events", 0);
            if (!data1) data1 = [];

            var data2 = await this.state.lrange("meetings_api_events", 0);
            if (!data2) data2 = [];

            var data = [].concat(data2, data1);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    } 

    async onMessageEvent (req, res, next) {
        try {
            const payload = req.method == 'POST'? req.body : req.query;
            payload._received_at = (new Date).toISOString();

            await this.state.lpush("messages_api_events", payload);

            return res.json(["success"]);
        } catch (error) {
            next(error);
        }
    } 

    async ni (req, res, next) {
        try {
            var { number } = req.params ?? null;
            if (!number) throw new Error ("empty param number");

            var data = await NumberInsightApi.check(number).execute();

            if (data && data.national_format_number) data = data.national_format_number
            else data = number;

            return res.json(data);
        } catch (error) {
            //next(error);
            return res.json(req.query.number);
        }
    }

    async listenEvents(from, to, callback) {
        try {
            const fromObj = { type: "sms", number: from};
            const toObj = { type: "sms", number: to};

            const listenerId = await this.messagesProvider.listenEvents(
                fromObj, 
                toObj, 
                callback
            ).execute();
            
            return { listener_id: listenerId };
        } catch (error) {}
        return;
    }
}