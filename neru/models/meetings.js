
import { State } from 'neru-alpha';
import MeetingsApi from './services/meetingsApi.js';

export default class MeetingsModel {
    constructor(neru, session, state) {
        if (!session) {
            session = neru.createSession();
            state   = new State(session);
        }
        this.meetingsApi = new MeetingsApi();
        this.session  = session;
        this.state    = state;
        //this.appUrl   = neru.getAppUrl();
    }

    async index (req, res, next) {
        res.sendStatus(200);
    }

    async findAll (req, res, next) {
        try {
            var data = await this.meetingsApi.listAllMeetingsRooms().execute();
            return res.json(data._embedded);
        } catch (error) {
            next(error);
        }
    }

    async findOne (req, res, next) {
        try {
            var { room_id } = req.params ?? null;
            if (!room_id) throw new Error ("empty param room_id");

            var data = await this.meetingsApi.getMeetingsRoom(room_id).execute();
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async create (req, res, next) {
        try {
            var payload = req.body;
            if (payload.type == 'instant') {
                delete(payload.expires_at)
                delete(payload.expire_after_use)
            }
            var data = await this.meetingsApi.CreateMeetingsRoom(payload).execute();
            return res.json(data);
        } catch (error) {
            next(error);
        }
    } 

    async update (req, res, next) {
        try {
            var { room_id } = req.params ?? null;
            if (!room_id) throw new Error ("empty param room_id");

            // todo find one and update
            var data = await this.meetingsApi.getMeetingsRoom(room_id).execute();
            // var payload = {
            //     update_details: {
            //         expires_at: req.body.expires_at,
            //         expire_after_use: req.body.expires_at
            //     }
            // };
            var payload = {
                update_details: req.body
            };
            var data = await this.meetingsApi.UpdateMeetingsRoom(payload).execute();
            return res.json(data);
        } catch (error) {
            next(error);
        }
    } 

    async delete (req, res, next) {
        try {
            var { room_id } = req.params ?? null;
            if (!room_id) throw new Error ("empty param room_id");

            var data = await this.meetingsApi.delMeetingsRoom(room_id).execute();
            return res.json(data);
        } catch (error) {
            next(error);
        }
    } 

    async getDialInNumbers (req, res, next) {
        try {
            var data = await this.meetingsApi.getDialInNumbers().execute();
            return res.json(data);
        } catch (error) {
            next(error);
        }
    } 

    async onCallback (req, res, next) {
        try {
            const payload = req.method == 'POST'? req.body : req.query;
            payload._received_at = (new Date).toISOString();
            await this.state.lpush("meetings_api_events", payload);
            return res.json(['success']);
        } catch (error) {
            next(error);
        }
    } 

    async findAllCallbacks (req, res, next) {
        try {
            var data = await this.state.lrange("meetings_api_events", 0);
            if (!data) data = [];
            return res.json(data);
        } catch (error) {
            next(error);
        }
    } 
}
