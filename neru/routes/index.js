import express from 'express';
import { state, messages, meetings, session } from '../models/index.js';

var router = express.Router();

// https://localhost/meetings
router.get('/', (req, res, next) => meetings.index(req, res, next)); 

// - Get all available rooms
router.get('/rooms', (req, res, next) => meetings.findAll(req, res, next)); 
// - Get an existing room
router.get('/rooms/:room_id', (req, res, next) => meetings.findOne(req, res, next)); 
// - Create a room
router.post('/rooms', (req, res, next) => meetings.create(req, res, next)); 
// - Update an existing room
router.post('/rooms/:room_id', (req, res, next) => meetings.update(req, res, next)); 
// - Delete a room
router.delete('/rooms/:room_id', (req, res, next) => meetings.delete(req, res, next)); 

// - Get numbers that can be used to dial into a meeting
router.get('/dial-in-numbers', (req, res, next) => meetings.getDialInNumbers(req, res, next));
// -- List callbacks received
router.get('/callbacks', (req, res, next) => meetings.findAllCallbacks(req, res, next));
// -- Webhook handlers, 
router.post('/onMeetings', (req, res, next) => meetings.onCallback(req, res, next)); 
router.post('/onCallback', (req, res, next) => meetings.onCallback(req, res, next)); 

router.post('/sendSms', (req, res, next) => messages.sendSms(req, res, next)); 
router.get('/messageEvents', (req, res, next) => messages.findAllMessageEvents(req, res, next));
router.all("/onMessageEvent/register", async (req, res, next) => {
    try {
        const data = await messages.listenEvents(null, null, '/meetings/onMessageEvent');
        return res.json(data);
    } catch (error) {
        next(error);
    }
});
router.all('/onMessageEvent', (req, res, next) => messages.onMessageEvent(req, res, next)); 
router.get('/ni/:number', (req, res, next) => messages.ni(req, res, next));


router.all('/cleanup', async (req, res, next) => {
    try {
        var data1 = await state.lrange("meetings_api_events", 0);
        await state.del("meetings_api_events")

        if (!data1) data1 = [];
        data1.map(async e => {
            if (e._received_at) {
                if ((new Date(e._received_at)) > (new Date('2022-05-10'))) {
                    await state.rpush("meetings_api_events", e);
                }
            }
        })

        var data2 = await state.lrange("meetings_api_events", 0);
        if (!data2) data2 = [];
        return res.json(data2); 

    } catch (error) {
        next(error);
    }
});

export default router;
